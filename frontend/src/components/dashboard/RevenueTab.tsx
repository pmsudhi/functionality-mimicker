
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
  Cell,
  Sector
} from "recharts";
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export const RevenueTab = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-3 border rounded-lg shadow-md">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {`${entry.name}: SAR ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Active shape for pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">{`${value}%`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  // Calculate YTD performance
  const ytdActualRevenue = revenueTrend.reduce((sum, item) => sum + item.actual, 0);
  const ytdProjectedRevenue = revenueTrend.reduce((sum, item) => sum + item.projected, 0);
  const ytdPerformance = ((ytdActualRevenue / ytdProjectedRevenue) * 100).toFixed(1);
  const isPositivePerformance = ytdActualRevenue >= ytdProjectedRevenue;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              YTD Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {(ytdActualRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={isPositivePerformance ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {isPositivePerformance ? "↑" : "↓"} {Math.abs(Number(ytdPerformance) - 100).toFixed(1)}%
              </span> vs target
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {(ytdActualRevenue / 12 / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+8.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Year-over-year
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Revenue per Sqm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR 4,250</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 5.2%</span> from last year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
              <CardDescription>Actual vs projected monthly revenue</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueTrend}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
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
                    tickFormatter={(value) => `${value / 1000000}M`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0', strokeWidth: 1, opacity: 0.6 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    iconType="circle" 
                    iconSize={8}
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 1 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected Revenue" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 1 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue by Outlet</CardTitle>
            <CardDescription>Distribution across locations</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={revenueByOutlet}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {revenueByOutlet.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">YTD Performance</CardTitle>
          <CardDescription>Progress towards annual revenue targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueByOutlet.map((outlet, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{outlet.name}</span>
                  <span className="text-muted-foreground">{80 + Math.floor(Math.random() * 18)}% complete</span>
                </div>
                <Progress value={80 + Math.floor(Math.random() * 18)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
