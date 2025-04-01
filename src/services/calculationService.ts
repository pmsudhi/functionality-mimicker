
import { 
  SpaceParameters, 
  ServiceParameters, 
  RevenueParameters, 
  OperationalParameters, 
  EfficiencyParameters,
  ServiceStyle,
  Scenario,
  ScenarioCalculations
} from "@/types/modelTypes";

/**
 * Calculate seating capacity based on space parameters
 */
export const calculateSeatingCapacity = (spaceParams: SpaceParameters) => {
  const fohArea = spaceParams.totalArea * (spaceParams.fohPercentage / 100);
  const internalSeating = Math.floor(fohArea / spaceParams.areaPerCover);
  const totalSeating = internalSeating + spaceParams.externalSeating;
  
  return {
    fohArea,
    internalSeating,
    totalSeating
  };
};

/**
 * Calculate FOH staff requirements
 */
export const calculateFOHStaff = (seatingCapacity: number, serviceParams: ServiceParameters, serviceStyle: ServiceStyle) => {
  // Calculate servers required
  const serversRequired = Math.ceil(seatingCapacity / serviceParams.coversPerWaiter);
  
  // Calculate runners based on ratio
  const runnersRequired = Math.ceil(serversRequired * (serviceParams.runnerToWaiterRatio / 100));
  
  // Calculate hosts based on service style
  let hostsRequired = 0;
  if (serviceStyle === "Premium Dining") {
    hostsRequired = Math.ceil(seatingCapacity / 60);
  } else if (serviceStyle === "Casual Dining") {
    hostsRequired = Math.ceil(seatingCapacity / 80);
  }
  // Fast Casual typically has no hosts (self-seating)
  
  // Calculate managers
  let managersRequired = 0;
  if (serviceStyle === "Premium Dining") {
    managersRequired = Math.max(1, Math.ceil(serversRequired / 8));
  } else if (serviceStyle === "Casual Dining") {
    managersRequired = Math.max(1, Math.ceil(serversRequired / 10));
  } else {
    managersRequired = Math.max(1, Math.ceil(serversRequired / 12));
  }
  
  // Calculate cashiers
  let cashiersRequired = 0;
  if (serviceStyle === "Premium Dining") {
    cashiersRequired = Math.ceil(seatingCapacity / 100);
  } else if (serviceStyle === "Casual Dining") {
    cashiersRequired = Math.ceil(seatingCapacity / 120);
  } else {
    cashiersRequired = Math.ceil(seatingCapacity / 60); // Fast casual has more cashiers
  }
  
  // Sum up FOH staff
  const totalFOH = serversRequired + runnersRequired + hostsRequired + managersRequired + cashiersRequired;
  
  return {
    servers: serversRequired,
    runners: runnersRequired,
    hosts: hostsRequired,
    managers: managersRequired,
    cashiers: cashiersRequired,
    totalFOH
  };
};

/**
 * Calculate BOH staff requirements
 */
export const calculateBOHStaff = (serviceParams: ServiceParameters, serviceStyle: ServiceStyle, seatingCapacity: number) => {
  // Calculate stations per chef based on service style
  let stationsPerChef = 1;
  if (serviceStyle === "Casual Dining") {
    stationsPerChef = 1.5;
  } else if (serviceStyle === "Fast Casual") {
    stationsPerChef = 2;
  }
  
  // Calculate line cooks based on kitchen stations
  const lineCooksRequired = Math.ceil(serviceParams.kitchenStations / stationsPerChef);
  
  // Executive and sous chefs
  const executiveChefRequired = 1; // Always present
  
  let sousChefRequired = 0;
  if (serviceStyle === "Premium Dining") {
    sousChefRequired = 2;
  } else if (serviceStyle === "Casual Dining") {
    sousChefRequired = 1;
  }
  
  // Support kitchen staff
  const prepCooksRequired = Math.floor(lineCooksRequired * 0.75);
  const kitchenHelpersRequired = Math.ceil(lineCooksRequired * 0.5);
  const dishwashersRequired = Math.max(1, Math.ceil(seatingCapacity / 80));
  
  // Sum up BOH staff
  const totalBOH = executiveChefRequired + sousChefRequired + lineCooksRequired + 
                  prepCooksRequired + kitchenHelpersRequired + dishwashersRequired;
  
  return {
    executiveChef: executiveChefRequired,
    sousChef: sousChefRequired,
    lineCooks: lineCooksRequired,
    prepCooks: prepCooksRequired,
    kitchenHelpers: kitchenHelpersRequired,
    dishwashers: dishwashersRequired,
    totalBOH
  };
};

/**
 * Calculate labor cost based on staff and efficiency parameters
 */
