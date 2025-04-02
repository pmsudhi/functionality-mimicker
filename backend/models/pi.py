from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum

class TimePeriod(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    ANNUALLY = "annually"

class IndicatorStatus(str, Enum):
    EXCELLENT = "excellent"
    GOOD = "good"
    FAIR = "fair"
    POOR = "poor"
    CRITICAL = "critical"

class IndicatorTrend(str, Enum):
    IMPROVING = "improving"
    STABLE = "stable"
    DECLINING = "declining"
    VOLATILE = "volatile"

class PerformanceIndicator(BaseModel):
    id: str
    scenario_id: str
    name: str
    current_value: float
    target_value: float
    status: IndicatorStatus
    trend: IndicatorTrend
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class KeyTrend(BaseModel):
    indicator: str
    trend_type: str
    magnitude: float
    significance: str
    description: str

class AreaOfConcern(BaseModel):
    indicator: str
    severity: str
    impact: str
    root_cause: str
    mitigation_suggestions: List[str]

class Recommendation(BaseModel):
    category: str
    title: str
    description: str
    expected_impact: str
    implementation_steps: List[str]
    priority: str

class PIAnalysis(BaseModel):
    id: str
    scenario_id: str
    performance_score: float
    key_trends: List[KeyTrend]
    areas_of_concern: List[AreaOfConcern]
    recommendations: List[Recommendation]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisParams(BaseModel):
    include_trends: bool = True
    include_benchmarks: bool = True
    include_recommendations: bool = True
    time_period: TimePeriod = TimePeriod.MONTHLY

class PIResponse(BaseModel):
    scenario_id: str
    indicators: List[PerformanceIndicator]
    analysis: PIAnalysis
    analysis_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 