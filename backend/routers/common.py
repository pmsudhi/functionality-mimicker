from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime

from ..database import get_db
from ..models import User, get_current_active_user
from ..models.common import (
    Filter,
    Parameter,
    FilterResponse,
    ParameterResponse
)
from ..utils.cache import cache

router = APIRouter(
    prefix="/api/common",
    tags=["common"],
    responses={404: {"description": "Not found"}},
)

@router.get("/filters", response_model=List[Filter])
@cache(expire=3600)  # Cache for 1 hour
async def get_filters(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all available filters for the application.
    
    Returns list of filters including:
    - Filter name
    - Filter type
    - Available options
    - Default value
    """
    try:
        filters = db.query(Filter).all()
        return filters
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching filters: {str(e)}"
        )

@router.get("/parameters", response_model=List[Parameter])
@cache(expire=3600)  # Cache for 1 hour
async def get_parameters(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all available parameters for the application.
    
    Returns list of parameters including:
    - Parameter name
    - Parameter type
    - Valid range
    - Default value
    """
    try:
        parameters = db.query(Parameter).all()
        return parameters
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching parameters: {str(e)}"
        )

@router.post("/filters/apply", response_model=FilterResponse)
async def apply_filters(
    filter_params: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Apply filters to get filtered data.
    
    Parameters:
    - filter_params: Dictionary of filter parameters to apply
    
    Returns filtered data with:
    - Applied filters
    - Filtered results
    - Total count
    """
    try:
        # Validate filter parameters
        filters = db.query(Filter).filter(
            Filter.name.in_(filter_params.keys())
        ).all()
        
        if not filters:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid filters provided"
            )
            
        # Apply filters and get results
        # This is a placeholder - implement actual filtering logic
        filtered_results = []
        total_count = 0
        
        return FilterResponse(
            applied_filters=filter_params,
            results=filtered_results,
            total_count=total_count
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error applying filters: {str(e)}"
        )

@router.post("/parameters/validate", response_model=ParameterResponse)
async def validate_parameters(
    parameter_values: Dict[str, Any],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Validate parameter values.
    
    Parameters:
    - parameter_values: Dictionary of parameter values to validate
    
    Returns validation results with:
    - Valid parameters
    - Invalid parameters with errors
    - Suggested corrections
    """
    try:
        # Get parameter definitions
        parameters = db.query(Parameter).filter(
            Parameter.name.in_(parameter_values.keys())
        ).all()
        
        if not parameters:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid parameters provided"
            )
            
        # Validate parameters
        valid_params = {}
        invalid_params = {}
        suggestions = {}
        
        for param in parameters:
            value = parameter_values.get(param.name)
            if param.is_valid(value):
                valid_params[param.name] = value
            else:
                invalid_params[param.name] = value
                suggestions[param.name] = param.get_suggestion(value)
        
        return ParameterResponse(
            valid_parameters=valid_params,
            invalid_parameters=invalid_params,
            suggestions=suggestions
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error validating parameters: {str(e)}"
        ) 