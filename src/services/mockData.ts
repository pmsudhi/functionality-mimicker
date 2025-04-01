
import { 
  Brand,
  Location,
  Outlet,
  Scenario,
  Position,
  ServiceStyle,
  SpaceParameters,
  ServiceParameters,
  RevenueParameters,
  OperationalParameters,
  EfficiencyParameters
} from "@/types/modelTypes";

// Mock Brands
export const mockBrands: Brand[] = [
  {
    id: "bb-001",
    name: "Burger Boutique",
    serviceStyle: "Fast Casual",
    description: "Premium burger restaurant with fast casual service model",
    logoUrl: "/brands/burger-boutique.png"
  },
  {
    id: "lc-001",
    name: "Lazy Cat",
    serviceStyle: "Casual Dining",
    description: "Trendy casual dining venue with diverse menu options",
    logoUrl: "/brands/lazy-cat.png"
  },
  {
    id: "nm-001",
    name: "Nomad",
    serviceStyle: "Premium Dining",
    description: "High-end dining experience with unique cultural influences",
    logoUrl: "/brands/nomad.png"
  },
  {
    id: "sw-001",
    name: "Swaikhat",
    serviceStyle: "Casual Dining",
    description: "Traditional Middle Eastern casual dining restaurant",
    logoUrl: "/brands/swaikhat.png"
  },
  {
    id: "wr-001",
    name: "White Robata",
    serviceStyle: "Premium Dining",
    description: "Japanese-inspired premium dining experience featuring robata grill",
    logoUrl: "/brands/white-robata.png"
  }
];

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: "loc-001",
    name: "Mall of Saudi",
    city: "Riyadh",
    country: "Saudi Arabia",
    currency: "SAR",
    exchangeRate: 1,
    laborCostMultiplier: 1
  },
  {
    id: "loc-002",
    name: "Red Sea Mall",
    city: "Jeddah",
    country: "Saudi Arabia",
    currency: "SAR",
    exchangeRate: 1,
    laborCostMultiplier: 0.95
  },
  {
    id: "loc-003",
    name: "Mall of Emirates",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    exchangeRate: 1.02,
    laborCostMultiplier: 1.15
  },
  {
    id: "loc-004",
    name: "The Avenues",
    city: "Kuwait",
    country: "Kuwait",
    currency: "KWD",
    exchangeRate: 3.25,
    laborCostMultiplier: 1.2
  }
];

// Mock Outlets
export const mockOutlets: Outlet[] = [
  {
    id: "out-001",
    brandId: "bb-001",
    locationId: "loc-001",
    name: "Burger Boutique - Riyadh",
    status: "active",
    openingDate: new Date("2022-05-01")
  },
  {
    id: "out-002",
    brandId: "bb-001",
    locationId: "loc-002",
    name: "Burger Boutique - Jeddah",
    status: "active",
    openingDate: new Date("2022-08-15")
  },
  {
    id: "out-003",
    brandId: "lc-001",
    locationId: "loc-001",
    name: "Lazy Cat - Riyadh",
    status: "active",
    openingDate: new Date("2021-11-10")
  },
  {
    id: "out-004",
    brandId: "nm-001",
    locationId: "loc-003",
    name: "Nomad - Dubai",
    status: "active",
    openingDate: new Date("2022-02-20")
  },
  {
    id: "out-005",
    brandId: "sw-001",
    locationId: "loc-004",
    name: "Swaikhat - Kuwait",
    status: "active",
    openingDate: new Date("2021-09-05")
  },
  {
    id: "out-006",
    brandId: "wr-001",
    locationId: "loc-003",
    name: "White Robata - Dubai",
    status: "active",
    openingDate: new Date("2022-01-15")
  },
  {
    id: "out-007",
    brandId: "wr-001",
    locationId: "loc-001",
    name: "White Robata - Riyadh",
    status: "planned",
    openingDate: new Date("2023-12-01")
  }
];

