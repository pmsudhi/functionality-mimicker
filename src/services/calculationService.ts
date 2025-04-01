
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
  serviceParams: ServiceParameters
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

// Calculate BOH Staff Required
export const calculateBOHStaffRequired = (
  serviceParams: ServiceParameters, 
  serviceStyle: ServiceStyle
): number => {
  let baseStaff = serviceParams.kitchenStations * serviceParams.staffPerStation;
  
  // Apply service style adjustment
  if (serviceStyle === "Fast Casual") {
    baseStaff *= 0.8;
  } else if (serviceStyle === "Premium Dining") {
    baseStaff *= 1.2;
  }
  
  return Math.ceil(baseStaff);
};

// Calculate Daily Covers
export const calculateDailyCovers = (
  spaceParams: SpaceParameters,
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters
): number => {
  const capacity = calculateSeatingCapacity(spaceParams);
  const tableTurns = Math.floor((
    operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0) / 5 + 
    operationalParams.weekendHours.reduce((sum, h) => sum + h, 0) / 2
  ) * 60 / revenueParams.tableTurnTime);
  
  return Math.floor(capacity * tableTurns * (1 - revenueParams.emptySeatsProvision));
};

// Calculate Monthly Revenue
export const calculateMonthlyRevenue = (
  spaceParams: SpaceParameters,
  revenueParams: RevenueParameters,
  operationalParams: OperationalParameters
): number => {
  const dailyCovers = calculateDailyCovers(spaceParams, revenueParams, operationalParams);
  const effectiveDays = operationalParams.operatingDays / 12; // Monthly average
  return dailyCovers * revenueParams.averageSpendPerGuest * effectiveDays;
};

// Calculate Total Labor Cost
export const calculateTotalLaborCost = (staffingRequirements: StaffingRequirement[]): number => {
  return staffingRequirements.reduce((total, req) => {
    const position = mockPositions.find(p => p.id === req.positionId);
    if (!position) return total;
    
    const baseCost = position.baseSalary + position.variablePay + position.benefits;
    const additionalCosts = position.trainingCost + position.recruitmentCost * position.turnoverRate + position.mealCost;
    
    return total + (baseCost + additionalCosts) * req.count;
  }, 0);
};

// Calculate Labor Cost as Percentage of Revenue
export const calculateLaborCostPercentage = (
  laborCost: number,
  monthlyRevenue: number
): number => {
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
  
  // Calculate servers
  const serversRequired = calculateServersRequired(spaceParams, serviceParams);
  const adjustedServers = Math.ceil(
    serversRequired * 
    serviceParams.serviceStyleAdjustment * 
    (1 - efficiencyParams.technologyImpact)
  );
  
  requirements.push({
    positionId: "pos-001", // Server/Waiter
    count: adjustedServers,
    calculationMethod: "Total capacity / Covers per waiter"
  });
  
  // Calculate runners
  const runnersRequired = calculateRunnersRequired(adjustedServers, serviceParams);
  requirements.push({
    positionId: "pos-002", // Runner/Busser
    count: runnersRequired,
    calculationMethod: "Servers × Runner ratio %"
  });
  
  // Calculate hosts (1 per 50 covers, minimum 1)
  const hostsRequired = Math.max(1, Math.ceil(calculateSeatingCapacity(spaceParams) / 50));
  requirements.push({
    positionId: "pos-003", // Host/Hostess
    count: hostsRequired,
    calculationMethod: "1 per 50 covers (min 1)"
  });
  
  // Calculate cashiers (1 per 75 covers, minimum 1)
  const cashiersRequired = Math.max(1, Math.ceil(calculateSeatingCapacity(spaceParams) / 75));
  requirements.push({
    positionId: "pos-004", // Cashier
    count: cashiersRequired,
    calculationMethod: "1 per 75 covers (min 1)"
  });
  
  // BOH Staffing based on kitchen stations
  const bohBaseStaff = calculateBOHStaffRequired(serviceParams, serviceStyle);
  
  // Executive Chef (1 for Premium, 0.5 for others)
  requirements.push({
    positionId: "pos-005", // Executive Chef
    count: serviceStyle === "Premium Dining" ? 1 : 0.5,
    calculationMethod: "Based on service style"
  });
  
  // Sous Chef (1 per 4 kitchen stations, minimum 1)
  const sousChefRequired = Math.max(1, Math.ceil(serviceParams.kitchenStations / 4));
  requirements.push({
    positionId: "pos-006", // Sous Chef
    count: sousChefRequired,
    calculationMethod: "1 per 4 kitchen stations (min 1)"
  });
  
  // Line Cooks (1 per station)
  requirements.push({
    positionId: "pos-007", // Line Cook
    count: serviceParams.kitchenStations,
    calculationMethod: "1 per kitchen station"
  });
  
  // Prep Cooks (0.75 per station)
  const prepCooksRequired = Math.ceil(serviceParams.kitchenStations * 0.75);
  requirements.push({
    positionId: "pos-008", // Prep Cook
    count: prepCooksRequired,
    calculationMethod: "0.75 per kitchen station"
  });
  
  // Kitchen Helpers (0.5 per station)
  const kitchenHelpersRequired = Math.ceil(serviceParams.kitchenStations * 0.5);
  requirements.push({
    positionId: "pos-009", // Kitchen Helper
    count: kitchenHelpersRequired,
    calculationMethod: "0.5 per kitchen station"
  });
  
  // Dishwashers (1 for every 100 covers, minimum 1)
  const dishwashersRequired = Math.max(1, Math.ceil(calculateSeatingCapacity(spaceParams) / 100));
  requirements.push({
    positionId: "pos-010", // Dishwasher
    count: dishwashersRequired,
    calculationMethod: "1 per 100 covers (min 1)"
  });
  
  // Management
  // General Manager (1 per location)
  requirements.push({
    positionId: "pos-011", // General Manager
    count: 1,
    calculationMethod: "1 per location"
  });
  
  // Assistant Manager (1 per 150 covers, minimum 1)
  const assistantManagersRequired = Math.max(1, Math.ceil(calculateSeatingCapacity(spaceParams) / 150));
  requirements.push({
    positionId: "pos-012", // Assistant Manager
    count: assistantManagersRequired,
    calculationMethod: "1 per 150 covers (min 1)"
  });
  
  // Shift Supervisors (1 per 75 covers, minimum 2)
  const supervisorsRequired = Math.max(2, Math.ceil(calculateSeatingCapacity(spaceParams) / 75));
  requirements.push({
    positionId: "pos-013", // Shift Supervisor
    count: supervisorsRequired,
    calculationMethod: "1 per 75 covers (min 2)"
  });
  
  return requirements;
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
  const laborCost = calculateTotalLaborCost(scenario.staffingRequirements);
  
  // Calculate labor cost percentage
  const laborCostPercentage = calculateLaborCostPercentage(laborCost, monthlyRevenue);
  
  // Calculate total staff
  const totalStaff = scenario.staffingRequirements.reduce((sum, req) => sum + req.count, 0);
  
  // Calculate efficiency metrics
  const totalMonthlyHours = totalStaff * 160; // Assuming 160 working hours per month
  const revenuePerLaborHour = monthlyRevenue / totalMonthlyHours;
  
  const dailyCovers = calculateDailyCovers(
    scenario.spaceParameters,
    scenario.revenueParameters,
    scenario.operationalParameters
  );
  const monthlyCovers = dailyCovers * (scenario.operationalParameters.operatingDays / 12);
  const coversPerLaborHour = monthlyCovers / totalMonthlyHours;
  
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
