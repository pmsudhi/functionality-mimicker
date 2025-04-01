
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { laborCostTrend, outletComparison, radarData } from "./ChartData";
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
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export const EfficiencyTab = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Metrics Trend</CardTitle>
          <CardDescription>Monthly trend of key efficiency metrics</CardDescription>
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="laborCost" name="Labor Cost" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Outlet Comparison</CardTitle>
            <CardDescription>Covers per labor hour by outlet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={outletComparison}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 8]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="covers" name="Covers per Labor Hour" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance vs Benchmark</CardTitle>
            <CardDescription>Comparison with industry standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={500} height={300} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                  <Radar name="Current Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Industry Benchmark" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Covers per Labor Hour</CardTitle>
            <CardDescription>Efficiency metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.7</div>
            <p className="text-sm text-muted-foreground mt-1">+0.3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Labor Hour</CardTitle>
            <CardDescription>Financial efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">SAR 4,050</div>
            <p className="text-sm text-muted-foreground mt-1">+80 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Labor Utilization</CardTitle>
            <CardDescription>Staff productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">97%</div>
            <p className="text-sm text-muted-foreground mt-1">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
