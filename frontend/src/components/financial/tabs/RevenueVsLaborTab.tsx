
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
import { TrendingUp, DollarSign, Users } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart-container";
import { laborCostTrend } from "@/components/dashboard/ChartData";

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
  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          <p className="text-sm text-blue-500"><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            {`Revenue: SAR ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-sm text-red-500"><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            {`Labor Cost: SAR ${payload[1].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="md:col-span-3 border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">Monthly Revenue vs. Labor Cost</CardTitle>
            <CardDescription>12-month financial trend analysis</CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
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
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="baseline"
                  name="Revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorBaseline)"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 1 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="projected"
                  name="Labor Cost"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#colorProjected)"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Average Monthly Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">SAR 773,333</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">↑ 5.8%</span> from previous year
          </p>
        </CardContent>
      </Card>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Average Labor Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">SAR 850,667</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-red-500 font-medium">↑ 3.2%</span> from previous year
          </p>
        </CardContent>
      </Card>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Labor Cost Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23.8%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">↓ 0.4%</span> from target
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueVsLaborTab;
