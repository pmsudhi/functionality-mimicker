import {
  Brand,
  ServiceStyle,
  Currency,
  Location,
  Outlet,
  Position,
  SpaceParameters,
  ServiceParameters,
  RevenueParameters,
  OperationalParameters,
  EfficiencyParameters,
  Scenario,
  PositionCategory
} from "@/types/modelTypes";

// Helper function to ensure proper type-casting for literal types
const asAreaPerCover = (value: number) => {
  return value as 1.5 | 1.67 | 1.86 | 2.05 | 2.32;
};

const asCoversPerWaiter = (value: number) => {
  return value as 12 | 16 | 20 | 24;
};

const asRunnerToWaiterRatio = (value: number) => {
  return value as 25 | 50 | 75 | 100;
};

export const mockBrands: Brand[] = [
  {
    id: "brand-001",
    name: "White Robata",
    serviceStyle: "Premium Dining",
    description: "Upscale Japanese robata grill restaurant.",
    logoUrl: "/logos/white-robata.png"
  },
  {
    id: "brand-002",
    name: "Lazy Cat",
    serviceStyle: "Casual Dining",
    description: "Relaxed cafe serving comfort food.",
    logoUrl: "/logos/lazy-cat.png"
  },
  {
    id: "brand-003",
    name: "Burger Boutique",
    serviceStyle: "Fast Casual",
    description: "Gourmet burger joint with quick service.",
    logoUrl: "/logos/burger-boutique.png"
  },
  {
    id: "brand-004",
    name: "Nomad",
    serviceStyle: "Premium Dining",
    description: "High-end restaurant with a focus on global cuisine.",
    logoUrl: "/logos/nomad.png"
  },
  {
    id: "brand-005",
    name: "Swaikhat",
    serviceStyle: "Casual Dining",
    description: "Cozy spot for traditional Middle Eastern dishes.",
    logoUrl: "/logos/swaikhat.png"
  }
];

export const mockLocations: Location[] = [
  {
    id: "loc-001",
    name: "Riyadh HQ",
    city: "Riyadh",
    country: "Saudi Arabia",
    currency: "SAR",
    exchangeRate: 1,
    laborCostMultiplier: 1
  },
  {
    id: "loc-002",
    name: "Dubai Marina",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    exchangeRate: 1,
    laborCostMultiplier: 1.1
  },
  {
    id: "loc-003",
    name: "Kuwait City",
    city: "Kuwait City",
    country: "Kuwait",
    currency: "KWD",
    exchangeRate: 8.2,
    laborCostMultiplier: 1.2
  }
];

export const mockOutlets: Outlet[] = [
  {
    id: "outlet-001",
    brandId: "brand-001",
    locationId: "loc-001",
    name: "White Robata - Riyadh",
    status: "active",
    openingDate: new Date("2023-08-15")
  },
  {
    id: "outlet-002",
    brandId: "brand-002",
    locationId: "loc-002",
    name: "Lazy Cat - Dubai",
    status: "active",
    openingDate: new Date("2023-09-01")
  },
  {
    id: "outlet-003",
    brandId: "brand-003",
    locationId: "loc-001",
    name: "Burger Boutique - Riyadh",
    status: "planned",
    openingDate: new Date("2024-01-10")
  },
  {
    id: "outlet-004",
    brandId: "brand-004",
    locationId: "loc-003",
    name: "Nomad - Kuwait City",
    status: "inactive",
    openingDate: new Date("2022-11-20")
  },
  {
    id: "outlet-005",
    brandId: "brand-005",
    locationId: "loc-002",
    name: "Swaikhat - Dubai",
    status: "active",
    openingDate: new Date("2023-07-01")
  }
];

