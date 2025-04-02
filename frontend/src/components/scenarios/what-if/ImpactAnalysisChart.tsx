
import React from "react";
import { ChartContainer } from "@/components/ui/chart-container";
import WhatIfImpactChart from "../WhatIfImpactChart";
import { Scenario } from "@/types/modelTypes";

interface ImpactAnalysisChartProps {
  selectedBaseScenario: Scenario | undefined;
  staffingLevel: number;
  averageWage: number;
  operatingHours: number;
  serviceEfficiency: number;
  customerVolume: number;
  averageCheck: number;
}

const ImpactAnalysisChart = ({
  selectedBaseScenario,
  staffingLevel,
  averageWage,
  operatingHours,
  serviceEfficiency,
  customerVolume,
  averageCheck
}: ImpactAnalysisChartProps) => {
  return (
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
  );
};

export default ImpactAnalysisChart;
