import { ModelParameters, ServiceStyle } from "@/types/modelTypes";
import { 
  Brand, 
  Currency, 
  Location, 
  Outlet, 
  Position, 
  PositionCategory, 
  ExtendedScenario, 
  StaffingRequirement 
} from "@/types/extraTypes";

// Mock data for brands
export const mockBrands: Brand[] = [
  {
    id: "b1",
    name: "White Robata",
    serviceStyle: "Premium Dining",
    logoUrl: "/brands/white-robata.png"
  },
  {
    id: "b2",
    name: "Lazy Cat",
    serviceStyle: "Casual Dining",
    logoUrl: "/brands/lazy-cat.png"
  },
  {
    id: "b3",
    name: "Burger Boutique",
    serviceStyle: "Fast Casual",
    logoUrl: "/brands/burger-boutique.png"
  }
];

// Mock data for locations
export const mockLocations: Location[] = [
  {
    id: "l1",
    name: "Mall of Dhahran",
    country: "Saudi Arabia",
    city: "Dhahran"
  },
  {
    id: "l2",
    name: "Riyadh Park",
    country: "Saudi Arabia",
    city: "Riyadh"
  },
  {
    id: "l3",
    name: "Red Sea Mall",
    country: "Saudi Arabia",
    city: "Jeddah"
  }
];

// Mock data for outlets
export const mockOutlets: Outlet[] = [
  {
    id: "o1",
    name: "White Robata - Mall of Dhahran",
    brandId: "b1",
    locationId: "l1",
    status: "Operational"
  },
  {
    id: "o2",
    name: "Lazy Cat - Riyadh Park",
    brandId: "b2",
    locationId: "l2",
    status: "Operational"
  },
  {
    id: "o3",
    name: "Burger Boutique - Red Sea Mall",
    brandId: "b3",
    locationId: "l3",
    status: "Operational"
  },
  {
    id: "o4",
    name: "White Robata - Riyadh Park",
    brandId: "b1",
    locationId: "l2",
    status: "Planning"
  }
];

// Mock data for positions
export const mockPositions: Position[] = [
  // FOH positions
  {
    id: "p1",
    name: "Restaurant Manager",
    category: PositionCategory.Management,
    baseSalary: 12000,
    variablePay: 2000,
    benefits: 1400,
    turnoverRate: 0.15,
    trainingCost: 500,
    recruitmentCost: 1200,
    mealCost: 300
  },
  {
    id: "p2",
    name: "Assistant Manager",
    category: PositionCategory.Management,
    baseSalary: 8000,
    variablePay: 1000,
    benefits: 900,
    turnoverRate: 0.25,
    trainingCost: 400,
    recruitmentCost: 800,
    mealCost: 300
  },
  {
    id: "p3",
    name: "Host/Hostess",
    category: PositionCategory.FOH,
    baseSalary: 4500,
    variablePay: 500,
    benefits: 500,
    turnoverRate: 0.4,
    trainingCost: 200,
    recruitmentCost: 400,
    mealCost: 300
  },
  {
    id: "p4",
    name: "Waiter/Waitress",
    category: PositionCategory.FOH,
    baseSalary: 4000,
    variablePay: 800,
    benefits: 400,
    turnoverRate: 0.5,
    trainingCost: 250,
    recruitmentCost: 350,
    mealCost: 300
  },
  {
    id: "p5",
    name: "Runner",
    category: PositionCategory.FOH,
    baseSalary: 3500,
    variablePay: 300,
    benefits: 350,
    turnoverRate: 0.6,
    trainingCost: 150,
    recruitmentCost: 300,
    mealCost: 300
  },
  {
    id: "p6",
    name: "Cashier",
    category: PositionCategory.FOH,
    baseSalary: 4000,
    variablePay: 400,
    benefits: 400,
    turnoverRate: 0.45,
    trainingCost: 200,
    recruitmentCost: 350,
    mealCost: 300
  },
  // BOH positions
  {
    id: "p7",
    name: "Executive Chef",
    category: PositionCategory.BOH,
    baseSalary: 15000,
    variablePay: 3000,
    benefits: 1800,
    turnoverRate: 0.2,
    trainingCost: 600,
    recruitmentCost: 1500,
    mealCost: 300
  },
  {
    id: "p8",
    name: "Sous Chef",
    category: PositionCategory.BOH,
    baseSalary: 10000,
    variablePay: 1500,
    benefits: 1200,
    turnoverRate: 0.25,
    trainingCost: 500,
    recruitmentCost: 1000,
    mealCost: 300
  },
  {
    id: "p9",
    name: "Line Cook",
    category: PositionCategory.BOH,
    baseSalary: 5500,
    variablePay: 500,
    benefits: 550,
    turnoverRate: 0.35,
    trainingCost: 300,
    recruitmentCost: 500,
    mealCost: 300
  },
  {
    id: "p10",
    name: "Prep Cook",
    category: PositionCategory.BOH,
    baseSalary: 4000,
    variablePay: 300,
    benefits: 400,
    turnoverRate: 0.4,
    trainingCost: 250,
    recruitmentCost: 400,
    mealCost: 300
  },
  {
    id: "p11",
    name: "Dishwasher",
    category: PositionCategory.BOH,
    baseSalary: 3000,
    variablePay: 200,
    benefits: 300,
    turnoverRate: 0.55,
    trainingCost: 150,
    recruitmentCost: 300,
    mealCost: 300
  }
];

