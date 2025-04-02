from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
from enum import Enum
from pydantic import validator
from sqlalchemy import Column, Integer, String, JSON, DateTime, func, UniqueConstraint

# Enum definitions
class ServiceStyle(str, Enum):
    FAST_CASUAL = "Fast Casual"
    CASUAL_DINING = "Casual Dining"
    PREMIUM_DINING = "Premium Dining"

class Currency(str, Enum):
    SAR = "SAR"
    AED = "AED"
    KWD = "KWD"
    BHD = "BHD"
    OMR = "OMR"
    QAR = "QAR"
    GBP = "GBP"
    USD = "USD"

class OutletStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    PLANNED = "Planned"

class ProjectionPeriod(str, Enum):
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    YEARLY = "yearly"

class StaffType(str, Enum):
    FOH = "foh"
    BOH = "boh"
    ALL = "all"

# Base models
class StaffPosition(BaseModel):
    id: str
    title: str
    salary: float
    department: str
    level: int
    count: int

class SpaceParameters(BaseModel):
    total_area: float = Field(..., description="Total area of the restaurant in square meters")
    foh_percentage: float = Field(..., description="Percentage of total area allocated to FOH")
    area_per_cover: float = Field(..., description="Area required per cover in square meters")
    external_seating: int = Field(..., description="Number of external seating covers")

    @validator('area_per_cover')
    def validate_area_per_cover(cls, v):
        valid_values = [1.5, 1.67, 1.86, 2.05, 2.32]
        if v not in valid_values:
            raise ValueError(f"Area per cover must be one of {valid_values}")
        return v

class ServiceParameters(BaseModel):
    covers_per_waiter: int = Field(..., description="Number of covers per waiter")
    runner_ratio: float = Field(..., description="Ratio of runners to waiters")
    kitchen_stations: int = Field(..., description="Number of kitchen stations")
    service_style: str = Field(..., description="Service style (premium, casual, etc.)")

    @validator('covers_per_waiter')
    def validate_covers_per_waiter(cls, v):
        valid_values = [12, 16, 20, 24]
        if v not in valid_values:
            raise ValueError(f"Covers per waiter must be one of {valid_values}")
        return v

    @validator('runner_ratio')
    def validate_runner_ratio(cls, v):
        valid_values = [1.0, 0.75, 0.50, 0.25]
        if v not in valid_values:
            raise ValueError(f"Runner ratio must be one of {valid_values}")
        return v

class RevenueDrivers(BaseModel):
    avgSpending: float
    dwellingTime: int
    tableTurnTime: int
    peakFactor: float
    tableTurns: Optional[float] = None
    dailyCovers: Optional[int] = None
    monthlyRevenue: Optional[float] = None

class OperationalParameters(BaseModel):
    operating_days: int = Field(..., description="Number of operating days per month")
    average_spend: float = Field(..., description="Average spend per cover")
    peak_hour_distribution: Dict[str, float] = Field(..., description="Distribution of covers across peak hours")
    ramadan_adjustment: bool = Field(False, description="Whether to apply Ramadan adjustments")

class EfficiencyDrivers(BaseModel):
    staffUtilization: float
    techImpact: float
    crossTraining: float
    seasonalityFactor: float

class Totals(BaseModel):
    foh: Dict[str, Any]
    boh: Dict[str, Any]
    grand: Dict[str, Any]

# Scenario model
class Scenario(BaseModel):
    id: Optional[str] = None
    name: str
    brand: Optional[str] = None
    outlet: Optional[str] = None
    fohPositions: List[StaffPosition]
    bohPositions: List[StaffPosition]
    spaceParameters: Optional[SpaceParameters] = None
    serviceParameters: Optional[ServiceParameters] = None
    revenueDrivers: Optional[RevenueDrivers] = None
    operationalHours: Optional[OperationalParameters] = None
    efficiencyDrivers: Optional[EfficiencyDrivers] = None
    totals: Optional[Totals] = None
    createdAt: Optional[datetime] = Field(default_factory=datetime.now)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.now)

# Parameter models for calculations
class StaffingParams(BaseModel):
    spaceParameters: SpaceParameters
    serviceParameters: ServiceParameters
    efficiencyDrivers: EfficiencyDrivers
    operationalHours: OperationalParameters

class RevenueParams(BaseModel):
    projectionPeriod: ProjectionPeriod
    projectionLength: int
    avgCheck: float
    dailyCovers: int
    foodBevRatio: float
    seasonalityFactor: float
    growthRate: float
    applyRamadan: bool
    brand: Optional[str] = None
    outlet: Optional[str] = None

class PLParams(BaseModel):
    timeframe: str
    selectedMonth: str
    foodCostPercentage: float
    beverageCostPercentage: float
    laborCostPercentage: float
    rentPercentage: float
    marketingPercentage: float
    utilitiesPercentage: float
    otherExpensesPercentage: float
    monthlyRevenue: float
    foodRevenue: float
    beverageRevenue: float
    brand: Optional[str] = None
    outlet: Optional[str] = None

