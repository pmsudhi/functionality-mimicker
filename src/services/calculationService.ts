
import { 
  Brand, 
  ServiceStyle, 
  SpaceParameters, 
  ServiceParameters, 
  RevenueParameters,
  OperationalParameters,
  EfficiencyParameters,
  Position,
  StaffingRequirement,
  Scenario
} from "@/types/modelTypes";
import { mockPositions } from "@/services/mockData";

// Calculate Front of House Area
export const calculateFOHArea = (params: SpaceParameters): number => {
  return params.totalArea * (params.fohPercentage / 100);
};

// Calculate Total Seating Capacity
export const calculateSeatingCapacity = (params: SpaceParameters): number => {
  const fohArea = calculateFOHArea(params);
  const internalCapacity = Math.floor(fohArea / params.areaPerCover);
  return internalCapacity + params.externalSeating;
};

// Calculate Number of Servers Required
export const calculateServersRequired = (
  spaceParams: SpaceParameters, 
  serviceParams: ServiceParameters,
  serviceStyle: ServiceStyle
): number => {
  const totalCapacity = calculateSeatingCapacity(spaceParams);
  return Math.ceil(totalCapacity / serviceParams.coversPerWaiter);
};

// Calculate Number of Runners Required
export const calculateRunnersRequired = (
  serversCount: number, 
  serviceParams: ServiceParameters
): number => {
  return Math.ceil(serversCount * (serviceParams.runnerToWaiterRatio / 100));
};

// Calculate Number of Hosts/Hostesses Required
export const calculateHostsRequired = (
  spaceParams: SpaceParameters,
  serviceStyle: ServiceStyle
): number => {
  const totalCapacity = calculateSeatingCapacity(spaceParams);
  
  // As per the calculation logic document
  if (serviceStyle === "Premium Dining") {
    return Math.max(1, Math.ceil(totalCapacity / 60));
  } else if (serviceStyle === "Casual Dining") {
    return Math.max(1, Math.ceil(totalCapacity / 80));
  } else { // Fast Casual
    return 0; // Self-seating
  }
};

// Calculate Number of Managers Required
export const calculateManagersRequired = (
  serversCount: number,
  serviceStyle: ServiceStyle
): number => {
  // As per the calculation logic document
  if (serviceStyle === "Premium Dining") {
    return Math.max(1, Math.ceil(serversCount / 8));
  } else if (serviceStyle === "Casual Dining") {
    return Math.max(1, Math.ceil(serversCount / 10));
  } else { // Fast Casual
    return Math.max(1, Math.ceil(serversCount / 12));
  }
};

// Calculate Number of Cashiers Required
export const calculateCashiersRequired = (
  spaceParams: SpaceParameters,
  serviceStyle: ServiceStyle
): number => {
  const totalCapacity = calculateSeatingCapacity(spaceParams);
  
  // As per the calculation logic document
  if (serviceStyle === "Premium Dining") {
    return Math.max(1, Math.ceil(totalCapacity / 100));
  } else if (serviceStyle === "Casual Dining") {
    return Math.max(1, Math.ceil(totalCapacity / 120));
  } else { // Fast Casual
    return Math.max(1, Math.ceil(totalCapacity / 60)); // Higher turnover
  }
};

// Calculate Stations per Chef based on service style
export const calculateStationsPerChef = (serviceStyle: ServiceStyle): number => {
  if (serviceStyle === "Premium Dining") {
    return 1;
  } else if (serviceStyle === "Casual Dining") {
    return 1.5;
  } else { // Fast Casual
    return 2;
  }
};

// Calculate Line Cooks Required
export const calculateLineCooksRequired = (
  serviceParams: ServiceParameters,
  serviceStyle: ServiceStyle
): number => {
  const stationsPerChef = calculateStationsPerChef(serviceStyle);
  return Math.ceil(serviceParams.kitchenStations / stationsPerChef);
};

// Calculate Executive Chef Required
export const calculateExecutiveChefRequired = (serviceStyle: ServiceStyle): number => {
  return 1; // Always present in the model
};

