from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class StaffingParams(BaseModel):
    spaceParameters: Dict[str, Any] = Field(..., description="Space parameters for staffing calculation")
    serviceParameters: Dict[str, Any] = Field(..., description="Service parameters for staffing calculation")
    operationalHours: Dict[str, Any] = Field(..., description="Operational hours for staffing calculation")

class RevenueParams(BaseModel):
    operationalHours: Dict[str, Any] = Field(..., description="Operational hours for revenue calculation")
    projectionPeriod: str = Field(..., description="Period for revenue projection (e.g., 'monthly', 'quarterly', 'yearly')")
    projectionLength: int = Field(..., description="Length of projection in periods")

class PLParams(BaseModel):
    monthlyRevenue: float = Field(..., description="Monthly revenue for P&L calculation")
    operationalHours: Dict[str, Any] = Field(..., description="Operational hours for P&L calculation")

class PeakHourParams(BaseModel):
    operationalHours: Dict[str, Any] = Field(..., description="Operational hours for peak hour analysis")
    serviceParameters: Dict[str, Any] = Field(..., description="Service parameters for peak hour analysis")

class OptimizationParams(BaseModel):
    scenario_id: str = Field(..., description="ID of the scenario to optimize")
    constraints: Optional[Dict[str, Any]] = Field(None, description="Optional constraints for optimization")

class WhatIfParams(BaseModel):
    baseScenarioId: str = Field(..., description="ID of the base scenario")
    changes: Dict[str, Any] = Field(..., description="Changes to apply to the base scenario")

class StaffingResult(BaseModel):
    total_staff: int = Field(..., description="Total number of staff required")
    foh_staff: int = Field(..., description="Number of front-of-house staff")
    boh_staff: int = Field(..., description="Number of back-of-house staff")
    labor_cost: float = Field(..., description="Total labor cost")
    staffing_structure: Dict[str, Any] = Field(..., description="Detailed staffing structure")
    recommendations: List[str] = Field(..., description="Staffing recommendations")

class RevenueResult(BaseModel):
    projected_revenue: List[Dict[str, Any]] = Field(..., description="Projected revenue by period")
    growth_rate: float = Field(..., description="Projected growth rate")
    insights: List[str] = Field(..., description="Revenue insights")

class PLResult(BaseModel):
    pl_data: Dict[str, Any] = Field(..., description="Profit and loss data")
    metrics: Dict[str, float] = Field(..., description="Key financial metrics")
    insights: List[str] = Field(..., description="Financial insights")

class PeakHourResult(BaseModel):
    heatmap_data: List[Dict[str, Any]] = Field(..., description="Heatmap data for peak hours")
    peak_hours: List[Dict[str, Any]] = Field(..., description="Peak hour analysis")
    recommendations: List[str] = Field(..., description="Peak hour recommendations")

class OptimizationResult(BaseModel):
    originalScenario: Dict[str, Any] = Field(..., description="Original scenario data")
    optimizedScenario: Dict[str, Any] = Field(..., description="Optimized scenario data")
    improvements: Dict[str, float] = Field(..., description="Improvement metrics")
    recommendations: List[str] = Field(..., description="Optimization recommendations")

class WhatIfResult(BaseModel):
    baseScenario: Dict[str, Any] = Field(..., description="Base scenario data")
    modifiedScenario: Dict[str, Any] = Field(..., description="Modified scenario data")
    impact: Dict[str, float] = Field(..., description="Impact metrics")
    insights: List[str] = Field(..., description="What-if analysis insights")

class ComparisonResult(BaseModel):
    scenarios: List[Dict[str, Any]] = Field(..., description="Scenario comparison data")
    differences: Dict[str, Dict[str, float]] = Field(..., description="Differences between scenarios")
    insights: List[str] = Field(..., description="Comparison insights")
    recommendations: List[str] = Field(..., description="Comparison recommendations") 