from sqlalchemy.orm import Session
from typing import Any, Dict, Optional
from services import default_values as default_values_service
from models import OperationalConstants
from .cache import operational_constants_cache

def get_default_value(db: Session, name: str) -> Any:
    """Get a default value by name"""
    return default_values_service.get_default_value_by_name(db, name)

def get_default_values_by_category(db: Session, category: str) -> Dict[str, Any]:
    """Get all default values for a category as a dictionary"""
    return default_values_service.get_default_values_dict(db, category)

def get_staffing_defaults(db: Session) -> Dict[str, Any]:
    """Get all staffing-related default values"""
    return get_default_values_by_category(db, "staffing")

def get_financial_defaults(db: Session) -> Dict[str, Any]:
    """Get all financial-related default values"""
    return get_default_values_by_category(db, "financial")

def get_operational_defaults(db: Session) -> Dict[str, Any]:
    """Get all operational-related default values"""
    return get_default_values_by_category(db, "operational")

def get_efficiency_defaults(db: Session) -> Dict[str, Any]:
    """Get all efficiency-related default values"""
    return get_default_values_by_category(db, "efficiency")

def get_space_defaults(db: Session) -> Dict[str, Any]:
    """Get all space-related default values"""
    return get_default_values_by_category(db, "space")

def get_operational_constant(db: Session, category: str, name: str) -> Any:
    """
    Get an operational constant from the database with caching.
    
    This function retrieves operational constants used throughout the application,
    such as thresholds, factors, and configuration values. The values are cached
    for 5 minutes to improve performance.
    
    Args:
        db: Database session
        category: Constant category (e.g., 'staffing', 'financial', 'operational')
        name: Constant name
        
    Returns:
        The constant value if found
        
    Raises:
        ValueError: If the constant is not found in the database
        
    Example:
        ```python
        # Get service style factors
        service_factors = get_operational_constant(db, 'service', 'service_style_factors')
        # Returns: {'full_service': 1.2, 'quick_service': 0.8}
        
        # Get kitchen complexity factors
        complexity_factors = get_operational_constant(db, 'kitchen', 'complexity_factors')
        # Returns: {'simple': 1.0, 'moderate': 1.2, 'complex': 1.5}
        
        # Get cost threshold
        cost_threshold = get_operational_constant(db, 'costs', 'high_cost_threshold')
        # Returns: 0.4
        ```
    """
    # Generate cache key
    cache_key = f"{category}:{name}"
    
    # Try to get from cache first
    cached_value = operational_constants_cache.get(cache_key)
    if cached_value is not None:
        return cached_value
    
    # If not in cache, get from database
    constant = db.query(OperationalConstants).filter(
        OperationalConstants.category == category,
        OperationalConstants.name == name
    ).first()
    
    if not constant:
        raise ValueError(f"Operational constant not found: {category}.{name}")
    
    # Cache the value
    operational_constants_cache.set(cache_key, constant.value)
    
    return constant.value 