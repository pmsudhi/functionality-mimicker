
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="capacity" fill="#4f46e5" name="Capacity" />
          <Bar dataKey="demand" fill="#ef4444" name="Demand" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CapacityOverview;