// Function to get default parameters based on service style
export const getDefaultParameters = (serviceStyle: ServiceStyle): ModelParameters => {
  const defaults: Record<ServiceStyle, ModelParameters> = {
    "Premium Dining": {
      space: {
        totalArea: 350,
        fohPercentage: 70,
        areaPerCover: 2.32,
        externalSeating: 10,
      },
      service: {
        coversPerWaiter: 12,
        runnerToWaiterRatio: 50,
        kitchenStations: 6,
        staffPerStation: 2.5,
        serviceStyleAdjustment: 1.2,
      },
      revenue: {
        averageSpendPerGuest: 180,
        guestDwellingTime: 90,
        tableTurnTime: 120,
        peakHourFactor: 1.3,
        emptySeatsProvision: 0.05,
      },
      operational: {
        operatingDays: 350,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [10, 10, 10, 10, 10],
        weekendHours: [12, 12],
      },
      efficiency: {
        staffUtilizationRate: 0.85,
        positionEfficiency: {
          "p1": 0.9,
          "p2": 0.85,
          "p3": 0.8,
          "p4": 0.75,
          "p5": 0.7,
          "p6": 0.75,
          "p7": 0.9,
          "p8": 0.85,
          "p9": 0.8,
          "p10": 0.75,
          "p11": 0.7,
        },
        technologyImpact: 0.1,
        crossTrainingCapability: 0.15,
      },
    },
    "Casual Dining": {
      space: {
        totalArea: 300,
        fohPercentage: 65,
        areaPerCover: 1.86,
        externalSeating: 20,
      },
      service: {
        coversPerWaiter: 16,
        runnerToWaiterRatio: 50,
        kitchenStations: 5,
        staffPerStation: 2,
        serviceStyleAdjustment: 1,
      },
      revenue: {
        averageSpendPerGuest: 100,
        guestDwellingTime: 60,
        tableTurnTime: 90,
        peakHourFactor: 1.2,
        emptySeatsProvision: 0.1,
      },
      operational: {
        operatingDays: 350,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [10, 10, 10, 10, 10],
        weekendHours: [12, 12],
      },
      efficiency: {
        staffUtilizationRate: 0.8,
        positionEfficiency: {
          "p1": 0.85,
          "p2": 0.8,
          "p3": 0.75,
          "p4": 0.7,
          "p5": 0.65,
          "p6": 0.7,
          "p7": 0.85,
          "p8": 0.8,
          "p9": 0.75,
          "p10": 0.7,
          "p11": 0.65,
        },
        technologyImpact: 0.1,
        crossTrainingCapability: 0.2,
      },
    },
    "Fast Casual": {
      space: {
        totalArea: 250,
        fohPercentage: 60,
        areaPerCover: 1.5,
        externalSeating: 15,
      },
      service: {
        coversPerWaiter: 24,
        runnerToWaiterRatio: 25,
        kitchenStations: 4,
        staffPerStation: 1.5,
        serviceStyleAdjustment: 0.8,
      },
      revenue: {
        averageSpendPerGuest: 60,
        guestDwellingTime: 45,
        tableTurnTime: 60,
        peakHourFactor: 1.4,
        emptySeatsProvision: 0.15,
      },
      operational: {
        operatingDays: 360,
        ramadanCapacityReduction: 0.3,
        weekdayHours: [12, 12, 12, 12, 12],
        weekendHours: [12, 12],
      },
      efficiency: {
        staffUtilizationRate: 0.9,
        positionEfficiency: {
          "p1": 0.9,
          "p2": 0.85,
          "p3": 0.8,
          "p4": 0.75,
          "p5": 0.7,
          "p6": 0.75,
          "p7": 0.9,
          "p8": 0.85,
          "p9": 0.8,
          "p10": 0.75,
          "p11": 0.7,
        },
        technologyImpact: 0.15,
        crossTrainingCapability: 0.25,
      },
    },
  };

  return defaults[serviceStyle] || defaults["Casual Dining"];
};

