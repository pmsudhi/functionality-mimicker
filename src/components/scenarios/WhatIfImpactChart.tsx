
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  LabelList
} from "recharts";
import { Scenario } from "@/types/modelTypes";
import ChartTooltip from "@/components/ui/chart-tooltip";

interface WhatIfImpactChartProps {
  selectedBaseScenario: Scenario | undefined;
  staffingLevel: number;
  averageWage: number;
  operatingHours: number;
  serviceEfficiency: number;
  customerVolume: number;
  averageCheck: number;
}

const WhatIfImpactChart = ({
  selectedBaseScenario,
  staffingLevel,
  averageWage,
  operatingHours,
  serviceEfficiency,
  customerVolume,
  averageCheck,
}: WhatIfImpactChartProps) => {
  if (!selectedBaseScenario) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No base scenario selected
      </div>
    );
  }

  // Calculate the impact values based on slider settings
  const baseLaborCost = selectedBaseScenario.calculations.laborCost;
  const baseRevenue = selectedBaseScenario.calculations.monthlyRevenue || 0;
  
  const adjustedLaborCost = baseLaborCost * (staffingLevel / 100) * (averageWage / 100);
  const adjustedRevenue = baseRevenue * (customerVolume / 100) * (averageCheck / 100);
  
  // Labor cost difference
  const laborCostDiff = adjustedLaborCost - baseLaborCost;
  const revenueDiff = adjustedRevenue - baseRevenue;
  
  // Calculate labor percentage
  const basePercentage = selectedBaseScenario.calculations.laborPercentage;
  const newPercentage = (adjustedLaborCost / adjustedRevenue) * 100;
  const percentageDiff = newPercentage - basePercentage;
  
  const data = [
    {
      name: "Labor Cost",
      base: baseLaborCost,
      adjusted: adjustedLaborCost,
      diff: laborCostDiff,
    },
    {
      name: "Revenue",
      base: baseRevenue,
      adjusted: adjustedRevenue,
      diff: revenueDiff,
    },
    {
      name: "Labor %",
      base: basePercentage,
      adjusted: newPercentage,
      diff: percentageDiff,
    },
  ];
  
  // Chart colors
  const baseColor = "#8b5cf6";    // Purple
  const adjustedColor = "#10b981"; // Green
  const diffColor = "#f59e0b";     // Amber/Yellow

  // Format for the tooltip
  const formatNumber = (value: number) => {
    if (Math.abs(value) < 1) return value.toFixed(2);
    return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip 
            content={<ChartTooltip
              labelFormatter={(name) => `${name} Impact`}
              valueFormatter={(value) => {
                if (typeof value !== 'number') return String(value);
                return data.find(item => item.name === "Labor %") && value === data.find(item => item.name === "Labor %")?.base
                  ? `${formatNumber(value)}%`
                  : formatNumber(value);
              }}
            />}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            payload={[
              { value: 'Base', type: 'square', color: baseColor },
              { value: 'Adjusted', type: 'square', color: adjustedColor },
              { value: 'Difference', type: 'square', color: diffColor },
            ]}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="base" name="Base" fill={baseColor} radius={[4, 4, 0, 0]} />
          <Bar dataKey="adjusted" name="Adjusted" fill={adjustedColor} radius={[4, 4, 0, 0]} />
          <Bar dataKey="diff" name="Difference" fill={diffColor} radius={[4, 4, 0, 0]}>
            <LabelList 
              dataKey="diff" 
              position="top" 
              formatter={(value: number) => value >= 0 ? `+${formatNumber(value)}` : formatNumber(value)} 
              fill="#6b7280"
              style={{ fontWeight: 500, fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WhatIfImpactChart;