class PeakHourParams(BaseModel):
    selectedDay: str = "All Days"
    selectedStaffType: StaffType = StaffType.ALL
    peakFactor: float = 1.0
    applyRamadan: bool = False
    brand: Optional[str] = None
    outlet: Optional[str] = None

class OptimizationParams(BaseModel):
    scenario_id: str
    optimizationTarget: str  # "labor_cost", "efficiency", "revenue"
    constraints: Dict[str, Any]

class WhatIfParams(BaseModel):
    baseScenarioId: str
    changes: Dict[str, Any]

# Result models
class StaffingResult(BaseModel):
    foh_staff: List[Dict[str, Any]] = Field(..., description="FOH staff requirements")
    boh_staff: List[Dict[str, Any]] = Field(..., description="BOH staff requirements")
    total_staff: int = Field(..., description="Total staff required")
    labor_cost: float = Field(..., description="Monthly labor cost")
    staffing_structure: Dict[str, Any] = Field(..., description="Staffing structure details")
    recommendations: List[str] = Field(..., description="Staffing recommendations")

class RevenueResult(BaseModel):
    periods: List[str] = Field(..., description="Projection periods")
    projections: Dict[str, List[float]] = Field(..., description="Revenue projections")
    summary_metrics: Dict[str, float] = Field(..., description="Summary metrics")
    insights: List[str] = Field(..., description="Revenue insights")
    optimization_opportunities: List[str] = Field(..., description="Optimization opportunities")

class PLResult(BaseModel):
    pl_data: Dict[str, Any] = Field(..., description="Profit and loss data")
    historical_data: Dict[str, Dict[str, float]] = Field(..., description="Historical comparison data")
    insights: List[str] = Field(..., description="P&L insights")
    optimization_opportunities: List[str] = Field(..., description="Optimization opportunities")

class PeakHourResult(BaseModel):
    heatmap_data: Dict[str, Dict[str, Dict[str, Any]]] = Field(..., description="Peak hour heatmap data")
    staffing_requirements: Dict[str, Any] = Field(..., description="Peak hour staffing requirements")
    insights: List[str] = Field(..., description="Peak hour insights")
    optimization_opportunities: List[str] = Field(..., description="Optimization opportunities")

class OptimizationResult(BaseModel):
    originalScenario: Dict[str, Any]
    optimizedScenario: Dict[str, Any]
    improvements: Dict[str, Any]
    recommendations: List[str]

class WhatIfResult(BaseModel):
    baseScenario: Dict[str, Any]
    modifiedScenario: Dict[str, Any]
    impact: Dict[str, Any]
    insights: List[str]

class ComparisonResult(BaseModel):
    scenarios: List[Dict[str, Any]]
    differences: Dict[str, Any]
    insights: List[str]
    recommendations: List[str]

class Brand(BaseModel):
    id: str = Field(..., description="Unique identifier for the brand")
    name: str = Field(..., description="Brand name")
    service_style: ServiceStyle = Field(..., description="Service style of the brand")
    default_parameters: Dict[str, Any] = Field(..., description="Default operational parameters")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        orm_mode = True

class Outlet(BaseModel):
    id: str = Field(..., description="Unique identifier for the outlet")
    brand_id: str = Field(..., description="Reference to the brand")
    name: str = Field(..., description="Outlet name")
    location: str = Field(..., description="Outlet location")
    currency: Currency = Field(..., description="Operating currency")
    status: OutletStatus = Field(..., description="Outlet status")
    space_parameters: SpaceParameters = Field(..., description="Space configuration")
    service_parameters: ServiceParameters = Field(..., description="Service configuration")
    operational_parameters: OperationalParameters = Field(..., description="Operational configuration")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        orm_mode = True

# Response Models
class BrandResponse(BaseModel):
    id: str
    name: str
    service_style: ServiceStyle
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class OutletResponse(BaseModel):
    id: str
    brand_id: str
    name: str
    location: str
    currency: Currency
    status: OutletStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# Request Models
class BrandCreate(BaseModel):
    name: str
    service_style: ServiceStyle
    default_parameters: Dict[str, Any]

class BrandUpdate(BaseModel):
    name: Optional[str] = None
    service_style: Optional[ServiceStyle] = None
    default_parameters: Optional[Dict[str, Any]] = None

class OutletCreate(BaseModel):
    brand_id: str
    name: str
    location: str
    currency: Currency
    status: OutletStatus = OutletStatus.PLANNED
    space_parameters: SpaceParameters
    service_parameters: ServiceParameters
    operational_parameters: OperationalParameters

class OutletUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    currency: Optional[Currency] = None
    status: Optional[OutletStatus] = None
    space_parameters: Optional[SpaceParameters] = None
    service_parameters: Optional[ServiceParameters] = None
    operational_parameters: Optional[OperationalParameters] = None

class OperationalConstants(Base):
    __tablename__ = "operational_constants"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)
    name = Column(String, nullable=False)
    value = Column(JSON, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint('category', 'name', name='uix_category_name'),
    )

