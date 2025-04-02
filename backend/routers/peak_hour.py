from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.peak_hour import (
    PeakHourAnalysis,
    PeakHourStaffing,
    PeakHourResponse
)
from ..calculations import analyze_peak_hours
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/peak",
    tags=["peak-hour"],
    responses={404: {"description": "Not found"}},
)

@router.get("/analysis", response_model=PeakHourAnalysis)
async def get_peak_hour_analysis(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get peak hour analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns peak hour analysis including:
    - Peak hour identification
    - Demand patterns
    - Capacity utilization
    - Bottleneck analysis
    """
    try:
        analysis = db.query(PeakHourAnalysis).filter(
            PeakHourAnalysis.scenario_id == scenario_id
        ).first()
        
        if not analysis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No peak hour analysis found for scenario {scenario_id}"
            )
            
        return analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching peak hour analysis: {str(e)}"
        )

@router.get("/staffing", response_model=PeakHourStaffing)
async def get_peak_hour_staffing(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get peak hour staffing requirements for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    
    Returns peak hour staffing requirements including:
    - Required staff count by position
    - Shift schedules
    - Coverage ratios
    - Buffer requirements
    """
    try:
        staffing = db.query(PeakHourStaffing).filter(
            PeakHourStaffing.scenario_id == scenario_id
        ).first()
        
        if not staffing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No peak hour staffing found for scenario {scenario_id}"
            )
            
        return staffing
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching peak hour staffing: {str(e)}"
        )

@router.post("/analyze", response_model=PeakHourResponse)
async def analyze_peak_hours_endpoint(
    scenario_id: str,
    analysis_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Perform peak hour analysis for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to analyze
    - analysis_params: Parameters for analysis including:
        - time_period: Analysis time period
        - include_staffing: Whether to include staffing requirements
        - include_capacity: Whether to include capacity analysis
        - include_bottlenecks: Whether to include bottleneck analysis
    
    Returns peak hour analysis with:
    - Peak hour identification
    - Demand patterns
    - Staffing requirements
    - Capacity utilization
    - Bottleneck analysis
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Run peak hour analysis
        result = analyze_peak_hours(scenario.parameters)
        
        # Create peak hour analysis
        analysis = PeakHourAnalysis(
            scenario_id=scenario_id,
            peak_hours=result.peak_hours,
            demand_patterns=result.demand_patterns,
            capacity_utilization=result.capacity_utilization,
            bottlenecks=result.bottlenecks,
            created_at=datetime.now()
        )
        
        # Create peak hour staffing if requested
        staffing = None
        if analysis_params.get("include_staffing", True):
            staffing = PeakHourStaffing(
                scenario_id=scenario_id,
                required_staff=result.required_staff,
                shift_schedules=result.shift_schedules,
                coverage_ratios=result.coverage_ratios,
                buffer_requirements=result.buffer_requirements,
                created_at=datetime.now()
            )
            db.add(staffing)
        
        db.add(analysis)
        db.commit()
        
        return PeakHourResponse(
            scenario_id=scenario_id,
            analysis=analysis,
            staffing=staffing,
            analysis_params=analysis_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing peak hours: {str(e)}"
        ) 