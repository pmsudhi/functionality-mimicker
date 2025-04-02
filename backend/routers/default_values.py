from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models.default_values import DefaultValues, DefaultValuesCreate, DefaultValuesUpdate, DefaultValuesResponse
from services import default_values as default_values_service

router = APIRouter(
    prefix="/default-values",
    tags=["default-values"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[DefaultValuesResponse])
def get_all_default_values(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all default values, optionally filtered by category"""
    if category:
        return default_values_service.get_default_values_by_category(db, category)
    return default_values_service.get_all_default_values(db)

@router.get("/{default_id}", response_model=DefaultValuesResponse)
def get_default_value(default_id: str, db: Session = Depends(get_db)):
    """Get a default value by ID"""
    default_value = default_values_service.get_default_value(db, default_id)
    if not default_value:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Default value with ID {default_id} not found"
        )
    return default_value

@router.post("/", response_model=DefaultValuesResponse, status_code=status.HTTP_201_CREATED)
def create_default_value(
    default_value: DefaultValuesCreate,
    db: Session = Depends(get_db)
):
    """Create a new default value"""
    return default_values_service.create_default_value(db, default_value)

@router.put("/{default_id}", response_model=DefaultValuesResponse)
def update_default_value(
    default_id: str,
    default_value: DefaultValuesUpdate,
    db: Session = Depends(get_db)
):
    """Update a default value"""
    updated_default = default_values_service.update_default_value(db, default_id, default_value)
    if not updated_default:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Default value with ID {default_id} not found"
        )
    return updated_default

@router.delete("/{default_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_default_value(default_id: str, db: Session = Depends(get_db)):
    """Delete a default value"""
    success = default_values_service.delete_default_value(db, default_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Default value with ID {default_id} not found"
        )
    return None

@router.get("/name/{name}", response_model=dict)
def get_default_value_by_name(name: str, db: Session = Depends(get_db)):
    """Get a default value by name"""
    value = default_values_service.get_default_value_by_name(db, name)
    if value is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Default value with name {name} not found"
        )
    return {"value": value}

@router.get("/category/{category}/dict", response_model=dict)
def get_default_values_dict(category: str, db: Session = Depends(get_db)):
    """Get all default values for a category as a dictionary"""
    return default_values_service.get_default_values_dict(db, category) 