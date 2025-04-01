
import { ChartContainer } from "@/components/ui/chart-container";
import { Button } from "@/components/ui/button";
import WhatIfImpactChart from "@/components/scenarios/visualizations/WhatIfImpactChart";
import WhatIfMetricCard from "@/components/scenarios/metrics/WhatIfMetricCard";
import { Scenario } from "@/types/modelTypes";

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
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Please select a base scenario to see results</p>
      </div>
    );
  }

  // Calculate impact values based on slider settings
  const baseLaborCost = selectedBaseScenario?.calculations.laborCost || 0;
  const baseRevenue = selectedBaseScenario?.calculations.monthlyRevenue || 0;
  
  const adjustedLaborCost = baseLaborCost * (staffingLevel / 100) * (averageWage / 100);
  const adjustedRevenue = baseRevenue * (customerVolume / 100) * (averageCheck / 100);
  
  // Labor cost difference
  const laborCostDiff = adjustedLaborCost - baseLaborCost;
  
  // Calculate labor percentage
  const basePercentage = selectedBaseScenario?.calculations.laborPercentage || 0;
  const newPercentage = (adjustedRevenue > 0) ? (adjustedLaborCost / adjustedRevenue) * 100 : 0;
  
  // Format currency values
  const formatCurrency = (value: number) => `SAR ${Math.round(value).toLocaleString()}`;
  const formatChange = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <ChartContainer title="Impact Analysis" className="h-60">
        <WhatIfImpactChart
          selectedBaseScenario={selectedBaseScenario}
          staffingLevel={staffingLevel}
          averageWage={averageWage}
          operatingHours={operatingHours}
          serviceEfficiency={serviceEfficiency}
          customerVolume={customerVolume}
          averageCheck={averageCheck}
        />
      </ChartContainer>
      
      <div className="grid grid-cols-2 gap-4">
        <WhatIfMetricCard 
          title="Impact on Labor Cost"
          value={formatCurrency(adjustedLaborCost)}
          change={formatChange((laborCostDiff / baseLaborCost) * 100)}
          className="bg-gradient-to-br from-card to-muted/5"
        />
        
        <WhatIfMetricCard 
          title="Impact on Revenue"
          value={formatCurrency(adjustedRevenue)}
          change={formatChange((adjustedRevenue / baseRevenue - 1) * 100)}
          className="bg-gradient-to-br from-card to-muted/5"
        />
        
        <WhatIfMetricCard 
          title="Labor Percentage"
          value={`${newPercentage.toFixed(1)}%`}
          change={formatChange(newPercentage - basePercentage)}
          isGreen={newPercentage <= basePercentage}
          className="bg-gradient-to-br from-card to-muted/5"
        />
        
        <WhatIfMetricCard 
          title="Profit Impact"
          value={formatCurrency((adjustedRevenue - adjustedLaborCost) - (baseRevenue - baseLaborCost))}
          change={laborCostDiff < 0 && adjustedRevenue >= baseRevenue ? "Positive impact on profit" : "Negative impact on profit"}
          isGreen={laborCostDiff < 0 && adjustedRevenue >= baseRevenue}
          className="bg-gradient-to-br from-card to-muted/5"
        />
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save What-If Scenario
        </Button>
      </div>
    </div>
  );
};

export default ResultsPanel;