// Calculate Sous Chef Required
export const calculateSousChefRequired = (serviceStyle: ServiceStyle): number => {
  if (serviceStyle === "Premium Dining") {
    return 2;
  } else if (serviceStyle === "Casual Dining") {
    return 1;
  } else { // Fast Casual
    return 0;
  }
};

// Calculate Prep Cooks Required
export const calculatePrepCooksRequired = (lineCooksCount: number): number => {
  return Math.floor(lineCooksCount * 0.75); // Rounded down as per logic document
};

// Calculate Kitchen Helpers Required
export const calculateKitchenHelpersRequired = (lineCooksCount: number): number => {
  return Math.ceil(lineCooksCount * 0.5); // Rounded up as per logic document
};

// Calculate Dishwashers Required
export const calculateDishwashersRequired = (spaceParams: SpaceParameters): number => {
  const totalCapacity = calculateSeatingCapacity(spaceParams);
  return Math.max(1, Math.ceil(totalCapacity / 80));
};

// Calculate Combined Efficiency Factor
export const calculateCombinedEfficiencyFactor = (
  efficiencyParams: EfficiencyParameters,
  month: number = 0 // Default to first month
): number => {
  const staffUtilizationEffect = (100 - efficiencyParams.staffUtilizationRate) / 100;
  const technologyEffect = (100 - efficiencyParams.technologyImpact) / 100;
  const crossTrainingEffect = (100 - efficiencyParams.crossTrainingCapability) / 100;
  
  // Get seasonality factor for the given month (or use a default if not specified)
  const seasonalityFactor = efficiencyParams.seasonalityAdjustment[month] || 1;
  
  return staffUtilizationEffect * technologyEffect * crossTrainingEffect * seasonalityFactor;
};

// Calculate BOH Staff Required
export const calculateBOHStaffRequired = (
  serviceParams: ServiceParameters, 
  serviceStyle: ServiceStyle
): number => {
  const lineCooksRequired = calculateLineCooksRequired(serviceParams, serviceStyle);
  const sousChefRequired = calculateSousChefRequired(serviceStyle);
  const prepCooksRequired = calculatePrepCooksRequired(lineCooksRequired);
  const kitchenHelpersRequired = calculateKitchenHelpersRequired(lineCooksRequired);
  const executiveChefRequired = calculateExecutiveChefRequired(serviceStyle);
  
  return (
    lineCooksRequired + 
    sousChefRequired + 
    prepCooksRequired + 
    kitchenHelpersRequired + 
    executiveChefRequired
  );
};

// Calculate Daily Covers
export const calculateDailyCovers = (
  spaceParams: SpaceParameters,
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters
): number => {
  const capacity = calculateSeatingCapacity(spaceParams);
  const tableTurns = calculateTableTurnsPerDay(revenueParams, operationalParams);
  
  return Math.floor(capacity * tableTurns * (1 - revenueParams.emptySeatsProvision));
};

// Calculate Table Turns Per Day
export const calculateTableTurnsPerDay = (
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters
): number => {
  // Calculate average daily operating hours
  const weekdayHoursTotal = operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0);
  const weekendHoursTotal = operationalParams.weekendHours.reduce((sum, h) => sum + h, 0);
  
  const averageDailyHours = (
    (weekdayHoursTotal / 5) * 5 + // Weekdays (5 days)
    (weekendHoursTotal / 2) * 2    // Weekends (2 days)
  ) / 7; // Divide by 7 days to get daily average
  
  // Calculate table turns based on operating hours and guest dwelling time
  return (averageDailyHours * 60) / revenueParams.tableTurnTime;
};

// Calculate Monthly Revenue
export const calculateMonthlyRevenue = (
  spaceParams: SpaceParameters,
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters
): number => {
  const dailyCovers = calculateDailyCovers(spaceParams, revenueParams, operationalParams);
  const effectiveDaysPerMonth = operationalParams.operatingDays / 12; // Monthly average
  
  // Factor in Ramadan impact - assuming 30 days with 50% capacity
  const normalDays = effectiveDaysPerMonth - (30 / 12); // Regular days per month
  const ramadanDays = 30 / 12; // Ramadan days per month
  
  const normalRevenue = dailyCovers * revenueParams.averageSpendPerGuest * normalDays;
  const ramadanRevenue = dailyCovers * revenueParams.averageSpendPerGuest * ramadanDays * (1 - operationalParams.ramadanCapacityReduction);
  
  return normalRevenue + ramadanRevenue;
};