// Add sample scenario creation function for ScenarioBuilder
export const createSampleScenario = (outletId: string): ExtendedScenario => {
  const outlet = mockOutlets.find(o => o.id === outletId);
  const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
  const serviceStyle = brand?.serviceStyle as ServiceStyle || "Casual Dining";
  
  const params = getDefaultParameters(serviceStyle);
  
  return {
    id: `s-${Date.now()}`,
    name: `New ${serviceStyle} Scenario`,
    outletId,
    createdAt: new Date(),
    updatedAt: new Date(),
    parameters: params,
    spaceParameters: params.space,
    serviceParameters: params.service,
    revenueParameters: params.revenue,
    operationalParameters: params.operational,
    efficiencyParameters: params.efficiency,
    staffingRequirements: [],
    calculations: {
      totalStaff: 0,
      totalFOH: 0,
      totalBOH: 0,
      fohBohRatio: 0,
      staffDetail: {
        servers: 0,
        runners: 0,
        hosts: 0,
        managers: 0,
        cashiers: 0,
        executiveChef: 0,
        sousChef: 0,
        lineCooks: 0,
        prepCooks: 0,
        kitchenHelpers: 0,
        dishwashers: 0,
      },
      seatingCapacity: 0,
      fohArea: 0,
      laborCost: 0,
      fohCost: 0,
      bohCost: 0,
      monthlyRevenue: 0,
      annualRevenue: 0,
      laborPercentage: 0,
      costPerSeat: 0,
      coversPerLaborHour: 0,
      dailyCovers: 0,
      turnsPerDay: 0,
      revenuePerLaborHour: 0,
      laborCostPercentage: 0
    }
  };
};

