import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SliderControl from "@/components/scenarios/controls/SliderControl";
import WhatIfMetricCard from "@/components/scenarios/metrics/WhatIfMetricCard";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { 
  Download,
  FileText,
  Printer,
  FileSpreadsheet
} from "lucide-react";

const initialMonthlyRevenueData = [
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

const laborCostByDepartment = [
  { department: "FOH Management", cost: 28000, percentage: 15.9 },
  { department: "FOH Service", cost: 63000, percentage: 33.5 },
  { department: "BOH Management", cost: 15000, percentage: 16.7 },
  { department: "BOH Kitchen", cost: 43500, percentage: 31.5 },
  { department: "BOH Support", cost: 16000, percentage: 4.0 },
];

const pAndLData = [
  { item: "Revenue", amount: 25000000, percentage: 100.0 },
  { item: "Cost of Goods Sold (COGS)", amount: 7500000, percentage: 30.0 },
  { item: "Gross Profit", amount: 17500000, percentage: 70.0 },
  { item: "Operating Expenses", amount: 0, percentage: 0, isHeader: true },
  { item: "Labor Cost", amount: 6000000, percentage: 24.0 },
  { item: "Rent", amount: 2000000, percentage: 8.0 },
  { item: "Utilities", amount: 750000, percentage: 3.0 },
  { item: "Marketing", amount: 500000, percentage: 2.0 },
  { item: "Other Expenses", amount: 1250000, percentage: 5.0 },
  { item: "Total Operating Expenses", amount: 10500000, percentage: 42.0 },
  { item: "Operating Profit", amount: 7000000, percentage: 28.0 },
  { item: "Taxes", amount: 1400000, percentage: 5.6 },
  { item: "Net Profit", amount: 5600000, percentage: 22.4, highlight: true },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#94a3b8", "#ef4444"];

const getBarColor = (entry: any) => {
  if (entry.department?.includes("FOH Management")) return COLORS[0];
  if (entry.department?.includes("FOH Service")) return COLORS[1];
  if (entry.department?.includes("BOH Management")) return COLORS[2];
  if (entry.department?.includes("BOH Kitchen")) return COLORS[3];
  return COLORS[4];
};

const formatIndianStyle = (value: number): string => {
  if (value < 1000) return value.toString();
  
  let result = "";
  let str = Math.floor(value).toString();
  
  const lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  
  result = lastThree;
  
  if (remaining.length > 0) {
    let i = remaining.length;
    while (i > 0) {
      const segment = remaining.substring(Math.max(0, i - 2), i);
      result = segment + (result.length > 0 ? "," + result : result);
      i -= 2;
    }
  }
  
  return result;
};

const FinancialImpact = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("revenue-vs-labor");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");
  const [selectedScenario, setSelectedScenario] = useState("current-operation");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("monthly");

  const [averageCheck, setAverageCheck] = useState(135);
  const [seatingCapacity, setSeatingCapacity] = useState(135);
  const [turnoverRate, setTurnoverRate] = useState(3.0);
  const [occupancyRate, setOccupancyRate] = useState(73);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);

  const [monthlyRevenueData, setMonthlyRevenueData] = useState(initialMonthlyRevenueData);
  const [totalBaseline, setTotalBaseline] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const newData = initialMonthlyRevenueData.map(item => {
      const capacityFactor = seatingCapacity / 135;
      const turnoverFactor = turnoverRate / 3.0;
      const occupancyFactor = occupancyRate / 73;
      const checkFactor = averageCheck / 135;
      const seasonalityFactor = includeSeasonality
        ? getSeasonalFactor(item.month)
        : 1.0;
      
      let projected = item.baseline * capacityFactor * turnoverFactor * 
                      occupancyFactor * checkFactor * seasonalityFactor;
      
      projected = Math.round(projected / 1000) * 1000;
      
      return {
        ...item,
        projected
      };
    });
    
    setMonthlyRevenueData(newData);
    
    const newBaseline = newData.reduce((sum, item) => sum + item.baseline, 0);
    const newProjected = newData.reduce((sum, item) => sum + item.projected, 0);
    const newPercentageChange = ((newProjected - newBaseline) / newBaseline) * 100;
    
    setTotalBaseline(newBaseline);
    setTotalProjected(newProjected);
    setPercentageChange(newPercentageChange);
  }, [averageCheck, seatingCapacity, turnoverRate, occupancyRate, includeSeasonality]);

  const getSeasonalFactor = (month: string): number => {
    const seasonalFactors: Record<string, number> = {
      'Jan': 0.95, 'Feb': 0.97, 'Mar': 1.0, 'Apr': 1.02,
      'May': 1.03, 'Jun': 1.05, 'Jul': 1.07, 'Aug': 1.05,
      'Sep': 1.0, 'Oct': 0.98, 'Nov': 1.02, 'Dec': 1.1
    };
    
    return seasonalFactors[month] || 1.0;
  };

  const recalculateProjections = () => {
    toast({
      title: "Projections Recalculated",
      description: "Your revenue projections have been updated based on the new parameters."
    });
  };

  const formatSAR = (value: number) => {
    return `SAR ${formatIndianStyle(value)}`;
  };

  const handleExport = (type: string) => {
    toast({
      title: `Exported as ${type.toUpperCase()}`,
      description: "Your financial report has been exported."
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Impact</h1>
        <div className="flex gap-4">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-brands">All Brands</SelectItem>
              <SelectItem value="white-robata">White Robata</SelectItem>
              <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
              <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-outlets">All Outlets</SelectItem>
              <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
              <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
              <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-operation">Current Operation</SelectItem>
              <SelectItem value="optimized-staffing">Optimized Staffing</SelectItem>
              <SelectItem value="ramadan-schedule">Ramadan Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Annual Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatSAR(totalBaseline)}</div>
            <p className="text-xs text-muted-foreground">
              Based on 12-month projection
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Annual Labor Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatSAR(totalBaseline * 0.238)}</div>
            <p className="text-xs text-muted-foreground">
              Total staff cost for 12 months
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Labor % of Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.8%</div>
            <p className="text-xs text-muted-foreground">
              Industry benchmark: 25-30%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Cost per Seat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {Math.round((totalBaseline * 0.238 / 12) / seatingCapacity).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Based on {seatingCapacity} seats
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="revenue-vs-labor">Revenue vs. Labor</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="revenue-projections">Revenue Projections</TabsTrigger>
          <TabsTrigger value="pl-integration">P&L Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue-vs-labor">
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
        </TabsContent>
        
        <TabsContent value="cost-breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Labor Cost Breakdown by Department</CardTitle>
              <CardDescription>Distribution of labor costs across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={laborCostByDepartment}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="cost" 
                      name="Monthly Cost (SAR)" 
                      fill="#3b82f6"
                      stroke="#3b82f6"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Monthly Cost (SAR)</TableHead>
                    <TableHead>% of Total Labor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laborCostByDepartment.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell>{dept.department}</TableCell>
                      <TableCell>{dept.cost.toLocaleString()}</TableCell>
                      <TableCell>{dept.percentage}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {laborCostByDepartment
                        .reduce((sum, dept) => sum + dept.cost, 0)
                        .toLocaleString()}
                    </TableCell>
                    <TableCell>100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue-projections">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projections</CardTitle>
              <CardDescription>Project revenue based on varying scenarios and operational parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Staffing Scenario</Label>
                    <Select defaultValue="optimized-staffing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optimized-staffing">Optimized Staffing</SelectItem>
                        <SelectItem value="current-staffing">Current Staffing</SelectItem>
                        <SelectItem value="minimum-staffing">Minimum Staffing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <SliderControl
                    label="Average Check (SAR)"
                    value={averageCheck}
                    onChange={(values) => setAverageCheck(values[0])}
                    description="Average check amount per customer"
                    min={80}
                    max={200}
                  />

                  <SliderControl
                    label="Seating Capacity"
                    value={seatingCapacity}
                    onChange={(values) => setSeatingCapacity(values[0])}
                    description="Total number of seats available"
                    min={60}
                    max={200}
                  />

                  <SliderControl
                    label="Turnover Rate (per day)"
                    value={turnoverRate}
                    min={1}
                    max={5}
                    step={0.1}
                    onChange={(values) => setTurnoverRate(values[0])}
                    description="Average table turnover rate per day"
                  />

                  <SliderControl
                    label="Occupancy Rate (%)"
                    value={occupancyRate}
                    min={40}
                    max={100}
                    onChange={(values) => setOccupancyRate(values[0])}
                    description="Average seat occupancy percentage"
                  />

                  <div className="flex items-center space-x-2 pt-3">
                    <Switch
                      id="seasonality"
                      checked={includeSeasonality}
                      onCheckedChange={setIncludeSeasonality}
                    />
                    <Label htmlFor="seasonality">Include Seasonality Effects</Label>
                  </div>

                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800" 
                    onClick={recalculateProjections}
                  >
                    Recalculate Projections
                  </Button>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyRevenueData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 1400000]} />
                        <Tooltip formatter={(value) => [`${(value as number).toLocaleString()}`, 'Revenue']} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="baseline"
                          name="Baseline"
                          stroke="#8884d8"
                          strokeDasharray="3 3"
                        />
                        <Line
                          type="monotone"
                          dataKey="projected"
                          name="Projected"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WhatIfMetricCard 
                      title="Annual Baseline" 
                      value={formatSAR(totalBaseline)}
                    />
                    
                    <WhatIfMetricCard 
                      title="Annual Projected" 
                      value={formatSAR(totalProjected)}
                      change={`+${formatIndianStyle(totalProjected - totalBaseline)} (${percentageChange.toFixed(1)}%)`}
                    />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Baseline (SAR)</TableHead>
                        <TableHead className="text-right">Projected (SAR)</TableHead>
                        <TableHead className="text-right">Difference (SAR)</TableHead>
                        <TableHead className="text-right">Change (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyRevenueData.map((item) => {
                        const difference = item.projected - item.baseline;
                        const change = (difference / item.baseline) * 100;
                        const formattedChange = change.toFixed(1);
                        
                        return (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell className="text-right">{item.baseline.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{item.projected.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-green-500">
                              +{difference.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-green-500">
                              +{formattedChange}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pl-integration">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profit & Loss Integration</CardTitle>
                  <CardDescription>Financial impact of staff adjustments on P&L</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon" onClick={() => handleExport("pdf")}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleExport("excel")}>
                    <FileSpreadsheet className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Amount (SAR)</TableHead>
                    <TableHead className="text-right">% of Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pAndLData.map((item, index) => (
                    <TableRow 
                      key={index} 
                      className={`
                        ${item.isHeader ? 'font-bold bg-muted' : ''}
                        ${item.highlight ? 'bg-green-50 font-bold' : ''}
                      `}
                    >
                      <TableCell>{item.item}</TableCell>
                      <TableCell className="text-right">
                        {item.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialImpact;
