
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { revenueTrend, revenueByOutlet } from "./ChartData";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export const RevenueTab = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Actual vs projected monthly revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="projected" name="Projected Revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Outlet</CardTitle>
            <CardDescription>Distribution across locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByOutlet}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {revenueByOutlet.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Annual Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">SAR 48,000,000</div>
              <p className="text-sm text-muted-foreground mt-1">+5.2% from previous year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">SAR 4,000,000</div>
              <p className="text-sm text-muted-foreground mt-1">Per month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue per Square Meter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">SAR 4,250</div>
              <p className="text-sm text-muted-foreground mt-1">Average across all outlets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+8.2%</div>
              <p className="text-sm text-muted-foreground mt-1">Year-over-year</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
