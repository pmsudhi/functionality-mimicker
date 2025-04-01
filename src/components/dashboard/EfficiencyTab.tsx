
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { laborCostTrend, outletComparison, radarData, efficiencyScoresByOutlet } from "./ChartData";
import { Progress } from "@/components/ui/progress";
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
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

export const EfficiencyTab = () => {
  // Custom tooltip for efficiency scores
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          <p className="text-sm text-primary">
            <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
            {`Score: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Covers per Labor Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 0.3</span> from last month
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Current</span>
                <span>Target: 5.5</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue per Labor Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR 4,050</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 80</span> from last month
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Current</span>
                <span>Target: SAR 4,500</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Labor Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 2%</span> from last month
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Current</span>
                <span>Target: 98%</span>
              </div>
              <Progress value={97} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Efficiency Scores by Outlet</CardTitle>
            <CardDescription>Performance comparison across locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={efficiencyScoresByOutlet}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar 
                    dataKey="score" 
                    name="Efficiency Score" 
                    fill="url(#colorScore)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance vs Benchmark</CardTitle>
            <CardDescription>Comparison with industry standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} width={500} height={300} data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                  <Radar 
                    name="Current Performance" 
                    dataKey="A" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.4} 
                  />
                  <Radar 
                    name="Industry Benchmark" 
                    dataKey="B" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.4} 
                  />
                  <Legend 
                    iconType="circle" 
                    iconSize={8}
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Efficiency Metrics Trend</CardTitle>
            <CardDescription>Monthly trend of key efficiency metrics</CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={laborCostTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorLabor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `${value / 1000}k`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[20, 30]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                />
                <Tooltip />
                <Legend 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 1 }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="laborCost" 
                  name="Labor Cost" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorLabor)"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 1 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="laborPercentage" 
                  name="Labor %" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
