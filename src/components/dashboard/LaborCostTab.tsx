
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
  Bar,
  Cell
} from "recharts";
import { 
  BadgeCheck, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users,
  ChartBar 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/ui/metric-card";
import { ChartContainer } from "@/components/ui/chart-container";

export const LaborCostTab = () => {
  const getRandomColor = (index: number) => {
    const colors = [
      '#8b5cf6', // Purple (primary)
      '#a78bfa', // Light purple
      '#7c3aed', // Indigo
      '#6366f1', // Indigo/blue
      '#3b82f6', // Blue
      '#60a5fa', // Light blue
      '#10b981', // Green
      '#34d399', // Light green
      '#f97316', // Orange
      '#fb923c', // Light orange
    ];
    return colors[index % colors.length];
  };

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          <p className="text-sm text-primary"><span className="inline-block w-3 h-3 bg-[#8884d8] rounded-full mr-2"></span>
            {`Labor Cost: SAR ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-sm text-green-500"><span className="inline-block w-3 h-3 bg-[#82ca9d] rounded-full mr-2"></span>
            {`Revenue %: ${payload[1].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm mb-1">{payload[0].payload.position}</p>
          <p className="text-sm">
            <span className="font-medium">Monthly Cost:</span> SAR {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <ChartContainer 
        title="Labor Cost Trend"
        description="Monthly labor cost and percentage of revenue"
        className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={laborCostTrend}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorLaborCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
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
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 35]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Legend 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => <span className="text-xs font-medium">{value}</span>}
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="laborCost" 
                name="Labor Cost (SAR)" 
                stroke="#8884d8" 
                fill="url(#colorLaborCost)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 1 }} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="laborPercentage" 
                name="% of Revenue" 
                stroke="#82ca9d"
                fill="url(#colorRevenue)"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 1 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <MetricCard
          title="Total Monthly Labor Cost"
          value="SAR 600,000"
          description="24.3% of total revenue"
          icon={<DollarSign className="h-5 w-5 text-blue-500" />}
          trend={{ value: "Up 3.5% from last month", positive: false }}
        />
        
        <MetricCard
          title="Average Cost per Employee"
          value="SAR 2,429"
          description="Per month"
          icon={<Users className="h-5 w-5 text-purple-500" />}
          trend={{ value: "Up 1.2% from last month", positive: false }}
        />
        
        <MetricCard
          title="Labor Cost per Cover"
          value="SAR 28.50"
          description="Average across all outlets"
          icon={<ChartBar className="h-5 w-5 text-green-500" />}
          trend={{ value: "Down 0.5% from last month", positive: true }}
        />
      </div>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader className="pb-2 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold tracking-tight">Labor Cost by Position</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Monthly cost by staff position</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={laborCostByPosition}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis 
                  type="number" 
                  tickFormatter={(value) => `${value / 1000}k`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }} 
                />
                <YAxis 
                  dataKey="position" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 13 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }} 
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar 
                  dataKey="cost" 
                  name="Monthly Cost (SAR)"
                  radius={[0, 4, 4, 0]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {laborCostByPosition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRandomColor(index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <Badge variant="outline" className="flex items-center justify-center gap-2 py-1.5 font-medium bg-primary/5">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              8 Staff Positions
            </Badge>
            <Badge variant="outline" className="flex items-center justify-center gap-2 py-1.5 font-medium bg-primary/5">
              <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              Servers: Highest
            </Badge>
            <Badge variant="outline" className="flex items-center justify-center gap-2 py-1.5 font-medium bg-primary/5">
              <TrendingDown className="h-3.5 w-3.5 text-blue-500" />
              Bartenders: Lowest
            </Badge>
            <Badge variant="outline" className="flex items-center justify-center gap-2 py-1.5 font-medium bg-primary/5">
              <DollarSign className="h-3.5 w-3.5 text-amber-500" />
              SAR 600k Total
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
