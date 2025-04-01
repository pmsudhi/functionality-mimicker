
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import ControlPanel from "../what-if/ControlPanel";
import WhatIfComparisonChart from "../what-if/WhatIfComparisonChart";
import ResultsPanel from "../what-if/ResultsPanel";
import { mockScenarios } from "@/services/mockData";
import { useToast } from "@/components/ui/use-toast";

const WhatIfAnalysisTab = () => {
  const { toast } = useToast();
  const [baseScenario, setBaseScenario] = useState(mockScenarios[0]?.id || "");
  const [staffingLevel, setStaffingLevel] = useState(100);
  const [averageWage, setAverageWage] = useState(100);
  const [operatingHours, setOperatingHours] = useState(100);
  const [serviceEfficiency, setServiceEfficiency] = useState(100);
  const [customerVolume, setCustomerVolume] = useState(100);
  const [averageCheck, setAverageCheck] = useState(100);

  // Find the selected base scenario from mock data
  const selectedBaseScenario = mockScenarios.find(s => s.id === baseScenario);

  const handleSaveScenario = () => {
    toast({
      title: "What-If Scenario Saved",
      description: "Your scenario has been saved successfully",
    });
  };

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
          <div>
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
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Impact Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <WhatIfComparisonChart
                  selectedBaseScenario={selectedBaseScenario}
                  staffingLevel={staffingLevel}
                  averageWage={averageWage}
                  customerVolume={customerVolume}
                  averageCheck={averageCheck}
                />
              </CardContent>
            </Card>
            
            <ResultsPanel 
              selectedBaseScenario={selectedBaseScenario}
              staffingLevel={staffingLevel}
              averageWage={averageWage}
              operatingHours={operatingHours}
              serviceEfficiency={serviceEfficiency}
              customerVolume={customerVolume}
              averageCheck={averageCheck}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                className="bg-primary text-primary-foreground" 
                onClick={handleSaveScenario}
              >
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