export const mockPositions: Position[] = [
  {
    id: "pos-001",
    name: "Server/Waiter",
    category: "FOH",
    baseSalary: 6000,
    variablePay: 1500,
    benefits: 500,
    trainingCost: 200,
    recruitmentCost: 300,
    mealCost: 150,
    turnoverRate: 0.2
  },
  {
    id: "pos-002",
    name: "Runner/Busser",
    category: "FOH",
    baseSalary: 4500,
    variablePay: 800,
    benefits: 300,
    trainingCost: 150,
    recruitmentCost: 250,
    mealCost: 150,
    turnoverRate: 0.25
  },
  {
    id: "pos-003",
    name: "Host/Hostess",
    category: "FOH",
    baseSalary: 5000,
    variablePay: 1000,
    benefits: 400,
    trainingCost: 180,
    recruitmentCost: 280,
    mealCost: 150,
    turnoverRate: 0.15
  },
  {
    id: "pos-004",
    name: "Cashier",
    category: "FOH",
    baseSalary: 5200,
    variablePay: 900,
    benefits: 350,
    trainingCost: 170,
    recruitmentCost: 270,
    mealCost: 150,
    turnoverRate: 0.18
  },
  {
    id: "pos-005",
    name: "Executive Chef",
    category: "BOH",
    baseSalary: 18000,
    variablePay: 4000,
    benefits: 1500,
    trainingCost: 500,
    recruitmentCost: 800,
    mealCost: 200,
    turnoverRate: 0.05
  },
  {
    id: "pos-006",
    name: "Sous Chef",
    category: "BOH",
    baseSalary: 12000,
    variablePay: 2500,
    benefits: 1000,
    trainingCost: 400,
    recruitmentCost: 600,
    mealCost: 200,
    turnoverRate: 0.1
  },
  {
    id: "pos-007",
    name: "Line Cook",
    category: "BOH",
    baseSalary: 7000,
    variablePay: 1200,
    benefits: 600,
    trainingCost: 250,
    recruitmentCost: 350,
    mealCost: 150,
    turnoverRate: 0.22
  },
  {
    id: "pos-008",
    name: "Prep Cook",
    category: "BOH",
    baseSalary: 6500,
    variablePay: 1000,
    benefits: 550,
    trainingCost: 220,
    recruitmentCost: 320,
    mealCost: 150,
    turnoverRate: 0.23
  },
  {
    id: "pos-009",
    name: "Kitchen Helper",
    category: "BOH",
    baseSalary: 4000,
    variablePay: 700,
    benefits: 250,
    trainingCost: 120,
    recruitmentCost: 220,
    mealCost: 150,
    turnoverRate: 0.3
  },
  {
    id: "pos-010",
    name: "Dishwasher",
    category: "BOH",
    baseSalary: 3800,
    variablePay: 600,
    benefits: 200,
    trainingCost: 100,
    recruitmentCost: 200,
    mealCost: 150,
    turnoverRate: 0.35
  },
    {
    id: "pos-011",
    name: "General Manager",
    category: "Management",
    baseSalary: 15000,
    variablePay: 3000,
    benefits: 1200,
    trainingCost: 400,
    recruitmentCost: 700,
    mealCost: 200,
    turnoverRate: 0.08
  },
  {
    id: "pos-012",
    name: "Assistant Manager",
    category: "Management",
    baseSalary: 10000,
    variablePay: 2000,
    benefits: 800,
    trainingCost: 300,
    recruitmentCost: 500,
    mealCost: 200,
    turnoverRate: 0.1
  },
  {
    id: "pos-013",
    name: "Shift Supervisor",
    category: "Management",
    baseSalary: 8000,
    variablePay: 1500,
    benefits: 700,
    trainingCost: 250,
    recruitmentCost: 400,
    mealCost: 200,
    turnoverRate: 0.12
  }
];