// Mock Positions
export const mockPositions: Position[] = [
  // FOH Positions
  {
    id: "pos-001",
    name: "Server/Waiter",
    category: "FOH",
    baseSalary: 4000,
    variablePay: 500,
    benefits: 800,
    trainingCost: 300,
    recruitmentCost: 500,
    mealCost: 200,
    turnoverRate: 0.25
  },
  {
    id: "pos-002",
    name: "Runner/Busser",
    category: "FOH",
    baseSalary: 3200,
    variablePay: 300,
    benefits: 600,
    trainingCost: 200,
    recruitmentCost: 400,
    mealCost: 200,
    turnoverRate: 0.3
  },
  {
    id: "pos-003",
    name: "Host/Hostess",
    category: "FOH",
    baseSalary: 3500,
    variablePay: 400,
    benefits: 700,
    trainingCost: 250,
    recruitmentCost: 450,
    mealCost: 200,
    turnoverRate: 0.2
  },
  {
    id: "pos-004",
    name: "Cashier",
    category: "FOH",
    baseSalary: 3800,
    variablePay: 300,
    benefits: 750,
    trainingCost: 250,
    recruitmentCost: 400,
    mealCost: 200,
    turnoverRate: 0.15
  },
  // BOH Positions
  {
    id: "pos-005",
    name: "Executive Chef",
    category: "BOH",
    baseSalary: 12000,
    variablePay: 2000,
    benefits: 2400,
    trainingCost: 1500,
    recruitmentCost: 3000,
    mealCost: 200,
    turnoverRate: 0.1
  },
  {
    id: "pos-006",
    name: "Sous Chef",
    category: "BOH",
    baseSalary: 8000,
    variablePay: 1000,
    benefits: 1600,
    trainingCost: 1000,
    recruitmentCost: 2000,
    mealCost: 200,
    turnoverRate: 0.15
  },
  {
    id: "pos-007",
    name: "Line Cook",
    category: "BOH",
    baseSalary: 5000,
    variablePay: 700,
    benefits: 1000,
    trainingCost: 600,
    recruitmentCost: 800,
    mealCost: 200,
    turnoverRate: 0.25
  },
  {
    id: "pos-008",
    name: "Prep Cook",
    category: "BOH",
    baseSalary: 4500,
    variablePay: 500,
    benefits: 900,
    trainingCost: 500,
    recruitmentCost: 700,
    mealCost: 200,
    turnoverRate: 0.3
  },
  {
    id: "pos-009",
    name: "Kitchen Helper",
    category: "BOH",
    baseSalary: 3500,
    variablePay: 300,
    benefits: 700,
    trainingCost: 300,
    recruitmentCost: 500,
    mealCost: 200,
    turnoverRate: 0.35
  },
  {
    id: "pos-010",
    name: "Dishwasher",
    category: "BOH",
    baseSalary: 3000,
    variablePay: 200,
    benefits: 600,
    trainingCost: 200,
    recruitmentCost: 400,
    mealCost: 200,
    turnoverRate: 0.4
  },
  // Management Positions
  {
    id: "pos-011",
    name: "General Manager",
    category: "Management",
    baseSalary: 15000,
    variablePay: 3000,
    benefits: 3000,
    trainingCost: 2000,
    recruitmentCost: 5000,
    mealCost: 200,
    turnoverRate: 0.1
  },
  {
    id: "pos-012",
    name: "Assistant Manager",
    category: "Management",
    baseSalary: 10000,
    variablePay: 1500,
    benefits: 2000,
    trainingCost: 1500,
    recruitmentCost: 3000,
    mealCost: 200,
    turnoverRate: 0.15
  },
  {
    id: "pos-013",
    name: "Shift Supervisor",
    category: "Management",
    baseSalary: 7000,
    variablePay: 1000,
    benefits: 1400,
    trainingCost: 1000,
    recruitmentCost: 1500,
    mealCost: 200,
    turnoverRate: 0.2
  }
];

