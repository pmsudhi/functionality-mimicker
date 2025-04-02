from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Dict, Any, List, Optional
import uuid
import json
from datetime import datetime

from models.default_values import DefaultValues, DefaultValuesCreate, DefaultValuesUpdate
from database import DBDefaultValues

def get_default_value(db: Session, default_id: str) -> Optional[DefaultValues]:
    """Get a default value by ID"""
    result = db.execute(select(DBDefaultValues).where(DBDefaultValues.id == default_id))
    db_default = result.scalars().first()
    if db_default:
        return DefaultValues(
            id=db_default.id,
            category=db_default.category,
            name=db_default.name,
            value=db_default.value,
            description=db_default.description,
            created_at=db_default.created_at,
            updated_at=db_default.updated_at,
            is_active=db_default.is_active
        )
    return None

def get_default_values_by_category(db: Session, category: str) -> List[DefaultValues]:
    """Get all default values for a category"""
    result = db.execute(
        select(DBDefaultValues)
        .where(DBDefaultValues.category == category)
        .where(DBDefaultValues.is_active == True)
    )
    db_defaults = result.scalars().all()
    return [
        DefaultValues(
            id=db_default.id,
            category=db_default.category,
            name=db_default.name,
            value=db_default.value,
            description=db_default.description,
            created_at=db_default.created_at,
            updated_at=db_default.updated_at,
            is_active=db_default.is_active
        )
        for db_default in db_defaults
    ]

def get_all_default_values(db: Session) -> List[DefaultValues]:
    """Get all default values"""
    result = db.execute(select(DBDefaultValues))
    db_defaults = result.scalars().all()
    return [
        DefaultValues(
            id=db_default.id,
            category=db_default.category,
            name=db_default.name,
            value=db_default.value,
            description=db_default.description,
            created_at=db_default.created_at,
            updated_at=db_default.updated_at,
            is_active=db_default.is_active
        )
        for db_default in db_defaults
    ]

def create_default_value(db: Session, default_value: DefaultValuesCreate) -> DefaultValues:
    """Create a new default value"""
    db_default = DBDefaultValues(
        id=str(uuid.uuid4()),
        category=default_value.category,
        name=default_value.name,
        value=json.dumps(default_value.value),
        description=default_value.description,
        created_at=datetime.now(),
        updated_at=datetime.now(),
        is_active=True
    )
    db.add(db_default)
    db.commit()
    db.refresh(db_default)
    return DefaultValues(
        id=db_default.id,
        category=db_default.category,
        name=db_default.name,
        value=json.loads(db_default.value),
        description=db_default.description,
        created_at=db_default.created_at,
        updated_at=db_default.updated_at,
        is_active=db_default.is_active
    )

def update_default_value(db: Session, default_id: str, default_value: DefaultValuesUpdate) -> Optional[DefaultValues]:
    """Update a default value"""
    result = db.execute(select(DBDefaultValues).where(DBDefaultValues.id == default_id))
    db_default = result.scalars().first()
    if not db_default:
        return None
    
    update_data = default_value.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "value" and value is not None:
            setattr(db_default, field, json.dumps(value))
        else:
            setattr(db_default, field, value)
    
    db_default.updated_at = datetime.now()
    db.commit()
    db.refresh(db_default)
    
    return DefaultValues(
        id=db_default.id,
        category=db_default.category,
        name=db_default.name,
        value=json.loads(db_default.value),
        description=db_default.description,
        created_at=db_default.created_at,
        updated_at=db_default.updated_at,
        is_active=db_default.is_active
    )

def delete_default_value(db: Session, default_id: str) -> bool:
    """Delete a default value"""
    result = db.execute(select(DBDefaultValues).where(DBDefaultValues.id == default_id))
    db_default = result.scalars().first()
    if not db_default:
        return False
    
    db.delete(db_default)
    db.commit()
    return True

def get_default_value_by_name(db: Session, name: str) -> Optional[Any]:
    """Get a default value by name and return just the value"""
    result = db.execute(
        select(DBDefaultValues)
        .where(DBDefaultValues.name == name)
        .where(DBDefaultValues.is_active == True)
    )
    db_default = result.scalars().first()
    if db_default:
        return json.loads(db_default.value)
    return None

def get_default_values_dict(db: Session, category: Optional[str] = None) -> Dict[str, Any]:
    """Get all default values as a dictionary, optionally filtered by category"""
    query = select(DBDefaultValues).where(DBDefaultValues.is_active == True)
    if category:
        query = query.where(DBDefaultValues.category == category)
    
    result = db.execute(query)
    db_defaults = result.scalars().all()
    
    defaults_dict = {}
    for db_default in db_defaults:
        defaults_dict[db_default.name] = json.loads(db_default.value)
    
    return defaults_dict 