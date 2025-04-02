from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.revenue import (
    RevenueProjection,
    RevenueForecast,
    RevenueResponse
)
from ..calculations import calculate_revenue_projections, generate_revenue_forecast
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/revenue",
    tags=["revenue"],
    responses={404: {"description": "Not found"}},
)

@router.get("/projections", response_model=RevenueProjection)
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
    - Revenue per cover
    - Revenue growth trends
    - Peak period revenue
    """
    try:
        projections = db.query(RevenueProjection).filter(
            RevenueProjection.scenario_id == scenario_id
        ).first()
        
        if not projections:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No revenue projections found for scenario {scenario_id}"
            )
            
        return projections
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching revenue projections: {str(e)}"
        )

@router.get("/forecast", response_model=RevenueForecast)
async def get_revenue_forecast(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get detailed revenue forecast for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns revenue forecast including:
    - Forecasted revenue by period
    - Confidence intervals
    - Seasonal patterns
    - Growth projections
    """
    try:
        forecast = db.query(RevenueForecast).filter(
            RevenueForecast.scenario_id == scenario_id
        ).first()
        
        if not forecast:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No revenue forecast found for scenario {scenario_id}"
            )
            
        return forecast
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching revenue forecast: {str(e)}"
        )

@router.post("/analyze", response_model=RevenueResponse)
async def analyze_revenue_endpoint(
    scenario_id: str,
    analysis_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform comprehensive revenue analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    - analysis_params: Parameters for analysis including:
        - forecast_period: Number of periods to forecast
        - include_seasonality: Whether to include seasonal patterns
        - include_growth: Whether to include growth projections
        - confidence_level: Confidence level for forecasts
    
    Returns revenue analysis with:
    - Revenue projections
    - Detailed forecasts
    - Seasonal patterns
    - Growth projections
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Calculate revenue projections
        projections_result = calculate_revenue_projections(scenario.parameters)
        
        # Create revenue projections
        projections = RevenueProjection(
            scenario_id=scenario_id,
            monthly_forecasts=projections_result.monthly_forecasts,
            revenue_per_cover=projections_result.revenue_per_cover,
            growth_trends=projections_result.growth_trends,
            peak_period_revenue=projections_result.peak_period_revenue,
            created_at=datetime.now()
        )
        
        # Generate revenue forecast
        forecast_result = generate_revenue_forecast(scenario.parameters, projections_result)
        
        # Create revenue forecast
        forecast = RevenueForecast(
            scenario_id=scenario_id,
            forecasted_revenue=forecast_result.forecasted_revenue,
            confidence_intervals=forecast_result.confidence_intervals,
            seasonal_patterns=forecast_result.seasonal_patterns,
            growth_projections=forecast_result.growth_projections,
            created_at=datetime.now()
        )
        
        db.add(projections)
        db.add(forecast)
        db.commit()
        
        return RevenueResponse(
            scenario_id=scenario_id,
            projections=projections,
            forecast=forecast,
            analysis_params=analysis_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing revenue: {str(e)}"
        ) 