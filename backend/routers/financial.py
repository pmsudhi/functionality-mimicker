from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.financial import (
    LaborCost,
    RevenueProjection,
    FinancialImpact,
    FinancialResponse
)
from ..calculations import calculate_profit_loss, generate_revenue_projections
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/financial",
    tags=["financial"],
    responses={404: {"description": "Not found"}},
)

@router.get("/labor-costs", response_model=LaborCost)
async def get_labor_costs(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get detailed labor cost analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns labor cost analysis including:
    - Total labor cost
    - Cost breakdown by department
    - Cost per staff member
    - Labor cost percentage
    - Cost trends
    """
    try:
        labor_cost = db.query(LaborCost).filter(
            LaborCost.scenario_id == scenario_id
        ).first()
        
        if not labor_cost:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No labor cost analysis found for scenario {scenario_id}"
            )
            
        return labor_cost
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching labor costs: {str(e)}"
        )

@router.get("/revenue", response_model=RevenueProjection)
async def get_revenue_projections(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get revenue projections for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns revenue projections including:
    - Monthly revenue forecasts
    - Revenue per staff member
    - Revenue growth trends
    - Peak period revenue
    """
    try:
        projection = db.query(RevenueProjection).filter(
            RevenueProjection.scenario_id == scenario_id
        ).first()
        
        if not projection:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No revenue projections found for scenario {scenario_id}"
            )
            
        return projection
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching revenue projections: {str(e)}"
        )

@router.get("/impact-analysis", response_model=FinancialImpact)
async def get_financial_impact(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get comprehensive financial impact analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns financial impact analysis including:
    - Profit and loss projections
    - ROI calculations
    - Cost-benefit analysis
    - Financial risk assessment
    """
    try:
        impact = db.query(FinancialImpact).filter(
            FinancialImpact.scenario_id == scenario_id
        ).first()
        
        if not impact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No financial impact analysis found for scenario {scenario_id}"
            )
            
        return impact
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching financial impact analysis: {str(e)}"
        )

@router.post("/analyze", response_model=FinancialResponse)
async def analyze_financial_impact(
    scenario_id: str,
    analysis_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform comprehensive financial analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    - analysis_params: Parameters for analysis including:
        - time_period: Analysis time period
        - include_roi: Whether to include ROI calculations
        - include_risk: Whether to include risk assessment
        - include_trends: Whether to include trend analysis
    
    Returns financial analysis with:
    - Labor cost analysis
    - Revenue projections
    - Profit and loss analysis
    - ROI calculations
    - Risk assessment
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Run financial analysis
        pl_result = calculate_profit_loss(scenario.parameters)
        revenue_result = generate_revenue_projections(scenario.parameters)
        
        # Create financial impact analysis
        impact = FinancialImpact(
            scenario_id=scenario_id,
            labor_costs=pl_result.labor_costs,
            revenue_projections=revenue_result,
            profit_loss=pl_result,
            created_at=datetime.now()
        )
        
        db.add(impact)
        db.commit()
        
        return FinancialResponse(
            scenario_id=scenario_id,
            impact=impact,
            analysis_params=analysis_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing financial impact: {str(e)}"
        ) 