// Convert existing scenarios to use the new ExtendedScenario format
export const mockScenarios: ExtendedScenario[] = [
  {
    id: "s1",
    name: "Baseline Scenario",
    outletId: "o1",
    createdAt: new Date(),
    updatedAt: new Date(),
    parameters: {
      space: {
        totalArea: 300,
        fohPercentage: 65,
        areaPerCover: 1.67,
        externalSeating: 20,
      },
      service: {
        coversPerWaiter: 16,
        runnerToWaiterRatio: 50,
        kitchenStations: 5,
        staffPerStation: 2,
        serviceStyleAdjustment: 1,
      },
      revenue: {
        averageSpendPerGuest: 100,
        guestDwellingTime: 60,
        tableTurnTime: 90,
        peakHourFactor: 1.2,
        emptySeatsProvision: 0.1,
      },
      operational: {
        operatingDays: 30,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [10, 10, 10, 10, 10],
        weekendHours: [12, 12],
      },
      efficiency: {
        staffUtilizationRate: 0.8,
        positionEfficiency: {
          "p1": 0.9,
          "p2": 0.85,
          "p3": 0.8,
          "p4": 0.75,
          "p5": 0.7,
          "p6": 0.75,
          "p7": 0.9,
          "p8": 0.85,
          "p9": 0.8,
          "p10": 0.75,
          "p11": 0.7,
        },
        technologyImpact: 0.1,
        crossTrainingCapability: 0.2,
      },
    },
    spaceParameters: {
      totalArea: 300,
      fohPercentage: 65,
      areaPerCover: 1.67,
      externalSeating: 20,
    },
    serviceParameters: {
      coversPerWaiter: 16,
      runnerToWaiterRatio: 50,
      kitchenStations: 5,
      staffPerStation: 2,
      serviceStyleAdjustment: 1,
    },
    revenueParameters: {
      averageSpendPerGuest: 100,
      guestDwellingTime: 60,
      tableTurnTime: 90,
      peakHourFactor: 1.2,
      emptySeatsProvision: 0.1,
    },
    operationalParameters: {
      operatingDays: 30,
      ramadanCapacityReduction: 0.5,
      weekdayHours: [10, 10, 10, 10, 10],
      weekendHours: [12, 12],
    },
    efficiencyParameters: {
      staffUtilizationRate: 0.8,
      positionEfficiency: {
        "p1": 0.9,
        "p2": 0.85,
        "p3": 0.8,
        "p4": 0.75,
        "p5": 0.7,
        "p6": 0.75,
        "p7": 0.9,
        "p8": 0.85,
        "p9": 0.8,
        "p10": 0.75,
        "p11": 0.7,
      },
      technologyImpact: 0.1,
      crossTrainingCapability: 0.2,
    },
    staffingRequirements: [
      { positionId: "p1", count: 1 },
      { positionId: "p2", count: 2 },
      { positionId: "p4", count: 10 },
      { positionId: "p5", count: 5 },
      { positionId: "p7", count: 1 },
      { positionId: "p9", count: 5 }
    ],
    calculations: {
      totalStaff: 50,
      totalFOH: 30,
      totalBOH: 20,
      fohBohRatio: 1.5,
      staffDetail: {
        servers: 10,
        runners: 5,
        hosts: 3,
        managers: 2,
        cashiers: 5,
        executiveChef: 1,
        sousChef: 2,
        lineCooks: 5,
        prepCooks: 3,
        kitchenHelpers: 2,
        dishwashers: 2,
      },
      seatingCapacity: 120,
      fohArea: 195,
      laborCost: 30000,
      fohCost: 15000,
      bohCost: 15000,
      monthlyRevenue: 120000,
      annualRevenue: 1440000,
      laborPercentage: 25,
      costPerSeat: 250,
      coversPerLaborHour: 3,
      dailyCovers: 300,
      turnsPerDay: 2,
      revenuePerLaborHour: 50,
      laborCostPercentage: 25,
    },
  },
  {
    id: "s2",
    name: "Expansion Plan",
    outletId: "o2",
    createdAt: new Date(),
    updatedAt: new Date(),
    parameters: {
      space: {
        totalArea: 400,
        fohPercentage: 70,
        areaPerCover: 1.5,
        externalSeating: 30,
      },
      service: {
        coversPerWaiter: 20,
        runnerToWaiterRatio: 40,
        kitchenStations: 6,
        staffPerStation: 2,
        serviceStyleAdjustment: 1.1,
      },
      revenue: {
        averageSpendPerGuest: 120,
        guestDwellingTime: 70,
        tableTurnTime: 80,
        peakHourFactor: 1.3,
        emptySeatsProvision: 0.05,
      },
      operational: {
        operatingDays: 30,
        ramadanCapacityReduction: 0.5,
        weekdayHours: [10, 10, 10, 10, 10],
        weekendHours: [12, 12],
      },
      efficiency: {
        staffUtilizationRate: 0.85,
        positionEfficiency: {
          "p1": 0.92,
          "p2": 0.87,
          "p3": 0.82,
          "p4": 0.78,
          "p5": 0.73,
          "p6": 0.78,
          "p7": 0.92,
          "p8": 0.88,
          "p9": 0.83,
          "p10": 0.78,
          "p11": 0.73,
        },
        technologyImpact: 0.15,
        crossTrainingCapability: 0.25,
      },
    },
    spaceParameters: {
      totalArea: 400,
      fohPercentage: 70,
      areaPerCover: 1.5,
      externalSeating: 30,
    },
    serviceParameters: {
      coversPerWaiter: 20,
      runnerToWaiterRatio: 40,
      kitchenStations: 6,
      staffPerStation: 2,
      serviceStyleAdjustment: 1.1,
    },
    revenueParameters: {
      averageSpendPerGuest: 120,
      guestDwellingTime: 70,
      tableTurnTime: 80,
      peakHourFactor: 1.3,
      emptySeatsProvision: 0.05,
    },
    operationalParameters: {
      operatingDays: 30,
      ramadanCapacityReduction: 0.5,
      weekdayHours: [10, 10, 10, 10, 10],
      weekendHours: [12, 12],
    },
    efficiencyParameters: {
      staffUtilizationRate: 0.85,
      positionEfficiency: {
        "p1": 0.92,
        "p2": 0.87,
        "p3": 0.82,
        "p4": 0.78,
        "p5": 0.73,
        "p6": 0.78,
        "p7": 0.92,
        "p8": 0.88,
        "p9": 0.83,
        "p10": 0.78,
        "p11": 0.73,
      },
      technologyImpact: 0.15,
      crossTrainingCapability: 0.25,
    },
    staffingRequirements: [
      { positionId: "p1", count: 1 },
      { positionId: "p2", count: 3 },
      { positionId: "p4", count: 12 },
      { positionId: "p5", count: 6 },
      { positionId: "p7", count: 1 },
      { positionId: "p9", count: 6 }
    ],
    calculations: {
      totalStaff: 60,
      totalFOH: 35,
      totalBOH: 25,
      fohBohRatio: 1.4,
      staffDetail: {
        servers: 12,
        runners: 6,
        hosts: 4,
        managers: 3,
        cashiers: 6,
        executiveChef: 1,
        sousChef: 3,
        lineCooks: 6,
        prepCooks: 4,
        kitchenHelpers: 3,
        dishwashers: 3,
      },
      seatingCapacity: 150,
      fohArea: 280,
      laborCost: 40000,
      fohCost: 20000,
      bohCost: 20000,
      monthlyRevenue: 150000,
      annualRevenue: 1800000,
      laborPercentage: 26,
      costPerSeat: 267,
      coversPerLaborHour: 3.5,
      dailyCovers: 350,
      turnsPerDay: 2.5,
      revenuePerLaborHour: 60,
      laborCostPercentage: 26,
    },
  }
];
