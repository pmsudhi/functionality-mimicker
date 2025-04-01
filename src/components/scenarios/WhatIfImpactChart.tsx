
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
import { ChartContainer } from "@/components/ui/chart-container";
import { Scenario } from "@/types/modelTypes";

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

  // Format for the tooltip
  const formatNumber = (value: number) => {
    if (Math.abs(value) < 1) return value.toFixed(2);
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              Base: <span className="font-medium">{formatNumber(payload[0]?.value)}</span>
              {label === "Labor %" ? "%" : ""}
            </p>
            <p className="text-sm">
              Adjusted: <span className="font-medium">{formatNumber(payload[1]?.value)}</span>
              {label === "Labor %" ? "%" : ""}
            </p>
            <p className="text-sm">
              Change: <span className={`font-medium ${payload[2]?.value >= 0 ? "text-green-500" : "text-red-500"}`}>
                {payload[2]?.value >= 0 ? "+" : ""}{formatNumber(payload[2]?.value)}
                {label === "Labor %" ? "%" : ""}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
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
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="base" name="Base" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="adjusted" name="Adjusted" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          <Bar dataKey="diff" name="Difference" fill="#ffc658" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="diff" position="top" formatter={(value: number) => value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WhatIfImpactChart;
