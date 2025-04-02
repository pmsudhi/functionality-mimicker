from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

from models.calculation_models import (
    StaffingParams, 
    RevenueParams, 
    PLParams, 
    PeakHourParams,
    OptimizationParams,
    WhatIfParams,
    StaffingResult,
    RevenueResult,
    PLResult,
    PeakHourResult,
    ComparisonResult,
    OptimizationResult,
    WhatIfResult,
    Scenario
)

from calculations import (
    StaffingCalculator,
    FinancialCalculator,
    PeakHourCalculator
)

from database import get_db, get_scenario_by_id
from auth import get_current_active_user, User

router = APIRouter(
    prefix="/calculations",
    tags=["calculations"],
    responses={404: {"description": "Not found"}},
)

@router.post("/staffing", response_model=StaffingResult)
async def calculate_staffing(
    params: StaffingParams,
    current_user: User = Depends(get_current_active_user)
):
    """
    Calculate staffing requirements based on space, service, and operational parameters.
    """
    calculator = StaffingCalculator()
    return calculator.calculate_staffing_requirements(
        params.spaceParameters,
        params.serviceParameters,
        params.operationalHours
    )

@router.post("/revenue", response_model=RevenueResult)
async def calculate_revenue(
    params: RevenueParams,
    current_user: User = Depends(get_current_active_user)
):
    """
    Generate revenue projections based on operational parameters.
    """
    calculator = FinancialCalculator()
    return calculator.calculate_revenue_projections(
        params.operationalHours,
        params.projectionPeriod,
        params.projectionLength
    )

@router.post("/pl", response_model=PLResult)
async def calculate_pl(
    params: PLParams,
    current_user: User = Depends(get_current_active_user)
):
    """
    Calculate profit and loss statement based on revenue and cost parameters.
    """
    calculator = FinancialCalculator()
    return calculator.calculate_profit_loss(
        params.monthlyRevenue,
        params.operationalHours
    )

@router.post("/peak-hours", response_model=PeakHourResult)
async def analyze_peak_hours(
    params: PeakHourParams,
    current_user: User = Depends(get_current_active_user)
):
    """
    Analyze peak hour staffing requirements and generate heatmap data.
    """
    calculator = PeakHourCalculator()
    return calculator.analyze_peak_hours(
        params.operationalHours,
        params.serviceParameters
    )

