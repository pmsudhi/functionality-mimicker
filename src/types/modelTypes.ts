
// Brand Types
export type ServiceStyle = "Fast Casual" | "Casual Dining" | "Premium Dining";
export type Currency = "SAR" | "AED" | "KWD" | "BHD" | "OMR" | "QAR" | "GBP" | "USD";

export interface Brand {
  id: string;
  name: string;
  serviceStyle: ServiceStyle;
  description?: string;
  logoUrl?: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  currency: Currency;
  exchangeRate: number; // Relative to base currency
  laborCostMultiplier: number; // Regional cost variation
}

export interface Outlet {
  id: string;
  brandId: string;
  locationId: string;
  name: string;
  status: "planned" | "active" | "inactive";
  openingDate?: Date;
}

// Parameter Types
export interface SpaceParameters {
  totalArea: number; // in sqm
  fohPercentage: number; // default 65%
  areaPerCover: 1.5 | 1.67 | 1.86 | 2.05 | 2.32;
  externalSeating: number;
  totalCapacity?: number; // calculated
  fohArea?: number; // calculated
}

export interface ServiceParameters {
  coversPerWaiter: 12 | 16 | 20 | 24;
  runnerToWaiterRatio: 25 | 50 | 75 | 100; // Percentage
  kitchenStations: number;
  staffPerStation: number;
  serviceStyleAdjustment: number; // Multiplier based on service style
}

export interface RevenueParameters {
  averageSpendPerGuest: number;
  guestDwellingTime: number; // in minutes
  tableTurnTime: number; // in minutes
  peakHourFactor: number; // Multiplier for peak hours
  emptySeatsProvision: number; // Percentage of expected empty seats
}

export interface OperationalParameters {
  operatingDays: number; // Default 350 accounting for Ramadan
  ramadanCapacityReduction: number; // Default 50%
  weekdayHours: number[];
  weekendHours: number[];
  peakHoursDistribution: {
    [hour: number]: number; // Hour -> percentage of daily covers
  };
}

export interface EfficiencyParameters {
  staffUtilizationRate: number; // Percentage
  positionEfficiency: {
    [position: string]: number; // Position -> efficiency percentage
  };
  technologyImpact: number; // Percentage reduction in labor need
  crossTrainingCapability: number; // Percentage of staff that can cover multiple roles
  seasonalityAdjustment: {
    [month: number]: number; // Month -> percentage adjustment
  };
}

// Position Types
export type PositionCategory = "FOH" | "BOH" | "Management";

export interface Position {
  id: string;
  name: string;
  category: PositionCategory;
  baseSalary: number;
  variablePay: number;
  benefits: number;
  trainingCost: number;
  recruitmentCost: number;
  mealCost: number;
  turnoverRate: number;
}

export interface StaffingRequirement {
  positionId: string;
  count: number;
  calculationMethod: string; // Formula used to calculate this requirement
}

// Scenario Types
export interface Scenario {
  id: string;
  name: string;
  outletId: string;
  createdAt: Date;
  updatedAt: Date;
  spaceParameters: SpaceParameters;
  serviceParameters: ServiceParameters;
  revenueParameters: RevenueParameters;
  operationalParameters: OperationalParameters;
  efficiencyParameters: EfficiencyParameters;
  staffingRequirements: StaffingRequirement[];
  calculations: {
    totalStaff: number;
    laborCost: number;
    laborCostPercentage: number;
    revenuePerLaborHour: number;
    coversPerLaborHour: number;
  };
}

// Comparison Types
export interface ScenarioComparison {
  baseScenarioId: string;
  compareScenarioId: string;
  staffingDifference: {
    [positionId: string]: number;
  };
  costDifference: number;
  efficiencyDifference: number;
  highlights: string[];
}
