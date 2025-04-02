from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
from datetime import datetime

class DefaultValues(BaseModel):
    id: str = Field(..., description="Unique identifier for the default values")
    category: str = Field(..., description="Category of default values (e.g., 'staffing', 'financial', 'operational')")
    name: str = Field(..., description="Name of the default value")
    value: Any = Field(..., description="Default value")
    description: str = Field(..., description="Description of the default value")
    created_at: datetime = Field(default_factory=datetime.now, description="Creation timestamp")
    updated_at: datetime = Field(default_factory=datetime.now, description="Last update timestamp")
    is_active: bool = Field(default=True, description="Whether this default value is active")

class DefaultValuesCreate(BaseModel):
    category: str = Field(..., description="Category of default values")
    name: str = Field(..., description="Name of the default value")
    value: Any = Field(..., description="Default value")
    description: str = Field(..., description="Description of the default value")

class DefaultValuesUpdate(BaseModel):
    value: Optional[Any] = Field(None, description="New default value")
    description: Optional[str] = Field(None, description="New description")
    is_active: Optional[bool] = Field(None, description="Whether this default value is active")

class DefaultValuesResponse(BaseModel):
    id: str
    category: str
    name: str
    value: Any
    description: str
    created_at: datetime
    updated_at: datetime
    is_active: bool 