@router.post("/optimize", response_model=OptimizationResult)
async def optimize_staffing(
    params: OptimizationParams,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Optimize staffing based on scenario parameters and constraints.
    """
    # Check if scenario exists and user has access
    scenario = await get_scenario_by_id(db, params.scenario_id)
    if scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    if scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to access this scenario")
    
    # Extract parameters from scenario
    space_params = scenario.spaceParameters
    service_params = scenario.serviceParameters
    operational_params = scenario.operationalHours
    
    # Create calculators
    staffing_calc = StaffingCalculator()
    financial_calc = FinancialCalculator()
    
    # Calculate current staffing
    current_staffing = staffing_calc.calculate_staffing_requirements(
        space_params,
        service_params,
        operational_params
    )
    
    # Calculate current financials
    current_financials = financial_calc.calculate_profit_loss(
        current_staffing.labor_cost * 3,  # Estimate revenue as 3x labor cost
        operational_params
    )
    
    # Apply optimization constraints
    optimized_staffing = staffing_calc._generate_staffing_recommendations(
        current_staffing.foh_staff,
        current_staffing.boh_staff,
        current_staffing.staffing_structure["daily_covers"],
        current_staffing.staffing_structure["capacity"]
    )
    
    # Calculate optimized financials
    optimized_financials = financial_calc.calculate_profit_loss(
        current_financials.pl_data["revenue"],
        operational_params
    )
    
    # Calculate improvements
    improvements = {
        "labor_cost_reduction": (current_staffing.labor_cost - optimized_staffing["labor_cost"]) / current_staffing.labor_cost * 100,
        "profit_increase": (optimized_financials.pl_data["profit"] - current_financials.pl_data["profit"]) / current_financials.pl_data["profit"] * 100,
        "efficiency_gain": (optimized_staffing["efficiency"] - current_staffing.staffing_structure.get("efficiency", 0.7)) * 100
    }
    
    return OptimizationResult(
        originalScenario={
            "staffing": current_staffing.dict(),
            "financials": current_financials.dict()
        },
        optimizedScenario={
            "staffing": optimized_staffing,
            "financials": optimized_financials.dict()
        },
        improvements=improvements,
        recommendations=optimized_staffing["recommendations"]
    )

@router.post("/what-if", response_model=WhatIfResult)
async def what_if_analysis(
    params: WhatIfParams,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform what-if analysis based on scenario changes.
    """
    # Check if scenario exists and user has access
    scenario = await get_scenario_by_id(db, params.baseScenarioId)
    if scenario is None:
        raise HTTPException(status_code=404, detail="Scenario not found")
    
    if scenario.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to access this scenario")
    
    # Create a copy of the scenario with the changes
    modified_scenario = Scenario(
        id=str(uuid.uuid4()),
        name=f"{scenario.name} (What-if)",
        brand=scenario.brand,
        outlet=scenario.outlet,
        fohPositions=scenario.fohPositions,
        bohPositions=scenario.bohPositions,
        spaceParameters=scenario.spaceParameters,
        serviceParameters=scenario.serviceParameters,
        revenueDrivers=scenario.revenueDrivers,
        operationalHours=scenario.operationalHours,
        efficiencyDrivers=scenario.efficiencyDrivers,
        totals=scenario.totals,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    # Apply changes from params.changes
    for key, value in params.changes.items():
        if hasattr(modified_scenario, key):
            setattr(modified_scenario, key, value)
    
    # Create calculators
    staffing_calc = StaffingCalculator()
    financial_calc = FinancialCalculator()
    
    # Calculate base scenario results
    base_staffing = staffing_calc.calculate_staffing_requirements(
        scenario.spaceParameters,
        scenario.serviceParameters,
        scenario.operationalHours
    )
    
    base_financials = financial_calc.calculate_profit_loss(
        base_staffing.labor_cost * 3,  # Estimate revenue as 3x labor cost
        scenario.operationalHours
    )
    
    # Calculate modified scenario results
    modified_staffing = staffing_calc.calculate_staffing_requirements(
        modified_scenario.spaceParameters,
        modified_scenario.serviceParameters,
        modified_scenario.operationalHours
    )
    
    modified_financials = financial_calc.calculate_profit_loss(
        modified_staffing.labor_cost * 3,  # Estimate revenue as 3x labor cost
        modified_scenario.operationalHours
    )
    
    # Calculate impact
    impact = {
        "labor_cost_change": (modified_staffing.labor_cost - base_staffing.labor_cost) / base_staffing.labor_cost * 100,
        "profit_change": (modified_financials.pl_data["profit"] - base_financials.pl_data["profit"]) / base_financials.pl_data["profit"] * 100,
        "staffing_change": (modified_staffing.total_staff - base_staffing.total_staff) / base_staffing.total_staff * 100
    }
    
    # Generate insights
    insights = []
    if impact["labor_cost_change"] < 0:
        insights.append(f"Labor cost reduced by {abs(impact['labor_cost_change']):.1f}%")
    else:
        insights.append(f"Labor cost increased by {impact['labor_cost_change']:.1f}%")
    
    if impact["profit_change"] > 0:
        insights.append(f"Profit increased by {impact['profit_change']:.1f}%")
    else:
        insights.append(f"Profit decreased by {abs(impact['profit_change']):.1f}%")
    
    if impact["staffing_change"] < 0:
        insights.append(f"Staffing reduced by {abs(impact['staffing_change']):.1f}%")
    else:
        insights.append(f"Staffing increased by {impact['staffing_change']:.1f}%")
    
    return WhatIfResult(
        baseScenario={
            "staffing": base_staffing.dict(),
            "financials": base_financials.dict()
        },
        modifiedScenario={
            "staffing": modified_staffing.dict(),
            "financials": modified_financials.dict()
        },
        impact=impact,
        insights=insights
    )

@router.post("/compare", response_model=ComparisonResult)
async def compare_scenarios(
    data: Dict[str, List[str]],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Compare multiple scenarios and generate insights.
    """
    scenario_ids = data.get("scenario_ids", [])
    if not scenario_ids:
        raise HTTPException(status_code=400, detail="No scenario IDs provided")
    
    scenarios = []
    for scenario_id in scenario_ids:
        scenario = await get_scenario_by_id(db, scenario_id)
        if scenario is None:
            raise HTTPException(status_code=404, detail=f"Scenario {scenario_id} not found")
        
        if scenario.owner_id != current_user.id and not current_user.is_superuser:
            raise HTTPException(status_code=403, detail=f"Not authorized to access scenario {scenario_id}")
        
        scenarios.append(scenario)
    
    # Create calculators
    staffing_calc = StaffingCalculator()
    financial_calc = FinancialCalculator()
    
    # Calculate results for each scenario
    scenario_results = []
    for scenario in scenarios:
        staffing = staffing_calc.calculate_staffing_requirements(
            scenario.spaceParameters,
            scenario.serviceParameters,
            scenario.operationalHours
        )
        
        financials = financial_calc.calculate_profit_loss(
            staffing.labor_cost * 3,  # Estimate revenue as 3x labor cost
            scenario.operationalHours
        )
        
        scenario_results.append({
            "id": scenario.id,
            "name": scenario.name,
            "staffing": staffing.dict(),
            "financials": financials.dict()
        })
    
    # Calculate differences
    differences = {
        "labor_cost": {
            "min": min(r["staffing"]["labor_cost"] for r in scenario_results),
            "max": max(r["staffing"]["labor_cost"] for r in scenario_results),
            "avg": sum(r["staffing"]["labor_cost"] for r in scenario_results) / len(scenario_results)
        },
        "profit": {
            "min": min(r["financials"]["pl_data"]["profit"] for r in scenario_results),
            "max": max(r["financials"]["pl_data"]["profit"] for r in scenario_results),
            "avg": sum(r["financials"]["pl_data"]["profit"] for r in scenario_results) / len(scenario_results)
        },
        "staffing": {
            "min": min(r["staffing"]["total_staff"] for r in scenario_results),
            "max": max(r["staffing"]["total_staff"] for r in scenario_results),
            "avg": sum(r["staffing"]["total_staff"] for r in scenario_results) / len(scenario_results)
        }
    }
    
    # Generate insights
    insights = []
    
    # Labor cost insights
    labor_cost_range = differences["labor_cost"]["max"] - differences["labor_cost"]["min"]
    labor_cost_range_pct = labor_cost_range / differences["labor_cost"]["min"] * 100
    insights.append(f"Labor cost varies by {labor_cost_range_pct:.1f}% across scenarios")
    
    # Profit insights
    profit_range = differences["profit"]["max"] - differences["profit"]["min"]
    profit_range_pct = profit_range / differences["profit"]["min"] * 100
    insights.append(f"Profit varies by {profit_range_pct:.1f}% across scenarios")
    
    # Staffing insights
    staffing_range = differences["staffing"]["max"] - differences["staffing"]["min"]
    staffing_range_pct = staffing_range / differences["staffing"]["min"] * 100
    insights.append(f"Staffing varies by {staffing_range_pct:.1f}% across scenarios")
    
    # Find best scenario for each metric
    best_labor_cost = min(scenario_results, key=lambda x: x["staffing"]["labor_cost"])
    best_profit = max(scenario_results, key=lambda x: x["financials"]["pl_data"]["profit"])
    best_staffing = min(scenario_results, key=lambda x: x["staffing"]["total_staff"])
    
    insights.append(f"Scenario '{best_labor_cost['name']}' has the lowest labor cost")
    insights.append(f"Scenario '{best_profit['name']}' has the highest profit")
    insights.append(f"Scenario '{best_staffing['name']}' has the most efficient staffing")
    
    # Generate recommendations
    recommendations = []
    
    # Labor cost recommendations
    if labor_cost_range_pct > 20:
        recommendations.append("Consider standardizing labor cost structure across scenarios")
    
    # Profit recommendations
    if profit_range_pct > 30:
        recommendations.append("Investigate factors causing large profit variations")
    
    # Staffing recommendations
    if staffing_range_pct > 25:
        recommendations.append("Review staffing models for consistency")
    
    return ComparisonResult(
        scenarios=scenario_results,
        differences=differences,
        insights=insights,
        recommendations=recommendations
    ) 