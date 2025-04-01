
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
  Cell
} from "recharts";
import { Scenario } from "@/types/modelTypes";

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
  const baseServiceTime = selectedBaseScenario.calculations.averageServiceTime || 0;

  // Calculate adjusted values based on slider settings
  const adjustedStaff = baseStaff * (staffingLevel / 100);
  const adjustedRevenue = baseRevenue * (customerVolume / 100) * (averageCheck / 100);
  const adjustedServiceTime = baseServiceTime * (100 / (staffingLevel / 100)); // Service time increases when staff decreases

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
      name: "Service Time (min)",
      base: baseServiceTime,
      adjusted: adjustedServiceTime,
    },
  ];

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
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
            formatter={(value: number) => [value.toFixed(1), ""]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '10px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            payload={[
              { value: 'Base Scenario', type: 'square', color: '#8884d8' },
              { value: 'What-If Scenario', type: 'square', color: '#4ade80' }
            ]}
          />
          <Bar dataKey="base" name="Base Scenario" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="adjusted" name="What-If Scenario" fill="#4ade80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WhatIfComparisonChart;
