
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SliderControl from "@/components/scenarios/controls/SliderControl";
import { mockScenarios } from "@/services/mockData";

interface ControlPanelProps {
  baseScenario: string;
  setBaseScenario: Dispatch<SetStateAction<string>>;
  staffingLevel: number;
  setStaffingLevel: (value: number) => void;
  averageWage: number;
  setAverageWage: (value: number) => void;
  operatingHours: number;
  setOperatingHours: (value: number) => void;
  serviceEfficiency: number;
  setServiceEfficiency: (value: number) => void;
  customerVolume: number;
  setCustomerVolume: (value: number) => void;
  averageCheck: number;
  setAverageCheck: (value: number) => void;
}

const ControlPanel = ({
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
  setAverageCheck
}: ControlPanelProps) => {
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
  );
};

export default ControlPanel;
