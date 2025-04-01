
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Scenario } from "@/types/modelTypes";
import { Check, X } from "lucide-react";

interface ResultsPanelProps {
  selectedBaseScenario: Scenario | undefined;
  staffingLevel: number;
  averageWage: number;
  operatingHours: number;
  serviceEfficiency: number;
  customerVolume: number;
  averageCheck: number;
}

const ResultsPanel = ({
  selectedBaseScenario,
  staffingLevel,
  averageWage,
  operatingHours,
  serviceEfficiency,
  customerVolume,
  averageCheck
}: ResultsPanelProps) => {
  if (!selectedBaseScenario) {
    return null;
  }

  // Calculate the impact values based on slider settings
  const baseLaborCost = selectedBaseScenario.calculations.laborCost || 0;
  const baseRevenue = selectedBaseScenario.calculations.monthlyRevenue || 0;
  
  const adjustedLaborCost = baseLaborCost * (staffingLevel / 100) * (averageWage / 100);
  const adjustedRevenue = baseRevenue * (customerVolume / 100) * (averageCheck / 100);
  
  // Labor cost difference
  const laborCostDiff = adjustedLaborCost - baseLaborCost;
  const laborCostDiffPercentage = (laborCostDiff / baseLaborCost) * 100;
  
  // Revenue difference
  const revenueDiff = adjustedRevenue - baseRevenue;
  const revenueDiffPercentage = (revenueDiff / baseRevenue) * 100;
  
  // Calculate labor percentage
  const basePercentage = selectedBaseScenario.calculations.laborPercentage || 0;
  const newPercentage = (adjustedRevenue > 0) ? (adjustedLaborCost / adjustedRevenue) * 100 : 0;
  const percentageDiff = newPercentage - basePercentage;
  
  // Calculate profit impact
  const baseProfitContribution = baseRevenue - baseLaborCost;
  const newProfitContribution = adjustedRevenue - adjustedLaborCost;
  const profitDiff = newProfitContribution - baseProfitContribution;
  
  // Format currency values
  const formatCurrency = (value: number) => `SAR ${Math.round(value).toLocaleString()}`;
  
  // Determine if changes have positive or negative impact
  const isLaborCostPositive = laborCostDiff <= 0;
  const isRevenuePositive = revenueDiff >= 0;
  const isLaborPercentagePositive = percentageDiff <= 0;
  const isProfitPositive = profitDiff >= 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Impact on Labor Cost</h3>
            <div>
              <p className="text-xl font-bold">{formatCurrency(adjustedLaborCost)}</p>
              <div className="flex items-center gap-1 text-sm">
                <span className={isLaborCostPositive ? "text-green-600" : "text-red-600"}>
                  {laborCostDiff >= 0 ? "+" : ""}{formatCurrency(laborCostDiff)}
                </span>
                <span className={isLaborCostPositive ? "text-green-600" : "text-red-600"}>
                  ({laborCostDiffPercentage >= 0 ? "+" : ""}{laborCostDiffPercentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Impact on Revenue</h3>
            <div>
              <p className="text-xl font-bold">{formatCurrency(adjustedRevenue)}</p>
              <div className="flex items-center gap-1 text-sm">
                <span className={isRevenuePositive ? "text-green-600" : "text-red-600"}>
                  {revenueDiff >= 0 ? "+" : ""}{formatCurrency(revenueDiff)}
                </span>
                <span className={isRevenuePositive ? "text-green-600" : "text-red-600"}>
                  ({revenueDiffPercentage >= 0 ? "+" : ""}{revenueDiffPercentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Labor Percentage</h3>
            <div>
              <p className="text-xl font-bold">{newPercentage.toFixed(1)}%</p>
              <div className="flex items-center gap-1 text-sm">
                <span className={isLaborPercentagePositive ? "text-green-600" : "text-red-600"}>
                  {percentageDiff >= 0 ? "+" : ""}{percentageDiff.toFixed(1)}%
                </span>
                <span className="text-muted-foreground">from base</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Profit Impact</h3>
            <div>
              <p className="text-xl font-bold">{formatCurrency(profitDiff)}</p>
              <div className="flex items-center gap-1 text-sm">
                {isProfitPositive ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" />
                    <span>Positive impact on profit</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X className="w-4 h-4 mr-1" />
                    <span>Negative impact on profit</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPanel;
