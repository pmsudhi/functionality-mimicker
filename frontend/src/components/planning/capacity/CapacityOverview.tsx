
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart-container";
import { CapacityData } from "./types";

interface CapacityOverviewProps {
  data: CapacityData[];
}

const CapacityOverview = ({ data }: CapacityOverviewProps) => {
  return (
    <ChartContainer
      title="Capacity vs. Demand (FTE)"
      description="Monthly view of capacity and demand throughout the year"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--secondary-300))" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'hsl(var(--foreground))' }}
            axisLine={{ stroke: 'hsl(var(--secondary-300))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--foreground))' }}
            axisLine={{ stroke: 'hsl(var(--secondary-300))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--card-foreground))'
            }}
          />
          <Legend />
          <Bar 
            dataKey="capacity" 
            fill="hsl(var(--primary-500))" 
            name="Capacity" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="demand" 
            fill="hsl(var(--destructive-500))" 
            name="Demand" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CapacityOverview;
