
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart-container";
import { DepartmentCapacity } from "./types";

interface DepartmentCapacityChartProps {
  data: DepartmentCapacity[];
}

const DepartmentCapacityChart = ({ data }: DepartmentCapacityChartProps) => {
  return (
    <ChartContainer
      title="Department Capacity"
      description="Current and planned headcount by department"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="department" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="currentHeadcount" fill="#4f46e5" name="Current" />
          <Bar dataKey="netChange" fill="#10b981" name="Net Change" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default DepartmentCapacityChart;