export const calculateLaborCost = (fohStaff: any, bohStaff: any, efficiencyParams: EfficiencyParameters) => {
  // Average salary rates in SAR
  const salaryRates = {
    server: 4000,
    runner: 3500,
    host: 4500,
    manager: 9000,
    cashier: 4000,
    executiveChef: 15000,
    sousChef: 10000,
    lineCook: 6000,
    prepCook: 4500,
    kitchenHelper: 3500,
    dishwasher: 3000
  };
  
  // Calculate combined efficiency factor
  const combinedEfficiencyFactor = (
    (1 - (1 - efficiencyParams.staffUtilizationRate)) *
    (1 - efficiencyParams.technologyImpact) *
    (1 - efficiencyParams.crossTrainingCapability)
  );
  
  // Calculate FOH cost
  const fohCost = (
    fohStaff.servers * salaryRates.server +
    fohStaff.runners * salaryRates.runner +
    fohStaff.hosts * salaryRates.host +
    fohStaff.managers * salaryRates.manager +
    fohStaff.cashiers * salaryRates.cashier
  ) * combinedEfficiencyFactor;
  
  // Calculate BOH cost
  const bohCost = (
    bohStaff.executiveChef * salaryRates.executiveChef +
    bohStaff.sousChef * salaryRates.sousChef +
    bohStaff.lineCooks * salaryRates.lineCook +
    bohStaff.prepCooks * salaryRates.prepCook +
    bohStaff.kitchenHelpers * salaryRates.kitchenHelper +
    bohStaff.dishwashers * salaryRates.dishwasher
  ) * combinedEfficiencyFactor;
  
  // Total labor cost
  const totalLaborCost = fohCost + bohCost;
  
  return {
    fohCost,
    bohCost,
    totalLaborCost,
    efficiencyFactor: combinedEfficiencyFactor
  };
};

/**
 * Calculate monthly revenue based on parameters
 */
export const calculateMonthlyRevenue = (
  seatingCapacity: number, 
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters,
  serviceStyle: ServiceStyle
) => {
  // Average spend per guest based on service style
  let averageSpend = revenueParams.averageSpendPerGuest;
  if (!averageSpend) {
    if (serviceStyle === "Premium Dining") {
      averageSpend = 250;
    } else if (serviceStyle === "Casual Dining") {
      averageSpend = 180;
    } else {
      averageSpend = 120;
    }
  }
  
  // Calculate daily covers (customers)
  const seatsAvailable = seatingCapacity * (1 - revenueParams.emptySeatsProvision);
  const minutesPerDay = operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0) + 
                        operationalParams.weekendHours.reduce((sum, h) => sum + h, 0);
  const minutesPerWeek = minutesPerDay * 60;
  
  const turnsPerDay = minutesPerWeek / (revenueParams.tableTurnTime * 7);
  const dailyCovers = seatsAvailable * turnsPerDay;
  
  // Calculate monthly revenue
  const daysPerYear = operationalParams.operatingDays;
  const monthlyRevenue = dailyCovers * averageSpend * (daysPerYear / 365);
  
  return {
    averageSpend,
    dailyCovers,
    monthlyRevenue,
    annualRevenue: monthlyRevenue * 12
  };
};

/**
 * Calculate full scenario
 */
export const calculateScenario = (
  spaceParams: SpaceParameters,
  serviceParams: ServiceParameters,
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters,
  efficiencyParams: EfficiencyParameters,
  serviceStyle: ServiceStyle
): ScenarioCalculations => {
  // Calculate seating capacity
  const { fohArea, internalSeating, totalSeating } = calculateSeatingCapacity(spaceParams);
  
  // Calculate FOH staff
  const fohStaff = calculateFOHStaff(totalSeating, serviceParams, serviceStyle);
  
  // Calculate BOH staff
  const bohStaff = calculateBOHStaff(serviceParams, serviceStyle, totalSeating);
  
  // Calculate labor cost
  const laborCost = calculateLaborCost(fohStaff, bohStaff, efficiencyParams);
  
  // Calculate revenue
  const revenue = calculateMonthlyRevenue(totalSeating, revenueParams, operationalParams, serviceStyle);
  
  // Calculate labor percentage
  const laborPercentage = (laborCost.totalLaborCost / revenue.monthlyRevenue) * 100;
  
  // Calculate total staff
  const totalStaff = fohStaff.totalFOH + bohStaff.totalBOH;
  
  // Calculate covers per labor hour
  const totalOperatingHours = operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0) + 
                             operationalParams.weekendHours.reduce((sum, h) => sum + h, 0);
  const totalLaborHours = totalStaff * totalOperatingHours * 4; // 4 weeks in a month
  const coversPerLaborHour = revenue.dailyCovers * 30 / totalLaborHours;
  
  return {
    totalStaff,
    totalFOH: fohStaff.totalFOH,
    totalBOH: bohStaff.totalBOH,
    fohBohRatio: fohStaff.totalFOH / bohStaff.totalBOH,
    staffDetail: {
      ...fohStaff,
      ...bohStaff
    },
    seatingCapacity: totalSeating,
    fohArea,
    laborCost: laborCost.totalLaborCost,
    fohCost: laborCost.fohCost,
    bohCost: laborCost.bohCost,
    monthlyRevenue: revenue.monthlyRevenue,
    annualRevenue: revenue.annualRevenue,
    laborPercentage,
    costPerSeat: laborCost.totalLaborCost / totalSeating,
    coversPerLaborHour,
    dailyCovers: revenue.dailyCovers,
    turnsPerDay: revenue.dailyCovers / totalSeating
  };
};