// Sample Scenarios
export const mockScenarios: Scenario[] = [
  {
    id: "scn-001",
    name: "Optimal Weekend Staffing",
    outletId: "outlet-001",
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2023-11-15"),
    spaceParameters: {
      totalArea: 350,
      fohPercentage: 60,
      areaPerCover: 2.05,
      externalSeating: 30,
      totalCapacity: 0,
      fohArea: 0
    },
    serviceParameters: {
      coversPerWaiter: 12,
      runnerToWaiterRatio: 75,
      kitchenStations: 8,
      staffPerStation: 2,
      serviceStyleAdjustment: 1.2
    },
    revenueParameters: {
      averageSpendPerGuest: 280,
      guestDwellingTime: 120,
      tableTurnTime: 150,
      peakHourFactor: 1.5,
      emptySeatsProvision: 0.05
    },
    operationalParameters: {
      operatingDays: 350,
      ramadanCapacityReduction: 0.5,
      weekdayHours: [11, 11, 11, 11, 14],
      weekendHours: [14, 14],
      peakHoursDistribution: {
        12: 0.15,
        13: 0.2,
        14: 0.1,
        19: 0.15,
        20: 0.25,
        21: 0.15
      }
    },
    efficiencyParameters: {
      staffUtilizationRate: 85,
      positionEfficiency: {
        "pos-001": 90,
        "pos-002": 80,
        "pos-007": 92,
        "pos-010": 75
      },
      technologyImpact: 8,
      crossTrainingCapability: 12,
      seasonalityAdjustment: {
        0: 1.0,
        1: 1.0,
        2: 0.9,
        3: 0.9,
        4: 0.95,
        5: 1.1,
        6: 1.2,
        7: 1.2,
        8: 1.05,
        9: 1.0,
        10: 1.1,
        11: 1.2
      }
    },
    staffingRequirements: [],
    calculations: {
      totalStaff: 42,
      laborCost: 55000,
      laborCostPercentage: 22.5,
      revenuePerLaborHour: 65,
      coversPerLaborHour: 4
    }
  },
  {
    id: "scn-002",
    name: "Lean Weekday Staffing",
    outletId: "outlet-002",
    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-11-18"),
    spaceParameters: {
      totalArea: 280,
      fohPercentage: 70,
      areaPerCover: 1.86,
      externalSeating: 15,
      totalCapacity: 0,
      fohArea: 0
    },
    serviceParameters: {
      coversPerWaiter: 16,
      runnerToWaiterRatio: 50,
      kitchenStations: 6,
      staffPerStation: 1.5,
      serviceStyleAdjustment: 1
    },
    revenueParameters: {
      averageSpendPerGuest: 190,
      guestDwellingTime: 90,
      tableTurnTime: 110,
      peakHourFactor: 1.3,
      emptySeatsProvision: 0.1
    },
    operationalParameters: {
      operatingDays: 350,
      ramadanCapacityReduction: 0.4,
      weekdayHours: [10, 10, 10, 10, 12],
      weekendHours: [13, 13],
      peakHoursDistribution: {
        12: 0.15,
        13: 0.2,
        14: 0.1,
        19: 0.15,
        20: 0.25,
        21: 0.15
      }
    },
    efficiencyParameters: {
      staffUtilizationRate: 80,
      positionEfficiency: {
        "pos-001": 85,
        "pos-002": 75,
        "pos-007": 90,
        "pos-010": 70
      },
      technologyImpact: 10,
      crossTrainingCapability: 10,
      seasonalityAdjustment: {
        0: 1.0,
        1: 1.0,
        2: 0.9,
        3: 0.9,
        4: 0.95,
        5: 1.1,
        6: 1.2,
        7: 1.2,
        8: 1.05,
        9: 1.0,
        10: 1.1,
        11: 1.2
      }
    },
    staffingRequirements: [],
    calculations: {
      totalStaff: 28,
      laborCost: 38000,
      laborCostPercentage: 24,
      revenuePerLaborHour: 58,
      coversPerLaborHour: 3.5
    }
  },
  {
    id: "scn-003",
    name: "High Turnover Model",
    outletId: "outlet-003",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-20"),
    spaceParameters: {
      totalArea: 200,
      fohPercentage: 65,
      areaPerCover: 1.67,
      externalSeating: 10,
      totalCapacity: 0,
      fohArea: 0
    },
    serviceParameters: {
      coversPerWaiter: 20,
      runnerToWaiterRatio: 25,
      kitchenStations: 4,
      staffPerStation: 1.2,
      serviceStyleAdjustment: 0.8
    },
    revenueParameters: {
      averageSpendPerGuest: 130,
      guestDwellingTime: 60,
      tableTurnTime: 70,
      peakHourFactor: 1.4,
      emptySeatsProvision: 0.15
    },
    operationalParameters: {
      operatingDays: 350,
      ramadanCapacityReduction: 0.6,
      weekdayHours: [11, 11, 11, 11, 13],
      weekendHours: [13, 13],
      peakHoursDistribution: {
        12: 0.15,
        13: 0.2,
        14: 0.1,
        19: 0.15,
        20: 0.25,
        21: 0.15
      }
    },
    efficiencyParameters: {
      staffUtilizationRate: 75,
      positionEfficiency: {
        "pos-001": 80,
        "pos-002": 70,
        "pos-007": 85,
        "pos-010": 65
      },
      technologyImpact: 15,
      crossTrainingCapability: 8,
      seasonalityAdjustment: {
        0: 1.0,
        1: 1.0,
        2: 0.9,
        3: 0.9,
        4: 0.95,
        5: 1.1,
        6: 1.2,
        7: 1.2,
        8: 1.05,
        9: 1.0,
        10: 1.1,
        11: 1.2
      }
    },
    staffingRequirements: [],
    calculations: {
      totalStaff: 20,
      laborCost: 25000,
      laborCostPercentage: 28,
      revenuePerLaborHour: 45,
      coversPerLaborHour: 2.8
    }
  }
];

