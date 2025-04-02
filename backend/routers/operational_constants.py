from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database import get_db
from models import OperationalConstants
from utils.cache import operational_constants_cache

router = APIRouter(
    prefix="/operational-constants",
    tags=["operational-constants"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[dict])
def get_all_operational_constants(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all operational constants, optionally filtered by category.
    
    Operational constants are configuration values used throughout the application
    for calculations, thresholds, and business rules. They are cached for 5 minutes
    to improve performance.
    
    Parameters:
    - category: Optional category filter (e.g., 'staffing', 'financial', 'operational')
    
    Returns:
    - List of operational constants with their categories, names, values, and descriptions
    
    Example Response:
    ```json
    [
        {
            "id": "1",
            "category": "staffing",
            "name": "service_style_factors",
            "value": {
                "full_service": 1.2,
                "quick_service": 0.8
            },
            "description": "Staffing multipliers for different service styles",
            "created_at": "2024-04-02T10:00:00",
            "updated_at": "2024-04-02T10:00:00"
        },
        {
            "id": "2",
            "category": "financial",
            "name": "high_cost_threshold",
            "value": 0.4,
            "description": "Threshold for identifying high cost percentages",
            "created_at": "2024-04-02T10:00:00",
            "updated_at": "2024-04-02T10:00:00"
        }
    ]
    ```
    """
    query = db.query(OperationalConstants)
    if category:
        query = query.filter(OperationalConstants.category == category)
    
    constants = query.all()
    return [
        {
            "id": str(constant.id),
            "category": constant.category,
            "name": constant.name,
            "value": constant.value,
            "description": constant.description,
            "created_at": constant.created_at.isoformat(),
            "updated_at": constant.updated_at.isoformat()
        }
        for constant in constants
    ]

@router.get("/{constant_id}", response_model=dict)
def get_operational_constant(constant_id: str, db: Session = Depends(get_db)):
    """
    Get a specific operational constant by ID.
    
    Parameters:
    - constant_id: Unique identifier of the operational constant
    
    Returns:
    - Operational constant details including category, name, value, and description
    
    Example Response:
    ```json
    {
        "id": "1",
        "category": "staffing",
        "name": "service_style_factors",
        "value": {
            "full_service": 1.2,
            "quick_service": 0.8
        },
        "description": "Staffing multipliers for different service styles",
        "created_at": "2024-04-02T10:00:00",
        "updated_at": "2024-04-02T10:00:00"
    }
    ```
    
    Raises:
    - 404: If operational constant not found
    """
    constant = db.query(OperationalConstants).filter(OperationalConstants.id == constant_id).first()
    if not constant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operational constant with ID {constant_id} not found"
        )
    
    # Clear cache for this constant
    cache_key = f"{constant.category}:{constant.name}"
    operational_constants_cache.delete(cache_key)
    
    return {
        "id": str(constant.id),
        "category": constant.category,
        "name": constant.name,
        "value": constant.value,
        "description": constant.description,
        "created_at": constant.created_at.isoformat(),
        "updated_at": constant.updated_at.isoformat()
    }

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_operational_constant(
    constant: dict,
    db: Session = Depends(get_db)
):
    """
    Create a new operational constant.
    
    Parameters:
    - constant: Operational constant details to create
    
    Request Body Example:
    ```json
    {
        "category": "operational",
        "name": "peak_traffic_threshold",
        "value": 100,
        "description": "Threshold for peak traffic conditions"
    }
    ```
    
    Returns:
    - Created operational constant with generated ID
    
    Example Response:
    ```json
    {
        "id": "3",
        "category": "operational",
        "name": "peak_traffic_threshold",
        "value": 100,
        "description": "Threshold for peak traffic conditions",
        "created_at": "2024-04-02T10:00:00",
        "updated_at": "2024-04-02T10:00:00"
    }
    ```
    """
    new_constant = OperationalConstants(
        category=constant["category"],
        name=constant["name"],
        value=constant["value"],
        description=constant["description"],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    db.add(new_constant)
    db.commit()
    db.refresh(new_constant)
    
    return {
        "id": str(new_constant.id),
        "category": new_constant.category,
        "name": new_constant.name,
        "value": new_constant.value,
        "description": new_constant.description,
        "created_at": new_constant.created_at.isoformat(),
        "updated_at": new_constant.updated_at.isoformat()
    }

@router.put("/{constant_id}", response_model=dict)
def update_operational_constant(
    constant_id: str,
    constant: dict,
    db: Session = Depends(get_db)
):
    """
    Update an existing operational constant.
    
    Parameters:
    - constant_id: Unique identifier of the operational constant to update
    - constant: Updated operational constant details
    
    Request Body Example:
    ```json
    {
        "value": 120,
        "description": "Updated threshold for peak traffic conditions"
    }
    ```
    
    Returns:
    - Updated operational constant
    
    Example Response:
    ```json
    {
        "id": "3",
        "category": "operational",
        "name": "peak_traffic_threshold",
        "value": 120,
        "description": "Updated threshold for peak traffic conditions",
        "created_at": "2024-04-02T10:00:00",
        "updated_at": "2024-04-02T10:00:00"
    }
    ```
    
    Raises:
    - 404: If operational constant not found
    """
    db_constant = db.query(OperationalConstants).filter(OperationalConstants.id == constant_id).first()
    if not db_constant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Operational constant with ID {constant_id} not found"
        )
    
    # Update fields
    for field, value in constant.items():
        setattr(db_constant, field, value)
    
    db_constant.updated_at = datetime.now()
    
    # Clear cache for this constant
    cache_key = f"{db_constant.category}:{db_constant.name}"
    operational_constants_cache.delete(cache_key)
    
    db.commit()
    db.refresh(db_constant)
    
    return {
        "id": str(db_constant.id),
        "category": db_constant.category,
        "name": db_constant.name,
        "value": db_constant.value,
        "description": db_constant.description,
        "created_at": db_constant.created_at.isoformat(),
        "updated_at": db_constant.updated_at.isoformat()
    } 