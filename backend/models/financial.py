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

class CostBreakdown(BaseModel):
    total: float
    foh: float
    boh: float
    benefits: float
    training: float
    overtime: float

class LaborCost(BaseModel):
    id: str
    scenario_id: str
    total_cost: float
    cost_breakdown: CostBreakdown
    cost_per_staff: float
    labor_percentage: float
    cost_trends: List[Dict[str, float]]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class RevenueProjection(BaseModel):
    id: str
    scenario_id: str
    monthly_forecasts: List[Dict[str, float]]
    revenue_per_staff: float
    growth_trends: List[Dict[str, float]]
    peak_period_revenue: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProfitLoss(BaseModel):
    revenue: float
    labor_costs: float
    other_costs: float
    gross_profit: float
    net_profit: float
    profit_margin: float

class RiskAssessment(BaseModel):
    risk_level: str
    risk_factors: List[str]
    mitigation_strategies: List[str]
    impact_score: float

class FinancialImpact(BaseModel):
    id: str
    scenario_id: str
    labor_costs: LaborCost
    revenue_projections: RevenueProjection
    profit_loss: ProfitLoss
    roi: float
    risk_assessment: RiskAssessment
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AnalysisParams(BaseModel):
    time_period: TimePeriod
    include_roi: bool = True
    include_risk: bool = True
    include_trends: bool = True

class FinancialResponse(BaseModel):
    scenario_id: str
    impact: FinancialImpact
    analysis_params: Dict[str, any]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True 