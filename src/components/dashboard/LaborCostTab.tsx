
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { laborCostTrend, laborCostByPosition } from "./ChartData";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from "recharts";

export const LaborCostTab = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Labor Cost Trend</CardTitle>
          <CardDescription>Monthly labor cost and percentage of revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={laborCostTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 35]} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="laborCost" name="Labor Cost (SAR)" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="laborPercentage" name="% of Revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Monthly Labor Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">SAR 600,000</div>
            <p className="text-sm text-muted-foreground mt-1">24.3% of total revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Cost per Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">SAR 2,429</div>
            <p className="text-sm text-muted-foreground mt-1">Per month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Labor Cost per Cover</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">SAR 28.50</div>
            <p className="text-sm text-muted-foreground mt-1">Average across all outlets</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Labor Cost by Position</CardTitle>
          <CardDescription>Monthly cost by staff position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={laborCostByPosition}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="position" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" name="Monthly Cost (SAR)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