/**
 * Compare two scenarios and return differences
 */
export const compareScenarios = (scenario1: Scenario, scenario2: Scenario) => {
  // Check if the scenarios and their calculations exist
  if (!scenario1 || !scenario2 || !scenario1.calculations || !scenario2.calculations) {
    return {
      staffDiff: 0,
      costDiff: 0,
      laborPercentageDiff: 0,
      scenario1: {
        name: scenario1?.name || 'Unknown',
        totalStaff: 0,
        laborCost: 0,
        laborPercentage: 0,
        fohBohRatio: 0
      },
      scenario2: {
        name: scenario2?.name || 'Unknown',
        totalStaff: 0,
        laborCost: 0,
        laborPercentage: 0,
        fohBohRatio: 0
      },
      highlights: []
    };
  }

  const calc1 = scenario1.calculations;
  const calc2 = scenario2.calculations;
  
  // Calculate percentage differences
  const staffDiff = ((calc2.totalStaff - calc1.totalStaff) / calc1.totalStaff) * 100;
  const costDiff = ((calc2.laborCost - calc1.laborCost) / calc1.laborCost) * 100;
  const laborPercentageDiff = calc2.laborPercentage - calc1.laborPercentage;
  
  // Generate highlights based on differences
  const highlights = [];
  
  if (Math.abs(staffDiff) > 5) {
    highlights.push(`${scenario2.name} has ${staffDiff > 0 ? 'more' : 'fewer'} staff (${Math.abs(staffDiff).toFixed(1)}% ${staffDiff > 0 ? 'increase' : 'decrease'})`);
  }
  
  if (Math.abs(costDiff) > 5) {
    highlights.push(`Labor cost is ${costDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(costDiff).toFixed(1)}%`);
  }
  
  if (Math.abs(laborPercentageDiff) > 1) {
    highlights.push(`Labor percentage is ${laborPercentageDiff > 0 ? 'higher' : 'lower'} by ${Math.abs(laborPercentageDiff).toFixed(1)} percentage points`);
  }
  
  if (calc1.fohBohRatio !== calc2.fohBohRatio) {
    highlights.push(`FOH/BOH ratio changed from ${calc1.fohBohRatio.toFixed(2)} to ${calc2.fohBohRatio.toFixed(2)}`);
  }
  
  // Add more specific insights - with null checks to prevent errors
  if (calc1.staffDetail && calc2.staffDetail) {
    if (calc1.staffDetail.servers !== calc2.staffDetail.servers) {
      const serverDiff = calc2.staffDetail.servers - calc1.staffDetail.servers;
      highlights.push(`${Math.abs(serverDiff)} ${serverDiff > 0 ? 'more' : 'fewer'} servers required`);
    }
    
    if (calc1.staffDetail.lineCooks !== calc2.staffDetail.lineCooks) {
      const cookDiff = calc2.staffDetail.lineCooks - calc1.staffDetail.lineCooks;
      highlights.push(`${Math.abs(cookDiff)} ${cookDiff > 0 ? 'more' : 'fewer'} line cooks required`);
    }
  }
  
  return {
    staffDiff,
    costDiff,
    laborPercentageDiff,
    scenario1: {
      name: scenario1.name,
      totalStaff: calc1.totalStaff,
      laborCost: calc1.laborCost,
      laborPercentage: calc1.laborPercentage,
      fohBohRatio: calc1.fohBohRatio
    },
    scenario2: {
      name: scenario2.name,
      totalStaff: calc2.totalStaff,
      laborCost: calc2.laborCost,
      laborPercentage: calc2.laborPercentage,
      fohBohRatio: calc2.fohBohRatio
    },
    highlights
  };
};
