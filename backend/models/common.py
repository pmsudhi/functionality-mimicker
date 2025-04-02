from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from enum import Enum

class FilterType(str, Enum):
    TEXT = "text"
    NUMBER = "number"
    DATE = "date"
    BOOLEAN = "boolean"
    ENUM = "enum"
    MULTI_SELECT = "multi_select"

class ParameterType(str, Enum):
    INTEGER = "integer"
    FLOAT = "float"
    STRING = "string"
    BOOLEAN = "boolean"
    DATE = "date"
    TIME = "time"
    DATETIME = "datetime"
    ENUM = "enum"

class Filter(BaseModel):
    id: str
    name: str
    type: FilterType
    options: Optional[List[str]]
    default_value: Any
    description: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Parameter(BaseModel):
    id: str
    name: str
    type: ParameterType
    min_value: Optional[Union[int, float]]
    max_value: Optional[Union[int, float]]
    default_value: Any
    description: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

    def is_valid(self, value: Any) -> bool:
        if value is None:
            return False
            
        if self.type == ParameterType.INTEGER:
            try:
                int_value = int(value)
                if self.min_value is not None and int_value < self.min_value:
                    return False
                if self.max_value is not None and int_value > self.max_value:
                    return False
                return True
            except (ValueError, TypeError):
                return False
                
        elif self.type == ParameterType.FLOAT:
            try:
                float_value = float(value)
                if self.min_value is not None and float_value < self.min_value:
                    return False
                if self.max_value is not None and float_value > self.max_value:
                    return False
                return True
            except (ValueError, TypeError):
                return False
                
        elif self.type == ParameterType.BOOLEAN:
            return isinstance(value, bool)
            
        elif self.type == ParameterType.DATE:
            try:
                datetime.strptime(value, "%Y-%m-%d")
                return True
            except (ValueError, TypeError):
                return False
                
        elif self.type == ParameterType.TIME:
            try:
                datetime.strptime(value, "%H:%M:%S")
                return True
            except (ValueError, TypeError):
                return False
                
        elif self.type == ParameterType.DATETIME:
            try:
                datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
                return True
            except (ValueError, TypeError):
                return False
                
        elif self.type == ParameterType.ENUM:
            return value in self.options
            
        return True

    def get_suggestion(self, value: Any) -> str:
        if self.type == ParameterType.INTEGER:
            try:
                int_value = int(value)
                if self.min_value is not None and int_value < self.min_value:
                    return f"Value should be at least {self.min_value}"
                if self.max_value is not None and int_value > self.max_value:
                    return f"Value should be at most {self.max_value}"
            except (ValueError, TypeError):
                return "Value should be an integer"
                
        elif self.type == ParameterType.FLOAT:
            try:
                float_value = float(value)
                if self.min_value is not None and float_value < self.min_value:
                    return f"Value should be at least {self.min_value}"
                if self.max_value is not None and float_value > self.max_value:
                    return f"Value should be at most {self.max_value}"
            except (ValueError, TypeError):
                return "Value should be a number"
                
        elif self.type == ParameterType.BOOLEAN:
            return "Value should be true or false"
            
        elif self.type == ParameterType.DATE:
            return "Value should be in YYYY-MM-DD format"
            
        elif self.type == ParameterType.TIME:
            return "Value should be in HH:MM:SS format"
            
        elif self.type == ParameterType.DATETIME:
            return "Value should be in YYYY-MM-DD HH:MM:SS format"
            
        elif self.type == ParameterType.ENUM:
            return f"Value should be one of: {', '.join(self.options)}"
            
        return "Invalid value"

class FilterResponse(BaseModel):
    applied_filters: Dict[str, Any]
    results: List[Any]
    total_count: int
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True

class ParameterResponse(BaseModel):
    valid_parameters: Dict[str, Any]
    invalid_parameters: Dict[str, Any]
    suggestions: Dict[str, str]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 