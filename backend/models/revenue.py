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

class MonthlyForecast(BaseModel):
    month: str
    revenue: float
    covers: int
    average_check: float
    growth_rate: float

class GrowthTrend(BaseModel):
    period: str
    revenue: float
    growth_rate: float
    trend: str

class RevenueProjection(BaseModel):
    id: str
    scenario_id: str
    monthly_forecasts: List[MonthlyForecast]
    revenue_per_cover: float
    growth_trends: List[GrowthTrend]
    peak_period_revenue: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ForecastedRevenue(BaseModel):
    period: str
    value: float
    lower_bound: float
    upper_bound: float
    confidence_level: float

class SeasonalPattern(BaseModel):
    season: str
    pattern_type: str
    impact_factor: float
    description: str

class GrowthProjection(BaseModel):
    period: str
    projected_growth: float
    contributing_factors: List[str]
    confidence_score: float

class RevenueForecast(BaseModel):
    id: str
    scenario_id: str
    forecasted_revenue: List[ForecastedRevenue]
    confidence_intervals: Dict[str, float]
    seasonal_patterns: List[SeasonalPattern]
    growth_projections: List[GrowthProjection]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisParams(BaseModel):
    forecast_period: int = 12
    include_seasonality: bool = True
    include_growth: bool = True
    confidence_level: float = 0.95

class RevenueResponse(BaseModel):
    scenario_id: str
    projections: RevenueProjection
    forecast: RevenueForecast
    analysis_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 