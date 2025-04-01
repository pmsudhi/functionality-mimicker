import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

// Sample data
const monthlyRevenueData = [
  { month: "Jan", revenue: 650000, labor: 150000 },
  { month: "Feb", revenue: 680000, labor: 155000 },
  { month: "Mar", revenue: 710000, labor: 160000 },
  { month: "Apr", revenue: 740000, labor: 165000 },
  { month: "May", revenue: 770000, labor: 170000 },
  { month: "Jun", revenue: 800000, labor: 175000 },
  { month: "Jul", revenue: 830000, labor: 180000 },
  { month: "Aug", revenue: 820000, labor: 178000 },
  { month: "Sep", revenue: 780000, labor: 172000 },
  { month: "Oct", revenue: 790000, labor: 175000 },
  { month: "Nov", revenue: 810000, labor: 177000 },
  { month: "Dec", revenue: 900000, labor: 185000 },
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

// Define a proper function to get bar color
const getBarColor = (entry: any) => {
  if (entry.department?.includes("FOH Management")) return COLORS[0];
  if (entry.department?.includes("FOH Service")) return COLORS[1];
  if (entry.department?.includes("BOH Management")) return COLORS[2];
  if (entry.department?.includes("BOH Kitchen")) return COLORS[3];
  return COLORS[4];
};

const FinancialImpact = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("revenue-vs-labor");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");
  const [selectedScenario, setSelectedScenario] = useState("current-operation");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("monthly");

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
            <div className="text-2xl font-bold">SAR 92,10,000</div>
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
            <div className="text-2xl font-bold">SAR 21,90,400</div>
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
            <div className="text-2xl font-bold">SAR 1521</div>
            <p className="text-xs text-muted-foreground">
              Based on 120 seats
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
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="labor"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyRevenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          name="Baseline"
                          stroke="#3b82f6"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="labor"
                          name="Projected"
                          stroke="#22c55e"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">SAR 92,10,000</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Annual Projected</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">SAR 1,02,05,000</div>
                      <p className="text-sm text-green-500">+10.8% increase</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Baseline (SAR)</TableHead>
                    <TableHead>Projected (SAR)</TableHead>
                    <TableHead>Difference (SAR)</TableHead>
                    <TableHead>Change (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyRevenueData.map((data) => (
                    <TableRow key={data.month}>
                      <TableCell>{data.month}</TableCell>
                      <TableCell>{data.revenue.toLocaleString()}</TableCell>
                      <TableCell>{(data.revenue * 1.1).toLocaleString()}</TableCell>
                      <TableCell>{(data.revenue * 0.1).toLocaleString()}</TableCell>
                      <TableCell className="text-green-500">+10%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {monthlyRevenueData
                        .reduce((sum, data) => sum + data.revenue, 0)
                        .toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {monthlyRevenueData
                        .reduce((sum, data) => sum + data.revenue * 1.1, 0)
                        .toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {monthlyRevenueData
                        .reduce((sum, data) => sum + data.revenue * 0.1, 0)
                        .toLocaleString()}
                    </TableCell>
                    <TableCell className="text-green-500">+10%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
