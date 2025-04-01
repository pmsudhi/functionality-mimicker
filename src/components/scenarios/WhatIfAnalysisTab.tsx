
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/ui/chart-container";
import { DollarSign, TrendingUp, BadgePercent, Calculator } from "lucide-react";
import { mockScenarios } from "@/services/mockData";
import { Scenario } from "@/types/modelTypes";
import WhatIfImpactChart from "./WhatIfImpactChart";
import SliderControl from "./controls/SliderControl";
import WhatIfMetricCard from "./metrics/WhatIfMetricCard";

interface WhatIfAnalysisTabProps {
  baseScenario: string;
  setBaseScenario: Dispatch<SetStateAction<string>>;
  staffingLevel: number;
  setStaffingLevel: Dispatch<SetStateAction<number>>;
  averageWage: number;
  setAverageWage: Dispatch<SetStateAction<number>>;
  operatingHours: number;
  setOperatingHours: Dispatch<SetStateAction<number>>;
  serviceEfficiency: number;
  setServiceEfficiency: Dispatch<SetStateAction<number>>;
  customerVolume: number;
  setCustomerVolume: Dispatch<SetStateAction<number>>;
  averageCheck: number;
  setAverageCheck: Dispatch<SetStateAction<number>>;
  selectedBaseScenario: Scenario | undefined;
}

const WhatIfAnalysisTab = ({
  baseScenario,
  setBaseScenario,
  staffingLevel,
  setStaffingLevel,
  averageWage,
  setAverageWage,
  operatingHours,
  setOperatingHours,
  serviceEfficiency,
  setServiceEfficiency,
  customerVolume,
  setCustomerVolume,
  averageCheck,
  setAverageCheck,
  selectedBaseScenario
}: WhatIfAnalysisTabProps) => {
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

  const handleSliderChange = (param: string, values: number[]) => {
    const value = values[0];
    
    switch(param) {
      case 'staffingLevel':
        setStaffingLevel(value);
        break;
      case 'averageWage':
        setAverageWage(value);
        break;
      case 'operatingHours':
        setOperatingHours(value);
        break;
      case 'serviceEfficiency':
        setServiceEfficiency(value);
        break;
      case 'customerVolume':
        setCustomerVolume(value);
        break;
      case 'averageCheck':
        setAverageCheck(value);
        break;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>What-If Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Adjust parameters to see how changes would impact your staffing and financial metrics</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Scenario</label>
              <Select value={baseScenario} onValueChange={setBaseScenario}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select base scenario" />
                </SelectTrigger>
                <SelectContent>
                  {mockScenarios.map(scenario => (
                    <SelectItem key={scenario.id} value={scenario.id}>{scenario.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg border">
              <SliderControl 
                label="Staffing Level (%)"
                value={staffingLevel}
                onChange={(vals) => handleSliderChange('staffingLevel', vals)}
                description="Adjust the total number of staff compared to the base scenario"
              />
              
              <SliderControl 
                label="Average Wage (%)"
                value={averageWage}
                onChange={(vals) => handleSliderChange('averageWage', vals)}
                description="Adjust the average wage compared to the base scenario"
              />
              
              <SliderControl 
                label="Operating Hours (%)"
                value={operatingHours}
                onChange={(vals) => handleSliderChange('operatingHours', vals)}
                description="Adjust the operating hours compared to the base scenario"
              />
              
              <SliderControl 
                label="Service Efficiency (%)"
                value={serviceEfficiency}
                onChange={(vals) => handleSliderChange('serviceEfficiency', vals)}
                description="Adjust the service efficiency compared to the base scenario"
              />
              
              <SliderControl 
                label="Customer Volume (%)"
                value={customerVolume}
                onChange={(vals) => handleSliderChange('customerVolume', vals)}
                description="Adjust the customer volume compared to the base scenario"
              />
              
              <SliderControl 
                label="Average Check (%)"
                value={averageCheck}
                onChange={(vals) => handleSliderChange('averageCheck', vals)}
                description="Adjust the average check amount compared to the base scenario"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <ChartContainer title="Impact Analysis" className="h-60 mb-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfAnalysisTab;
