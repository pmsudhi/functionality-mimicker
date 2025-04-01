
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from "recharts";

const monthlyRevenueData = [
  { month: "Jan", baseline: 650000, projected: 715000 },
  { month: "Feb", baseline: 680000, projected: 748000 },
  { month: "Mar", baseline: 710000, projected: 781000 },
  { month: "Apr", baseline: 740000, projected: 814000 },
  { month: "May", baseline: 770000, projected: 847000 },
  { month: "Jun", baseline: 800000, projected: 880000 },
  { month: "Jul", baseline: 830000, projected: 913000 },
  { month: "Aug", baseline: 820000, projected: 902000 },
  { month: "Sep", baseline: 780000, projected: 858000 },
  { month: "Oct", baseline: 790000, projected: 869000 },
  { month: "Nov", baseline: 810000, projected: 891000 },
  { month: "Dec", baseline: 900000, projected: 990000 },
];

const RevenueVsLaborTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue vs. Labor Cost</CardTitle>
        <CardDescription>12-month financial trend</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyRevenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="baseline"
                name="Revenue"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="projected"
                name="Labor Cost"
                stroke="#ef4444"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueVsLaborTab;