// Default parameters based on service style
export const getDefaultParameters = (serviceStyle: ServiceStyle): {
  space: SpaceParameters,
  service: ServiceParameters,
  revenue: RevenueParameters,
  operational: OperationalParameters,
  efficiency: EfficiencyParameters
} => {
  const defaults = {
    "Fast Casual": {
      space: {
        totalArea: 200,
        fohPercentage: 65,
        areaPerCover: 1.5 as 1.5,
        externalSeating: 20,
        totalCapacity: 0,
        fohArea: 0
      },
      service: {
        coversPerWaiter: 24,
        runnerToWaiterRatio: 25,
        kitchenStations: 4,
        staffPerStation: 1.5,
        serviceStyleAdjustment: 0.8
      },
      revenue: {
        averageSpendPerGuest: 85,
        guestDwellingTime: 45,
        tableTurnTime: 60,
        peakHourFactor: 1.3,
        emptySeatsProvision: 0.1
      },
      operational: {
        operatingDays: 350,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [11, 11, 11, 11, 11],
        weekendHours: [12, 12],
        peakHoursDistribution: {
          12: 0.15,
          13: 0.2,
          14: 0.1,
          18: 0.15,
          19: 0.25,
          20: 0.15
        }
      },
      efficiency: {
        staffUtilizationRate: 0.85,
        positionEfficiency: {
          "Server/Waiter": 0.9,
          "Runner/Busser": 0.85,
          "Line Cook": 0.88,
          "Prep Cook": 0.82
        },
        technologyImpact: 0.1,
        crossTrainingCapability: 0.15,
        seasonalityAdjustment: {
          1: 0.9,
          6: 0.85,
          7: 0.8,
          8: 0.85,
          12: 1.1
        }
      }
    },
    "Casual Dining": {
      space: {
        totalArea: 300,
        fohPercentage: 60,
        areaPerCover: 1.86 as 1.86,
        externalSeating: 30,
        totalCapacity: 0,
        fohArea: 0
      },
      service: {
        coversPerWaiter: 16,
        runnerToWaiterRatio: 50,
        kitchenStations: 6,
        staffPerStation: 1.8,
        serviceStyleAdjustment: 1.0
      },
      revenue: {
        averageSpendPerGuest: 120,
        guestDwellingTime: 75,
        tableTurnTime: 90,
        peakHourFactor: 1.4,
        emptySeatsProvision: 0.15
      },
      operational: {
        operatingDays: 350,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [12, 12, 12, 12, 12],
        weekendHours: [13, 13],
        peakHoursDistribution: {
          13: 0.15,
          14: 0.15,
          19: 0.2,
          20: 0.3,
          21: 0.2
        }
      },
      efficiency: {
        staffUtilizationRate: 0.8,
        positionEfficiency: {
          "Server/Waiter": 0.85,
          "Runner/Busser": 0.8,
          "Line Cook": 0.85,
          "Prep Cook": 0.8
        },
        technologyImpact: 0.08,
        crossTrainingCapability: 0.12,
        seasonalityAdjustment: {
          1: 0.9,
          6: 0.85,
          7: 0.8,
          8: 0.85,
          12: 1.1
        }
      }
    },
    "Premium Dining": {
      space: {
        totalArea: 400,
        fohPercentage: 55,
        areaPerCover: 2.32 as 2.32,
        externalSeating: 20,
        totalCapacity: 0,
        fohArea: 0
      },
      service: {
        coversPerWaiter: 12,
        runnerToWaiterRatio: 75,
        kitchenStations: 8,
        staffPerStation: 2.2,
        serviceStyleAdjustment: 1.2
      },
      revenue: {
        averageSpendPerGuest: 250,
        guestDwellingTime: 120,
        tableTurnTime: 150,
        peakHourFactor: 1.3,
        emptySeatsProvision: 0.2
      },
      operational: {
        operatingDays: 350,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [8, 8, 8, 8, 8],
        weekendHours: [10, 10],
        peakHoursDistribution: {
          19: 0.25,
          20: 0.35,
          21: 0.25,
          22: 0.15
        }
      },
      efficiency: {
        staffUtilizationRate: 0.75,
        positionEfficiency: {
          "Server/Waiter": 0.8,
          "Runner/Busser": 0.75,
          "Line Cook": 0.82,
          "Prep Cook": 0.78
        },
        technologyImpact: 0.05,
        crossTrainingCapability: 0.1,
        seasonalityAdjustment: {
          1: 0.95,
          6: 0.9,
          7: 0.85,
          8: 0.9,
          12: 1.15
        }
      }
    }
  };

  return defaults[serviceStyle];
};

// Sample scenario
export const createSampleScenario = (outletId: string): Scenario => {
  const outlet = mockOutlets.find(o => o.id === outletId);
  if (!outlet) throw new Error("Outlet not found");
  
  const brand = mockBrands.find(b => b.id === outlet.brandId);
  if (!brand) throw new Error("Brand not found");
  
  const defaults = getDefaultParameters(brand.serviceStyle);
  
  return {
    id: `scenario-${Date.now()}`,
    name: `${outlet.name} Base Scenario`,
    outletId: outlet.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    spaceParameters: defaults.space,
    serviceParameters: defaults.service,
    revenueParameters: defaults.revenue,
    operationalParameters: defaults.operational,
    efficiencyParameters: defaults.efficiency,
    staffingRequirements: [],
    calculations: {
      totalStaff: 0,
      laborCost: 0,
      laborCostPercentage: 0,
      revenuePerLaborHour: 0,
      coversPerLaborHour: 0
    }
  };
};

// Sample scenarios
export const mockScenarios: Scenario[] = [
  createSampleScenario("out-001"),
  createSampleScenario("out-003")
];
