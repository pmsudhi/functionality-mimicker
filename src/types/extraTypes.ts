
import { 
  ScenarioCalculations, 
  Scenario, 
  SpaceParameters, 
  ServiceParameters, 
  RevenueParameters, 
  OperationalParameters, 
  EfficiencyParameters 
} from "@/types/modelTypes";

// Additional type definitions for model types

export interface Brand {
  id: string;
  name: string;
  serviceStyle: string;
  logoUrl?: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  city: string;
}

export interface Outlet {
  id: string;
  name: string;
  brandId: string;
  locationId: string;
  status: string;
}

export interface Position {
  id: string;
  name: string;
  category: PositionCategory;
  baseSalary: number;
  variablePay: number;
  benefits: number;
  turnoverRate: number;
  trainingCost: number;
  recruitmentCost: number;
  mealCost: number;
}

export enum PositionCategory {
  FOH = "FOH",
  BOH = "BOH",
  Management = "Management"
}

// Extend ScenarioCalculations to include missing properties
export interface ExtendedScenarioCalculations extends ScenarioCalculations {
  revenuePerLaborHour: number;
  laborCostPercentage: number;
}

// Extend Scenario to include nested parameters
export interface ExtendedScenario extends Scenario {
  spaceParameters: SpaceParameters;
  serviceParameters: ServiceParameters;
  revenueParameters: RevenueParameters;
  operationalParameters: OperationalParameters;
  efficiencyParameters: EfficiencyParameters;
  staffingRequirements: StaffingRequirement[];
  calculations: ExtendedScenarioCalculations;
}

export interface StaffingRequirement {
  positionId: string;
  count: number;
  calculationMethod?: string;
}

// Extend the comparison return type
export interface ScenarioComparison {
  staffDiff: number;
  costDiff: number;
  laborPercentageDiff: number;
  staffingDifference: Record<string, number>;
  costDifference: number;
  costPercentageDifference: number;
  efficiencyDifference: number;
  scenario1: {
    name: string;
    totalStaff: number;
    laborCost: number;
    laborPercentage: number;
    fohBohRatio: number;
  };
  scenario2: {
    name: string;
    totalStaff: number;
    laborCost: number;
    laborPercentage: number;
    fohBohRatio: number;
  };
  highlights: string[];
}