// Calculate Total Labor Cost
export const calculateTotalLaborCost = (
  staffingRequirements: StaffingRequirement[],
  efficiencyParams: EfficiencyParameters
): number => {
  const efficiencyFactor = calculateCombinedEfficiencyFactor(efficiencyParams);
  
  return staffingRequirements.reduce((total, req) => {
    const position = mockPositions.find(p => p.id === req.positionId);
    if (!position) return total;
    
    const baseCost = position.baseSalary + position.variablePay + position.benefits;
    const additionalCosts = position.trainingCost + position.recruitmentCost * position.turnoverRate + position.mealCost;
    
    return total + (baseCost + additionalCosts) * req.count * efficiencyFactor;
  }, 0);
};

// Calculate Labor Cost as Percentage of Revenue
export const calculateLaborCostPercentage = (
  laborCost: number,
  monthlyRevenue: number
): number => {
  if (monthlyRevenue === 0) return 0;
  return (laborCost / monthlyRevenue) * 100;
};

// Calculate Staff Requirements by Position
export const calculateStaffingRequirements = (
  spaceParams: SpaceParameters,
  serviceParams: ServiceParameters, 
  efficiencyParams: EfficiencyParameters,
  serviceStyle: ServiceStyle
): StaffingRequirement[] => {
  const requirements: StaffingRequirement[] = [];
  
  // FOH Positions
  
  // Calculate servers
  const serversRequired = calculateServersRequired(spaceParams, serviceParams, serviceStyle);
  const adjustedServers = Math.ceil(
    serversRequired * 
    serviceParams.serviceStyleAdjustment * 
    (1 - efficiencyParams.technologyImpact / 100)
  );
  
  requirements.push({
    positionId: "pos-001", // Server/Waiter
    count: adjustedServers,
    calculationMethod: `Total capacity (${calculateSeatingCapacity(spaceParams)}) ÷ Covers per waiter (${serviceParams.coversPerWaiter})`
  });
  
  // Calculate runners
  const runnersRequired = calculateRunnersRequired(adjustedServers, serviceParams);
  requirements.push({
    positionId: "pos-002", // Runner/Busser
    count: runnersRequired,
    calculationMethod: `Servers (${adjustedServers}) × Runner ratio (${serviceParams.runnerToWaiterRatio}%)`
  });
  
  // Calculate hosts
  const hostsRequired = calculateHostsRequired(spaceParams, serviceStyle);
  requirements.push({
    positionId: "pos-003", // Host/Hostess
    count: hostsRequired,
    calculationMethod: serviceStyle === "Fast Casual" ? 
      "0 (self-seating for Fast Casual)" : 
      `1 per ${serviceStyle === "Premium Dining" ? "60" : "80"} covers (min 1)`
  });
  
  // Calculate cashiers
  const cashiersRequired = calculateCashiersRequired(spaceParams, serviceStyle);
  requirements.push({
    positionId: "pos-004", // Cashier
    count: cashiersRequired,
    calculationMethod: `1 per ${
      serviceStyle === "Premium Dining" ? "100" : 
      serviceStyle === "Casual Dining" ? "120" : "60"
    } covers (min 1)`
  });
  
  // BOH Positions
  
  // Calculate line cooks
  const lineCooksRequired = calculateLineCooksRequired(serviceParams, serviceStyle);
  requirements.push({
    positionId: "pos-007", // Line Cook
    count: lineCooksRequired,
    calculationMethod: `Kitchen stations (${serviceParams.kitchenStations}) ÷ Stations per chef (${calculateStationsPerChef(serviceStyle)})`
  });
  
  // Executive Chef
  const executiveChefRequired = calculateExecutiveChefRequired(serviceStyle);
  requirements.push({
    positionId: "pos-005", // Executive Chef
    count: executiveChefRequired,
    calculationMethod: "1 per restaurant (standard)"
  });
  
  // Sous Chef
  const sousChefRequired = calculateSousChefRequired(serviceStyle);
  requirements.push({
    positionId: "pos-006", // Sous Chef
    count: sousChefRequired,
    calculationMethod: `${
      serviceStyle === "Premium Dining" ? "2" : 
      serviceStyle === "Casual Dining" ? "1" : "0"
    } for ${serviceStyle}`
  });
  
  // Prep Cooks
  const prepCooksRequired = calculatePrepCooksRequired(lineCooksRequired);
  requirements.push({
    positionId: "pos-008", // Prep Cook
    count: prepCooksRequired,
    calculationMethod: `Line cooks (${lineCooksRequired}) × 0.75`
  });
  
  // Kitchen Helpers
  const kitchenHelpersRequired = calculateKitchenHelpersRequired(lineCooksRequired);
  requirements.push({
    positionId: "pos-009", // Kitchen Helper
    count: kitchenHelpersRequired,
    calculationMethod: `Line cooks (${lineCooksRequired}) × 0.5`
  });
  
  // Dishwashers
  const dishwashersRequired = calculateDishwashersRequired(spaceParams);
  requirements.push({
    positionId: "pos-010", // Dishwasher
    count: dishwashersRequired,
    calculationMethod: "1 per 80 covers (min 1)"
  });
  
  // Management
  // General Manager (1 per location)
  requirements.push({
    positionId: "pos-011", // General Manager
    count: 1,
    calculationMethod: "1 per location"
  });
  
  // Assistant Managers
  const managersRequired = calculateManagersRequired(adjustedServers, serviceStyle);
  requirements.push({
    positionId: "pos-012", // Assistant Manager
    count: managersRequired,
    calculationMethod: `1 per ${
      serviceStyle === "Premium Dining" ? "8" : 
      serviceStyle === "Casual Dining" ? "10" : "12"
    } servers (min 1)`
  });
  
  // Shift Supervisors
  const supervisorsRequired = Math.max(2, Math.ceil(calculateSeatingCapacity(spaceParams) / 75));
  requirements.push({
    positionId: "pos-013", // Shift Supervisor
    count: supervisorsRequired,
    calculationMethod: "1 per 75 covers (min 2)"
  });
  
  return requirements;
};

