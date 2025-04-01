
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scenario } from "@/types/modelTypes";
import ControlPanel from "@/components/scenarios/what-if/ControlPanel";
import ResultsPanel from "@/components/scenarios/what-if/ResultsPanel";
import { Sparkles } from "lucide-react";

interface WhatIfAnalysisTabProps {
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
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>What-If Analysis</CardTitle>
        </div>
        <CardDescription>
          Adjust parameters to see how changes would impact your staffing and financial metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ControlPanel 
            baseScenario={baseScenario}
            setBaseScenario={setBaseScenario}
            staffingLevel={staffingLevel}
            setStaffingLevel={setStaffingLevel}
            averageWage={averageWage}
            setAverageWage={setAverageWage}
            operatingHours={operatingHours}
            setOperatingHours={setOperatingHours}
            serviceEfficiency={serviceEfficiency}
            setServiceEfficiency={setServiceEfficiency}
            customerVolume={customerVolume}
            setCustomerVolume={setCustomerVolume}
            averageCheck={averageCheck}
            setAverageCheck={setAverageCheck}
          />
          
          <ResultsPanel
            selectedBaseScenario={selectedBaseScenario}
            staffingLevel={staffingLevel}
            averageWage={averageWage}
            operatingHours={operatingHours}
            serviceEfficiency={serviceEfficiency}
            customerVolume={customerVolume}
            averageCheck={averageCheck}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfAnalysisTab;