// Update the getDefaultParameters function to use proper type casting
export const getDefaultParameters = (serviceStyle: ServiceStyle) => {
  let areaPerCover: 1.5 | 1.67 | 1.86 | 2.05 | 2.32;
  let coversPerWaiter: 12 | 16 | 20 | 24;
  let runnerToWaiterRatio: 25 | 50 | 75 | 100;
  
  // Set the appropriate values based on service style
  if (serviceStyle === "Premium Dining") {
    areaPerCover = 2.05;
    coversPerWaiter = 12;
    runnerToWaiterRatio = 75;
  } else if (serviceStyle === "Casual Dining") {
    areaPerCover = 1.86;
    coversPerWaiter = 16;
    runnerToWaiterRatio = 50;
  } else { // Fast Casual
    areaPerCover = 1.67;
    coversPerWaiter = 20;
    runnerToWaiterRatio = 25;
  }
  
  return {
    space: {
      totalArea: 300,
      fohPercentage: 65,
      areaPerCover,
      externalSeating: 20,
      totalCapacity: 0, // Will be calculated
      fohArea: 0 // Will be calculated
    },
    service: {
      coversPerWaiter,
      runnerToWaiterRatio,
      kitchenStations: 6,
      staffPerStation: serviceStyle === "Premium Dining" ? 1.8 : (serviceStyle === "Casual Dining" ? 1.5 : 1.2),
      serviceStyleAdjustment: serviceStyle === "Premium Dining" ? 1.2 : (serviceStyle === "Casual Dining" ? 1.0 : 0.8)
    },
    revenue: {
      averageSpendPerGuest: serviceStyle === "Premium Dining" ? 250 : (serviceStyle === "Casual Dining" ? 180 : 120),
      guestDwellingTime: serviceStyle === "Premium Dining" ? 120 : (serviceStyle === "Casual Dining" ? 90 : 60),
      tableTurnTime: serviceStyle === "Premium Dining" ? 150 : (serviceStyle === "Casual Dining" ? 110 : 70),
      peakHourFactor: 1.4,
      emptySeatsProvision: 0.1
    },
    operational: {
      operatingDays: 350, // Accounting for Ramadan
      ramadanCapacityReduction: 0.5,
      weekdayHours: [12, 12, 12, 12, 14], // Mon-Fri
      weekendHours: [14, 12], // Sat-Sun
      peakHoursDistribution: {
        12: 0.15, // 12pm
        13: 0.2,  // 1pm
        14: 0.1,  // 2pm
        19: 0.15, // 7pm
        20: 0.25, // 8pm
        21: 0.15  // 9pm
      }
    },
    efficiency: {
      staffUtilizationRate: 80, // Percentage
      positionEfficiency: {
        "pos-001": 85, // Server
        "pos-002": 75, // Runner
        "pos-007": 90, // Line Cook
        "pos-010": 70  // Dishwasher
      },
      technologyImpact: serviceStyle === "Fast Casual" ? 15 : (serviceStyle === "Casual Dining" ? 10 : 5),
      crossTrainingCapability: 10, // Percentage
      seasonalityAdjustment: {
        0: 1.0,  // January
        1: 1.0,  // February
        2: 0.9,  // March
        3: 0.9,  // April
        4: 0.95, // May
        5: 1.1,  // June
        6: 1.2,  // July
        7: 1.2,  // August
        8: 1.05, // September
        9: 1.0,  // October
        10: 1.1, // November
        11: 1.2  // December
      }
    }
  };
};

// Update createSampleScenario to use proper type casting
export const createSampleScenario = (
  name: string,
  outletId: string,
  brand: Brand
): Scenario => {
  const defaultParams = getDefaultParameters(brand.serviceStyle);
  const now = new Date();
  
  return {
    id: `scn-${Date.now()}`,
    name,
    outletId,
    createdAt: now,
    updatedAt: now,
    spaceParameters: defaultParams.space,
    serviceParameters: defaultParams.service,
    revenueParameters: defaultParams.revenue,
    operationalParameters: defaultParams.operational,
    efficiencyParameters: defaultParams.efficiency,
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
