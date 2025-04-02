from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.pi import (
    PerformanceIndicator,
    PIAnalysis,
    PIResponse
)
from ..calculations import calculate_pi_metrics, analyze_pi_trends
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/pi",
    tags=["performance-indicators"],
    responses={404: {"description": "Not found"}},
)

@router.get("/indicators", response_model=List[PerformanceIndicator])
async def get_performance_indicators(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get performance indicators for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns list of performance indicators including:
    - Indicator name
    - Current value
    - Target value
    - Status
    - Trend
    """
    try:
        indicators = db.query(PerformanceIndicator).filter(
            PerformanceIndicator.scenario_id == scenario_id
        ).all()
        
        if not indicators:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No performance indicators found for scenario {scenario_id}"
            )
            
        return indicators
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching performance indicators: {str(e)}"
        )

@router.get("/analysis", response_model=PIAnalysis)
async def get_pi_analysis(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get comprehensive PI analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns PI analysis including:
    - Overall performance score
    - Key trends
    - Areas of concern
    - Improvement recommendations
    """
    try:
        analysis = db.query(PIAnalysis).filter(
            PIAnalysis.scenario_id == scenario_id
        ).first()
        
        if not analysis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No PI analysis found for scenario {scenario_id}"
            )
            
        return analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching PI analysis: {str(e)}"
        )

@router.post("/analyze", response_model=PIResponse)
async def analyze_pi_endpoint(
    scenario_id: str,
    analysis_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform comprehensive PI analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    - analysis_params: Parameters for analysis including:
        - include_trends: Whether to include trend analysis
        - include_benchmarks: Whether to include benchmark comparisons
        - include_recommendations: Whether to include improvement recommendations
        - time_period: Analysis time period
    
    Returns PI analysis with:
    - Performance indicators
    - Trend analysis
    - Benchmark comparisons
    - Improvement recommendations
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Calculate PI metrics
        metrics_result = calculate_pi_metrics(scenario.parameters)
        
        # Create performance indicators
        indicators = []
        for metric in metrics_result.metrics:
            indicator = PerformanceIndicator(
                scenario_id=scenario_id,
                name=metric.name,
                current_value=metric.current_value,
                target_value=metric.target_value,
                status=metric.status,
                trend=metric.trend,
                created_at=datetime.now()
            )
            indicators.append(indicator)
        
        # Analyze PI trends
        analysis_result = analyze_pi_trends(scenario.parameters, metrics_result)
        
        # Create PI analysis
        analysis = PIAnalysis(
            scenario_id=scenario_id,
            performance_score=analysis_result.performance_score,
            key_trends=analysis_result.key_trends,
            areas_of_concern=analysis_result.areas_of_concern,
            recommendations=analysis_result.recommendations,
            created_at=datetime.now()
        )
        
        db.add_all(indicators)
        db.add(analysis)
        db.commit()
        
        return PIResponse(
            scenario_id=scenario_id,
            indicators=indicators,
            analysis=analysis,
            analysis_params=analysis_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing performance indicators: {str(e)}"
        ) 