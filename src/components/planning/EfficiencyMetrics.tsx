
import { useState } from "react";
import { mockScenarios, mockOutlets } from "@/services/mockData";
import EfficiencyMetricsHeader from "./efficiency/EfficiencyMetricsHeader";
import MetricCards from "./efficiency/MetricCards";
import PositionEfficiency from "./efficiency/PositionEfficiency";
import EfficiencyFactors from "./efficiency/EfficiencyFactors";
import EfficiencyBenchmarking from "./efficiency/EfficiencyBenchmarking";

const EfficiencyMetrics = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  const [utilization, setUtilization] = useState(80);
  
  // Find the selected scenario
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <EfficiencyMetricsHeader 
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
      />
      
      <MetricCards scenario={scenario} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PositionEfficiency />
        <EfficiencyFactors 
          utilization={utilization}
          setUtilization={setUtilization}
        />
      </div>
      
      <EfficiencyBenchmarking scenario={scenario} />
    </div>
  );
};

export default EfficiencyMetrics;
