from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum

class TimeSlot(str, Enum):
    MORNING = "morning"
    LUNCH = "lunch"
    AFTERNOON = "afternoon"
    DINNER = "dinner"
    EVENING = "evening"
    NIGHT = "night"

class DemandPattern(BaseModel):
    time_slot: TimeSlot
    demand_level: float
    customer_count: int
    average_dwell_time: float
    peak_factor: float

class CapacityUtilization(BaseModel):
    time_slot: TimeSlot
    utilization_rate: float
    available_capacity: int
    used_capacity: int
    waiting_time: float

class Bottleneck(BaseModel):
    time_slot: TimeSlot
    resource_type: str
    bottleneck_factor: float
    impact_level: str
    mitigation_suggestions: List[str]

class PeakHourAnalysis(BaseModel):
    id: str
    scenario_id: str
    peak_hours: List[TimeSlot]
    demand_patterns: List[DemandPattern]
    capacity_utilization: List[CapacityUtilization]
    bottlenecks: List[Bottleneck]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class StaffRequirement(BaseModel):
    position_id: str
    count: int
    shift_type: str
    coverage_ratio: float

class ShiftSchedule(BaseModel):
    time_slot: TimeSlot
    staff_requirements: List[StaffRequirement]
    total_staff: int
    buffer_staff: int

class PeakHourStaffing(BaseModel):
    id: str
    scenario_id: str
    required_staff: Dict[str, int]  # position_id -> count
    shift_schedules: List[ShiftSchedule]
    coverage_ratios: Dict[str, float]  # position_id -> ratio
    buffer_requirements: Dict[str, int]  # position_id -> count
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisParams(BaseModel):
    time_period: str
    include_staffing: bool = True
    include_capacity: bool = True
    include_bottlenecks: bool = True

class PeakHourResponse(BaseModel):
    scenario_id: str
    analysis: PeakHourAnalysis
    staffing: Optional[PeakHourStaffing]
    analysis_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 