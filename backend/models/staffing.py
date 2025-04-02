from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum

class Department(str, Enum):
    FOH = "FOH"
    BOH = "BOH"

class StaffPosition(BaseModel):
    id: str
    name: str
    department: Department
    qualifications: List[str]
    base_salary_range: Dict[str, float]  # min and max
    responsibilities: List[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ShiftType(str, Enum):
    MORNING = "morning"
    AFTERNOON = "afternoon"
    EVENING = "evening"
    NIGHT = "night"
    FLEXIBLE = "flexible"

class StaffingRequirement(BaseModel):
    id: str
    scenario_id: str
    position_id: str
    required_count: int
    shift_types: List[ShiftType]
    special_considerations: Optional[List[str]]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class StaffingCalculation(BaseModel):
    id: str
    scenario_id: str
    total_staff: int
    foh_count: int
    boh_count: int
    foh_boh_ratio: float
    total_cost: float
    cost_per_staff: float
    efficiency_ratio: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class OptimizationParams(BaseModel):
    target_efficiency: float = Field(..., ge=0.0, le=1.0)
    budget_constraints: Dict[str, float]
    skill_requirements: List[str]
    shift_preferences: List[ShiftType]

class StaffingResponse(BaseModel):
    scenario_id: str
    calculations: StaffingCalculation
    optimization_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 