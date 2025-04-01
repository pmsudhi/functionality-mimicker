
// Service style types
export type ServiceStyle = "Premium Dining" | "Casual Dining" | "Fast Casual";

// Space parameters
export interface SpaceParameters {
  totalArea: number; // In square meters
  fohPercentage: number; // Front of house percentage (0-100)
  areaPerCover: 1.5 | 1.67 | 1.86 | 2.05 | 2.32; // Space required per seat
  externalSeating: number; // Number of external seats
  totalCapacity?: number; // Calculated total capacity
  fohArea?: number; // Calculated FOH area
}

// Service parameters
export interface ServiceParameters {
  coversPerWaiter: 12 | 16 | 20 | 24; // Number of covers per waiter
  runnerToWaiterRatio: 25 | 50 | 75 | 100; // Runner to waiter ratio (percentage)
  kitchenStations: number; // Number of kitchen stations
  staffPerStation: number; // Staff per kitchen station
  serviceStyleAdjustment: number; // Service style multiplier
}

// Revenue parameters
export interface RevenueParameters {
  averageSpendPerGuest: number; // Average spend per guest in currency
  guestDwellingTime: number; // Time in minutes a guest spends
  tableTurnTime: number; // Total table turn time in minutes
  peakHourFactor: number; // Peak hour multiplier
  emptySeatsProvision: number; // Percentage of empty seats allowed (0-1)
}

// Operational parameters
export interface OperationalParameters {
  operatingDays: number; // Number of operating days per year
  ramadanCapacityReduction: number; // Capacity reduction during Ramadan (0-1)
  weekdayHours: number[]; // Operating hours for each weekday [Mon, Tue, Wed, Thu, Fri]
  weekendHours: number[]; // Operating hours for weekend days [Sat, Sun]
}

// Efficiency parameters
export interface EfficiencyParameters {
  staffUtilizationRate: number; // Staff utilization rate (0-1)
  positionEfficiency: {
    [key: string]: number; // Efficiency by position (0-1)
  };
  technologyImpact: number; // Labor reduction due to technology (0-1)
  crossTrainingCapability: number; // Labor reduction due to cross-training (0-1)
}

// All parameters combined
export interface ModelParameters {
  space: SpaceParameters;
  service: ServiceParameters;
  revenue: RevenueParameters;
  operational: OperationalParameters;
  efficiency: EfficiencyParameters;
}

// Scenario calculations
export interface ScenarioCalculations {
  totalStaff: number;
  totalFOH: number;
  totalBOH: number;
  fohBohRatio: number;
  staffDetail: {
    servers: number;
    runners: number;
    hosts: number;
    managers: number;
    cashiers: number;
    executiveChef: number;
    sousChef: number;
    lineCooks: number;
    prepCooks: number;
    kitchenHelpers?: number;
    dishwashers: number;
  };
  seatingCapacity: number;
  fohArea: number;
  laborCost: number;
  fohCost: number;
  bohCost: number;
  monthlyRevenue: number;
  annualRevenue: number;
  laborPercentage: number;
  costPerSeat: number;
  coversPerLaborHour: number;
  dailyCovers: number;
  turnsPerDay: number;
}

// Scenario model
export interface Scenario {
  id: string;
  name: string;
  outletId: string;
  createdAt: Date;
  updatedAt: Date;
  parameters: ModelParameters;
  calculations: ScenarioCalculations;
}
