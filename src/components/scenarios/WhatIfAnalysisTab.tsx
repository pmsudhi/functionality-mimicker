
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  return (
    <Card>
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
            
            <div className="space-y-4">
              <SliderControl 
                label="Staffing Level (%)"
                value={staffingLevel}
                onChange={(vals) => setStaffingLevel(vals[0])}
                description="Adjust the total number of staff compared to the base scenario"
              />
              
              <SliderControl 
                label="Average Wage (%)"
                value={averageWage}
                onChange={(vals) => setAverageWage(vals[0])}
                description="Adjust the average wage compared to the base scenario"
              />
              
              <SliderControl 
                label="Operating Hours (%)"
                value={operatingHours}
                onChange={(vals) => setOperatingHours(vals[0])}
                description="Adjust the operating hours compared to the base scenario"
              />
              
              <SliderControl 
                label="Service Efficiency (%)"
                value={serviceEfficiency}
                onChange={(vals) => setServiceEfficiency(vals[0])}
                description="Adjust the service efficiency compared to the base scenario"
              />
              
              <SliderControl 
                label="Customer Volume (%)"
                value={customerVolume}
                onChange={(vals) => setCustomerVolume(vals[0])}
                description="Adjust the customer volume compared to the base scenario"
              />
              
              <SliderControl 
                label="Average Check (%)"
                value={averageCheck}
                onChange={(vals) => setAverageCheck(vals[0])}
                description="Adjust the average check amount compared to the base scenario"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-60 rounded-md">
              <WhatIfImpactChart
                selectedBaseScenario={selectedBaseScenario}
                staffingLevel={staffingLevel}
                averageWage={averageWage}
                operatingHours={operatingHours}
                serviceEfficiency={serviceEfficiency}
                customerVolume={customerVolume}
                averageCheck={averageCheck}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <WhatIfMetricCard 
                title="Impact on Labor Cost"
                value={formatCurrency(adjustedLaborCost)}
                change={formatChange((laborCostDiff / baseLaborCost) * 100)}
              />
              
              <WhatIfMetricCard 
                title="Impact on Revenue"
                value={formatCurrency(adjustedRevenue)}
                change={formatChange((adjustedRevenue / baseRevenue - 1) * 100)}
              />
              
              <WhatIfMetricCard 
                title="Labor Percentage"
                value={`${newPercentage.toFixed(1)}%`}
                change={formatChange(newPercentage - basePercentage)}
              />
              
              <WhatIfMetricCard 
                title="Profit Impact"
                value={formatCurrency((adjustedRevenue - adjustedLaborCost) - (baseRevenue - baseLaborCost))}
                change={laborCostDiff < 0 && adjustedRevenue >= baseRevenue ? "Positive impact on profit" : "Negative impact on profit"}
              />
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-black text-white hover:bg-gray-800">
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