// Calculate staff hours requirements
export const calculateStaffHoursRequirement = (
  staffingRequirements: StaffingRequirement[],
  operationalParams: OperationalParameters
): number => {
  const totalStaff = staffingRequirements.reduce((sum, req) => sum + req.count, 0);
  
  // Calculate average daily hours
  const weekdayHoursTotal = operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0);
  const weekendHoursTotal = operationalParams.weekendHours.reduce((sum, h) => sum + h, 0);
  
  const averageDailyHours = (
    (weekdayHoursTotal / 5) * 5 + // Weekdays (5 days)
    (weekendHoursTotal / 2) * 2    // Weekends (2 days)
  ) / 7; // Divide by 7 days to get daily average
  
  // Typical full-time employee works ~160 hours per month (40 hours × 4 weeks)
  return totalStaff * averageDailyHours * (operationalParams.operatingDays / 12);
};

// Process a full scenario and calculate all metrics
export const processScenario = (
  scenario: Scenario, 
  brand: Brand
): Scenario => {
  // Calculate derived values for space parameters
  scenario.spaceParameters.fohArea = calculateFOHArea(scenario.spaceParameters);
  scenario.spaceParameters.totalCapacity = calculateSeatingCapacity(scenario.spaceParameters);
  
  // Calculate staffing requirements
  scenario.staffingRequirements = calculateStaffingRequirements(
    scenario.spaceParameters,
    scenario.serviceParameters,
    scenario.efficiencyParameters,
    brand.serviceStyle
  );
  
  // Calculate revenue
  const monthlyRevenue = calculateMonthlyRevenue(
    scenario.spaceParameters,
    scenario.revenueParameters,
    scenario.operationalParameters
  );
  
  // Calculate labor cost
  const laborCost = calculateTotalLaborCost(
    scenario.staffingRequirements, 
    scenario.efficiencyParameters
  );
  
  // Calculate labor cost percentage
  const laborCostPercentage = calculateLaborCostPercentage(laborCost, monthlyRevenue);
  
  // Calculate total staff
  const totalStaff = scenario.staffingRequirements.reduce((sum, req) => sum + req.count, 0);
  
  // Calculate efficiency metrics
  const totalMonthlyHours = calculateStaffHoursRequirement(
    scenario.staffingRequirements,
    scenario.operationalParameters
  );
  
  const revenuePerLaborHour = totalMonthlyHours > 0 ? monthlyRevenue / totalMonthlyHours : 0;
  
  const dailyCovers = calculateDailyCovers(
    scenario.spaceParameters,
    scenario.revenueParameters,
    scenario.operationalParameters
  );
  const monthlyCovers = dailyCovers * (scenario.operationalParameters.operatingDays / 12);
  const coversPerLaborHour = totalMonthlyHours > 0 ? monthlyCovers / totalMonthlyHours : 0;
  
  // Update calculations
  scenario.calculations = {
    totalStaff,
    laborCost,
    laborCostPercentage,
    revenuePerLaborHour,
    coversPerLaborHour
  };
  
  return scenario;
};

