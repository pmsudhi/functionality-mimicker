from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.efficiency import (
    EfficiencyMetrics,
    EfficiencyAnalysis,
    EfficiencyResponse
)
from ..calculations import calculate_efficiency_metrics, analyze_efficiency
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/efficiency",
    tags=["efficiency"],
    responses={404: {"description": "Not found"}},
)

@router.get("/metrics", response_model=EfficiencyMetrics)
async def get_efficiency_metrics(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get efficiency metrics for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns efficiency metrics including:
    - Staff utilization rate
    - Revenue per labor hour
    - Covers per labor hour
    - Labor cost percentage
    - Efficiency trends
    """
    try:
        metrics = db.query(EfficiencyMetrics).filter(
            EfficiencyMetrics.scenario_id == scenario_id
        ).first()
        
        if not metrics:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No efficiency metrics found for scenario {scenario_id}"
            )
            
        return metrics
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching efficiency metrics: {str(e)}"
        )

@router.get("/analysis", response_model=EfficiencyAnalysis)
async def get_efficiency_analysis(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get comprehensive efficiency analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns efficiency analysis including:
    - Efficiency score
    - Benchmark comparison
    - Improvement opportunities
    - Best practices recommendations
    """
    try:
        analysis = db.query(EfficiencyAnalysis).filter(
            EfficiencyAnalysis.scenario_id == scenario_id
        ).first()
        
        if not analysis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No efficiency analysis found for scenario {scenario_id}"
            )
            
        return analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching efficiency analysis: {str(e)}"
        )

@router.post("/analyze", response_model=EfficiencyResponse)
async def analyze_efficiency_endpoint(
    scenario_id: str,
    analysis_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform comprehensive efficiency analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    - analysis_params: Parameters for analysis including:
        - include_benchmarks: Whether to include benchmark comparisons
        - include_opportunities: Whether to include improvement opportunities
        - include_recommendations: Whether to include best practices recommendations
        - time_period: Analysis time period
    
    Returns efficiency analysis with:
    - Efficiency metrics
    - Benchmark comparisons
    - Improvement opportunities
    - Best practices recommendations
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Calculate efficiency metrics
        metrics_result = calculate_efficiency_metrics(scenario.parameters)
        
        # Create efficiency metrics
        metrics = EfficiencyMetrics(
            scenario_id=scenario_id,
            staff_utilization=metrics_result.staff_utilization,
            revenue_per_labor_hour=metrics_result.revenue_per_labor_hour,
            covers_per_labor_hour=metrics_result.covers_per_labor_hour,
            labor_cost_percentage=metrics_result.labor_cost_percentage,
            efficiency_trends=metrics_result.efficiency_trends,
            created_at=datetime.now()
        )
        
        # Run efficiency analysis
        analysis_result = analyze_efficiency(scenario.parameters, metrics_result)
        
        # Create efficiency analysis
        analysis = EfficiencyAnalysis(
            scenario_id=scenario_id,
            efficiency_score=analysis_result.efficiency_score,
            benchmark_comparison=analysis_result.benchmark_comparison,
            improvement_opportunities=analysis_result.improvement_opportunities,
            best_practices=analysis_result.best_practices,
            created_at=datetime.now()
        )
        
        db.add(metrics)
        db.add(analysis)
        db.commit()
        
        return EfficiencyResponse(
            scenario_id=scenario_id,
            metrics=metrics,
            analysis=analysis,
            analysis_params=analysis_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing efficiency: {str(e)}"
        ) 