import { Scenario, ScenarioCalculations, SpaceParameters, ServiceParameters, RevenueParameters, OperationalParameters, EfficiencyParameters } from "@/types/modelTypes";
import { Brand, Currency, Location, Outlet, Position, PositionCategory, ExtendedScenario, StaffingRequirement } from "@/types/extraTypes";

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

// Mock scenarios
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
    },
  }
];
