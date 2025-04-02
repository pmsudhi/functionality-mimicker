from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.staffing import (
    StaffPosition,
    StaffingRequirement,
    StaffingCalculation,
    StaffingResponse
)
from ..calculations import calculate_staffing_requirements
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/staffing",
    tags=["staffing"],
    responses={404: {"description": "Not found"}},
)

@router.get("/positions", response_model=List[StaffPosition])
@cache(expire=3600)  # Cache for 1 hour
async def get_staff_positions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all available staff positions with their details.
    
    Returns a list of staff positions including:
    - Position ID
    - Position name
    - Department (FOH/BOH)
    - Required qualifications
    - Base salary range
    - Typical responsibilities
    """
    try:
        positions = db.query(StaffPosition).all()
        return positions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching staff positions: {str(e)}"
        )

@router.get("/requirements", response_model=List[StaffingRequirement])
async def get_staffing_requirements(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get staffing requirements for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to get requirements for
    
    Returns staffing requirements including:
    - Position requirements
    - Required headcount
    - Shift requirements
    - Special considerations
    """
    try:
        requirements = db.query(StaffingRequirement).filter(
            StaffingRequirement.scenario_id == scenario_id
        ).all()
        
        if not requirements:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No staffing requirements found for scenario {scenario_id}"
            )
            
        return requirements
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching staffing requirements: {str(e)}"
        )

@router.get("/calculations", response_model=StaffingCalculation)
async def get_staffing_calculations(
    scenario_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get detailed staffing calculations for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to get calculations for
    
    Returns staffing calculations including:
    - Total staff required
    - FOH/BOH breakdown
    - Cost calculations
    - Efficiency metrics
    """
    try:
        calculations = db.query(StaffingCalculation).filter(
            StaffingCalculation.scenario_id == scenario_id
        ).first()
        
        if not calculations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No staffing calculations found for scenario {scenario_id}"
            )
            
        return calculations
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching staffing calculations: {str(e)}"
        )

@router.post("/optimize", response_model=StaffingResponse)
async def optimize_staffing(
    scenario_id: str,
    optimization_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Optimize staffing requirements for a specific scenario.
    
    Parameters:
    - scenario_id: ID of the scenario to optimize
    - optimization_params: Parameters for optimization including:
        - target_efficiency: Target efficiency ratio
        - budget_constraints: Budget limitations
        - skill_requirements: Required skills and qualifications
        - shift_preferences: Preferred shift patterns
    
    Returns optimized staffing plan with:
    - Recommended headcount
    - Shift schedules
    - Cost projections
    - Efficiency metrics
    """
    try:
        # Get current scenario
        scenario = db.query(Scenario).filter(Scenario.id == scenario_id).first()
        if not scenario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Scenario {scenario_id} not found"
            )
            
        # Run optimization
        result = calculate_staffing_requirements(
            scenario.parameters,
            optimization_params
        )
        
        # Update scenario with new calculations
        scenario.calculations = result
        scenario.updated_at = datetime.now()
        db.commit()
        
        return StaffingResponse(
            scenario_id=scenario_id,
            calculations=result,
            optimization_params=optimization_params
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error optimizing staffing: {str(e)}"
        ) 