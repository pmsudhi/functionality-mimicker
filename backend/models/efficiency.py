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

class EfficiencyTrend(BaseModel):
    period: str
    value: float
    change: float
    trend: str

class EfficiencyMetrics(BaseModel):
    id: str
    scenario_id: str
    staff_utilization: float
    revenue_per_labor_hour: float
    covers_per_labor_hour: float
    labor_cost_percentage: float
    efficiency_trends: List[EfficiencyTrend]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class BenchmarkComparison(BaseModel):
    metric: str
    current_value: float
    industry_average: float
    difference: float
    percentile: float

class ImprovementOpportunity(BaseModel):
    area: str
    current_value: float
    target_value: float
    potential_improvement: float
    implementation_complexity: str
    estimated_impact: str

class BestPractice(BaseModel):
    category: str
    practice: str
    description: str
    expected_benefit: str
    implementation_guidelines: List[str]

class EfficiencyAnalysis(BaseModel):
    id: str
    scenario_id: str
    efficiency_score: float
    benchmark_comparison: List[BenchmarkComparison]
    improvement_opportunities: List[ImprovementOpportunity]
    best_practices: List[BestPractice]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisParams(BaseModel):
    include_benchmarks: bool = True
    include_opportunities: bool = True
    include_recommendations: bool = True
    time_period: TimePeriod = TimePeriod.MONTHLY

class EfficiencyResponse(BaseModel):
    scenario_id: str
    metrics: EfficiencyMetrics
    analysis: EfficiencyAnalysis
    analysis_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 