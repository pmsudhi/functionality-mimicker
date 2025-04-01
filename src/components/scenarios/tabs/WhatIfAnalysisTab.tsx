
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import ControlPanel from "../what-if/ControlPanel";
import { mockScenarios } from "@/services/mockData";

// Create a simple Results Panel component
const ResultsPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Impact Analysis</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Staffing Impact</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">+4 staff</p>
            <p className="text-sm text-muted-foreground">+8.5% from baseline</p>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Labor Cost Impact</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">+$12,450</p>
            <p className="text-sm text-muted-foreground">+10.2% from baseline</p>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Efficiency Impact</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">-0.4 units</p>
            <p className="text-sm text-muted-foreground">-8.7% from baseline</p>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Revenue Impact</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">+$28,900</p>
            <p className="text-sm text-muted-foreground">+12.3% from baseline</p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Impact Charts</h4>
        <div className="h-48 bg-muted/20 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Impact visualization charts will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

const WhatIfAnalysisTab = () => {
  const [baseScenario, setBaseScenario] = useState(mockScenarios[0]?.id || "");
  const [staffingLevel, setStaffingLevel] = useState(100);
  const [averageWage, setAverageWage] = useState(100);
  const [operatingHours, setOperatingHours] = useState(100);
  const [serviceEfficiency, setServiceEfficiency] = useState(100);
  const [customerVolume, setCustomerVolume] = useState(100);
  const [averageCheck, setAverageCheck] = useState(100);

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
          <div>
            <ResultsPanel />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfAnalysisTab;
