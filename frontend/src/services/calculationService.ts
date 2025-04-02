
import { SpaceParameters, RevenueParameters, OperationalParameters, Scenario } from "@/types/modelTypes";
import { ExtendedScenario, ScenarioComparison } from "@/types/extraTypes";

export const calculateMonthlyRevenue = (
  spaceParameters: SpaceParameters,
  revenueParameters: RevenueParameters,
  operationalParameters: OperationalParameters,
  peakPeriodOnly: boolean = false
): number => {
  // This is a simplified calculation
  const seatingCapacity = calculateSeatingCapacity(spaceParameters);
  const turnsPerDay = calculateTurnsPerDay(revenueParameters);
  const operatingDays = operationalParameters.operatingDays / 12; // Monthly operating days
  const averageOccupancy = 0.85; // 85% occupancy rate
  
  const dailyCovers = seatingCapacity * turnsPerDay * averageOccupancy;
  const monthlyCovers = dailyCovers * operatingDays;
  
  return monthlyCovers * revenueParameters.averageSpendPerGuest;
};

export const calculateSeatingCapacity = (spaceParameters: SpaceParameters): number => {
  const internalCapacity = Math.floor(spaceParameters.fohArea / spaceParameters.areaPerCover);
  return internalCapacity + spaceParameters.externalSeating;
};

export const calculateTurnsPerDay = (revenueParameters: RevenueParameters): number => {
  // Calculate turns per day based on operating hours and turn time
  // Simplified calculation, assumes 10 hours of operation
  const operatingMinutes = 10 * 60; // 10 hours converted to minutes
  return operatingMinutes / revenueParameters.tableTurnTime;
};

export const compareScenarios = (
  scenario1: ExtendedScenario, 
  scenario2: ExtendedScenario
): ScenarioComparison => {
  // Calculate differences between scenarios
  const staffDiff = scenario2.calculations.totalStaff - scenario1.calculations.totalStaff;
  const costDiff = scenario2.calculations.laborCost - scenario1.calculations.laborCost;
  const laborPercentageDiff = scenario2.calculations.laborPercentage - scenario1.calculations.laborPercentage;
  
  // Staffing differences by position
  const staffingDifference: Record<string, number> = {};
  
  // If staffingRequirements exists
  if (scenario1.staffingRequirements && scenario2.staffingRequirements) {
    // Create a set of all position IDs from both scenarios
    const allPositionIds = new Set<string>();
    scenario1.staffingRequirements.forEach(req => allPositionIds.add(req.positionId));
    scenario2.staffingRequirements.forEach(req => allPositionIds.add(req.positionId));
    
    // Calculate differences for each position
    allPositionIds.forEach(posId => {
      const pos1 = scenario1.staffingRequirements.find(req => req.positionId === posId);
      const pos2 = scenario2.staffingRequirements.find(req => req.positionId === posId);
      
      const count1 = pos1 ? pos1.count : 0;
      const count2 = pos2 ? pos2.count : 0;
      
      staffingDifference[posId] = count2 - count1;
    });
  }
  
  // Create highlights based on significant differences
  const highlights: string[] = [];
  
  if (Math.abs(staffDiff) >= 1) {
    highlights.push(
      `${Math.abs(staffDiff).toFixed(1)} ${staffDiff > 0 ? "more" : "fewer"} total staff`
    );
  }
  
  if (Math.abs(laborPercentageDiff) >= 1) {
    highlights.push(
      `${Math.abs(laborPercentageDiff).toFixed(1)}% ${laborPercentageDiff > 0 ? "higher" : "lower"} labor cost percentage`
    );
  }
  
  // Additional metrics
  const revenuePerLaborHour1 = scenario1.calculations.monthlyRevenue / (scenario1.calculations.totalStaff * 160); // Assuming 160 hours per month per staff
  const revenuePerLaborHour2 = scenario2.calculations.monthlyRevenue / (scenario2.calculations.totalStaff * 160);
  const efficiencyDifference = revenuePerLaborHour2 - revenuePerLaborHour1;
  
  if (Math.abs(efficiencyDifference) >= 10) {
    highlights.push(
      `${Math.abs(efficiencyDifference).toFixed(2)} ${efficiencyDifference > 0 ? "higher" : "lower"} revenue per labor hour`
    );
  }
  
  // Create comparison return object
  return {
    staffDiff,
    costDiff,
    laborPercentageDiff,
    staffingDifference,
    costDifference: costDiff,
    costPercentageDifference: laborPercentageDiff,
    efficiencyDifference,
    scenario1: {
      name: scenario1.name,
      totalStaff: scenario1.calculations.totalStaff,
      laborCost: scenario1.calculations.laborCost,
      laborPercentage: scenario1.calculations.laborPercentage,
      fohBohRatio: scenario1.calculations.fohBohRatio
    },
    scenario2: {
      name: scenario2.name,
      totalStaff: scenario2.calculations.totalStaff,
      laborCost: scenario2.calculations.laborCost,
      laborPercentage: scenario2.calculations.laborPercentage,
      fohBohRatio: scenario2.calculations.fohBohRatio
    },
    highlights
  };
};

// Add the processScenario function that's referenced in StaffingModeler.tsx
export const processScenario = (scenario: Scenario): Scenario => {
  // This is a placeholder implementation
  return scenario;
};