// Compare two scenarios
export const compareScenarios = (
  baseScenario: Scenario, 
  compareScenario: Scenario
): { 
  staffingDifference: { [positionId: string]: number },
  costDifference: number,
  costPercentageDifference: number,
  efficiencyDifference: number,
  highlights: string[]
} => {
  const staffingDifference: { [positionId: string]: number } = {};
  const highlights: string[] = [];
  
  // Calculate staffing differences
  const allPositionIds = new Set([
    ...baseScenario.staffingRequirements.map(r => r.positionId),
    ...compareScenario.staffingRequirements.map(r => r.positionId)
  ]);
  
  allPositionIds.forEach(posId => {
    const baseReq = baseScenario.staffingRequirements.find(r => r.positionId === posId);
    const compareReq = compareScenario.staffingRequirements.find(r => r.positionId === posId);
    
    const baseCount = baseReq ? baseReq.count : 0;
    const compareCount = compareReq ? compareReq.count : 0;
    
    if (baseCount !== compareCount) {
      staffingDifference[posId] = compareCount - baseCount;
      
      const position = mockPositions.find(p => p.id === posId);
      if (position) {
        highlights.push(`${position.name}: ${baseCount} → ${compareCount} (${compareCount > baseCount ? '+' : ''}${(compareCount - baseCount).toFixed(1)})`);
      }
    }
  });
  
  // Calculate cost difference
  const costDifference = compareScenario.calculations.laborCost - baseScenario.calculations.laborCost;
  const costPercentageDifference = compareScenario.calculations.laborCostPercentage - baseScenario.calculations.laborCostPercentage;
  
  // Calculate efficiency difference (revenue per labor hour)
  const efficiencyDifference = compareScenario.calculations.revenuePerLaborHour - baseScenario.calculations.revenuePerLaborHour;
  
  // Add financial highlights
  highlights.push(`Labor Cost: ${baseScenario.calculations.laborCost.toLocaleString()} → ${compareScenario.calculations.laborCost.toLocaleString()} (${costDifference > 0 ? '+' : ''}${costDifference.toLocaleString()})`);
  highlights.push(`Labor Cost %: ${baseScenario.calculations.laborCostPercentage.toFixed(2)}% → ${compareScenario.calculations.laborCostPercentage.toFixed(2)}% (${costPercentageDifference > 0 ? '+' : ''}${costPercentageDifference.toFixed(2)}%)`);
  highlights.push(`Revenue per Labor Hour: ${baseScenario.calculations.revenuePerLaborHour.toFixed(2)} → ${compareScenario.calculations.revenuePerLaborHour.toFixed(2)} (${efficiencyDifference > 0 ? '+' : ''}${efficiencyDifference.toFixed(2)})`);
  
  return {
    staffingDifference,
    costDifference,
    costPercentageDifference,
    efficiencyDifference,
    highlights
  };
};
