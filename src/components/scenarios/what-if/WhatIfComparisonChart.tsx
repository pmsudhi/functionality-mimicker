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
  Cell
} from "recharts";
import { Scenario } from "@/types/modelTypes";
import ChartTooltip from "@/components/ui/chart-tooltip";

interface WhatIfComparisonChartProps {
  selectedBaseScenario: Scenario | undefined;
  staffingLevel: number;
  averageWage: number;
  customerVolume: number;
  averageCheck: number;
}

const WhatIfComparisonChart = ({
  selectedBaseScenario,
  staffingLevel,
  averageWage,
  customerVolume,
  averageCheck,
}: WhatIfComparisonChartProps) => {
  if (!selectedBaseScenario) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No base scenario selected
      </div>
    );
  }

  // Get base values from selected scenario
  const baseStaff = selectedBaseScenario.calculations.totalStaff || 0;
  const baseRevenue = selectedBaseScenario.calculations.monthlyRevenue || 0;
  
  // Use coversPerLaborHour as a proxy for service time since averageServiceTime is not available
  const baseServiceTime = selectedBaseScenario.calculations.coversPerLaborHour || 0;

  // Calculate adjusted values based on slider settings
  const adjustedStaff = baseStaff * (staffingLevel / 100);
  const adjustedRevenue = baseRevenue * (customerVolume / 100) * (averageCheck / 100);
  
  // For service efficiency, lower staffing means lower efficiency (higher time)
  // So we invert the relationship for the service time indicator
  const adjustedServiceTime = baseServiceTime * (100 / (staffingLevel / 100)); 

  // Format data for the chart
  const chartData = [
    {
      name: "Total Staff",
      base: baseStaff,
      adjusted: adjustedStaff,
    },
    {
      name: "Revenue (K SAR)",
      base: baseRevenue / 1000, // Convert to thousands
      adjusted: adjustedRevenue / 1000, // Convert to thousands
    },
    {
      name: "Covers/Labor Hour",
      base: baseServiceTime,
      adjusted: adjustedServiceTime,
    },
  ];

  // Chart colors
  const baseColor = "#8b5cf6";
  const adjustedColor = "#10b981";
  
  // Format for the tooltip
  const formatValue = (value: number) => {
    if (Math.abs(value) < 1) return value.toFixed(2);
    return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50, // Increased bottom margin for legend
          }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip 
            content={<ChartTooltip 
              valueFormatter={formatValue}
              labelFormatter={(name) => `${name} Comparison`}
            />}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 20, bottom: 0 }}
            payload={[
              { value: 'Base Scenario', type: 'square', color: baseColor },
              { value: 'What-If Scenario', type: 'square', color: adjustedColor }
            ]}
          />
          <Bar 
            dataKey="base" 
            name="Base Scenario" 
            fill={baseColor} 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="adjusted" 
            name="What-If Scenario" 
            fill={adjustedColor} 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WhatIfComparisonChart;
