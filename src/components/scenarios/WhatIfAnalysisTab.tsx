
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BarChart3 } from "lucide-react";
import { mockScenarios } from "@/services/mockData";
import { Scenario } from "@/types/modelTypes";

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
            <div className="h-60 border border-dashed rounded-md p-4 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Comparison chart showing the impact of changes</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <MetricCard 
                title="Impact on Labor Cost"
                value={`SAR ${selectedBaseScenario?.calculations.laborCost.toLocaleString() || "0"}`}
                change="0.0(%)"
              />
              
              <MetricCard 
                title="Impact on Revenue"
                value="SAR 6,67,000"
                change="0.0(%)"
              />
              
              <MetricCard 
                title="Labor Percentage"
                value={`${selectedBaseScenario?.calculations.laborPercentage.toFixed(1) || "0.0"}%`}
                change="0.0%"
              />
              
              <MetricCard 
                title="Profit Impact"
                value="SAR 0"
                change="Negative impact on profit"
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

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (vals: number[]) => void;
  description: string;
}

const SliderControl = ({ label, value, onChange, description }: SliderControlProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-sm font-medium">{label}</label>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <Slider 
      value={[value]} 
      min={50} 
      max={150} 
      step={1} 
      onValueChange={onChange} 
    />
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
}

const MetricCard = ({ title, value, change }: MetricCardProps) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

export default WhatIfAnalysisTab;
