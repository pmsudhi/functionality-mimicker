import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";
import { 
  FileText, 
  FileSpreadsheet, 
  Printer, 
  Users, 
  ChefHat, 
  Coffee, 
  BarChart4, 
  DollarSign, 
  BadgePercent, 
  Building2 
} from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart";
import { ChartContainer as CustomChartContainer } from "@/components/ui/chart-container";

const staffDistributionData = [
  { name: "Kitchen Staff", value: 40, color: "#22c55e" },
  { name: "Service Staff", value: 29, color: "#3b82f6" },
  { name: "Management", value: 11, color: "#8b5cf6" },
  { name: "Cleaning", value: 13, color: "#a855f7" },
  { name: "Security", value: 7, color: "#ec4899" }
];

const costAnalysisData = [
  { department: "FOH Management", cost: 150000, percentage: 14.3 },
  { department: "FOH Service", cost: 350000, percentage: 33.5 },
  { department: "BOH Management", cost: 175000, percentage: 16.7 },
  { department: "BOH Kitchen", cost: 320000, percentage: 31.5 },
  { department: "BOH Support", cost: 42000, percentage: 4.0 }
];

const staffPositionsData = {
  foh: [
    { position: "Restaurant Manager", count: 5, salary: 12000, cost: 60000 },
    { position: "Assistant Manager", count: 10, salary: 9000, cost: 90000 },
    { position: "Host/Hostess", count: 12, salary: 4500, cost: 54000 },
    { position: "Waiter/Waitress", count: 42, salary: 4000, cost: 168000 },
    { position: "Runner", count: 15, salary: 3500, cost: 52500 },
    { position: "Bartender", count: 8, salary: 5000, cost: 40000 },
    { position: "Cashier", count: 9, salary: 4000, cost: 36000 }
  ],
  boh: [
    { position: "Executive Chef", count: 5, salary: 15000, cost: 75000 },
    { position: "Sous Chef", count: 10, salary: 10000, cost: 100000 },
    { position: "Line Cook", count: 20, salary: 6000, cost: 120000 },
    { position: "Prep Cook", count: 15, salary: 4500, cost: 67500 },
    { position: "Kitchen Helper", count: 8, salary: 3500, cost: 28000 },
    { position: "Dishwasher", count: 20, salary: 3000, cost: 60000 },
    { position: "Kitchen Manager", count: 10, salary: 9000, cost: 90000 }
  ]
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm p-2 border rounded-lg shadow-md">
        <p className="font-medium text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const StaffingStructure = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");
  
  const totalFOH = staffPositionsData.foh.reduce((sum, staff) => sum + staff.count, 0);
  const totalBOH = staffPositionsData.boh.reduce((sum, staff) => sum + staff.count, 0);
  const totalStaff = totalFOH + totalBOH;
  const fohBohRatio = (totalFOH / totalBOH).toFixed(2);
  
  const totalLaborCost = [
    ...staffPositionsData.foh.map(staff => staff.cost),
    ...staffPositionsData.boh.map(staff => staff.cost)
  ].reduce((sum, cost) => sum + cost, 0);
  
  const averageCostPerEmployee = Math.round(totalLaborCost / totalStaff);
  
  const handleExport = (type: string) => {
    console.log(`Exporting as ${type}`);
  };
  
  const chartConfig = {
    monthly_cost: {
      label: "Monthly Cost (SAR)",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Staffing Structure</h1>
          <p className="text-sm text-muted-foreground">Manage and analyze your staff distribution across departments</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select brand" />
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
              <SelectValue placeholder="Select outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-outlets">All Outlets</SelectItem>
              <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
              <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
              <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Staff
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              Across all outlets
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <Building2 className="h-4 w-4 text-green-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                FOH/BOH Ratio
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fohBohRatio}</div>
            <p className="text-xs text-muted-foreground">
              {totalFOH} FOH / {totalBOH} BOH
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-500/10">
                <DollarSign className="h-4 w-4 text-blue-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Labor Cost
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {(totalLaborCost / 1000).toFixed(2)}k</div>
            <p className="text-xs text-muted-foreground">
              Average SAR {averageCostPerEmployee.toLocaleString()} per employee
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-purple-500/10">
                <BadgePercent className="h-4 w-4 text-purple-500" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Labor Cost Percentage
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <p className="text-xs text-muted-foreground">
              Of monthly revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-muted/40 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-2 border-b border-border/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <BarChart4 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold tracking-tight">Staff Distribution by Department</CardTitle>
                  <CardDescription>Breakdown of staff allocation across departments</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={staffDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        paddingAngle={2}
                      >
                        {staffDistributionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="transparent"
                            className="hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                        iconType="circle"
                        iconSize={10}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-4 font-medium bg-primary/5">
                    <BadgePercent className="h-3.5 w-3.5 mr-1 text-primary" />
                    Department Summary
                  </Badge>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Staff Count</TableHead>
                        <TableHead>% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffDistributionData.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                              {dept.name}
                            </div>
                          </TableCell>
                          <TableCell>{Math.round(totalStaff * dept.value / 100)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium">{dept.value}%</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold">
                        <TableCell>Total</TableCell>
                        <TableCell>{totalStaff}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="font-medium">100%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="mt-8">
                <Badge variant="outline" className="mb-4 font-medium bg-primary/5">
                  <Users className="h-3.5 w-3.5 mr-1 text-primary" />
                  Staff Breakdown by Position
                </Badge>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-md bg-blue-500/10">
                        <Coffee className="h-4 w-4 text-blue-500" />
                      </div>
                      <h4 className="font-semibold text-base">Front of House</h4>
                    </div>
                    <div className="space-y-2.5">
                      {staffPositionsData.foh.map((position) => (
                        <div key={position.position} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{position.position}</span>
                          <span className="font-medium text-sm bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-md">{position.count}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold border-t border-border/40 pt-2 mt-3">
                        <span className="text-sm">Total FOH</span>
                        <span className="bg-blue-500/20 text-blue-700 px-2.5 py-0.5 rounded-md">{totalFOH}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-md bg-green-500/10">
                        <ChefHat className="h-4 w-4 text-green-500" />
                      </div>
                      <h4 className="font-semibold text-base">Back of House</h4>
                    </div>
                    <div className="space-y-2.5">
                      {staffPositionsData.boh.map((position) => (
                        <div key={position.position} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{position.position}</span>
                          <span className="font-medium text-sm bg-green-500/10 text-green-600 px-2 py-0.5 rounded-md">{position.count}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold border-t border-border/40 pt-2 mt-3">
                        <span className="text-sm">Total BOH</span>
                        <span className="bg-green-500/20 text-green-700 px-2.5 py-0.5 rounded-md">{totalBOH}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-border/30">
                <span className="font-medium">Total Staff</span>
                <span className="font-bold text-lg">{totalStaff}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="positions">
          <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/30">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold tracking-tight">Position Breakdown</CardTitle>
                    <CardDescription>Detailed staff positions and costs</CardDescription>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleExport("pdf")}>
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleExport("print")}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <Badge variant="outline" className="mb-4 font-medium bg-blue-500/5">
                    <Coffee className="h-3.5 w-3.5 mr-1 text-blue-500" />
                    Front of House (FOH)
                  </Badge>
                  <div className="rounded-lg border border-border/30 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead className="text-right">Count</TableHead>
                          <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                          <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffPositionsData.foh.map((position) => (
                          <TableRow key={position.position}>
                            <TableCell className="font-medium">{position.position}</TableCell>
                            <TableCell className="text-right">{position.count}</TableCell>
                            <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/20">
                          <TableCell className="font-bold">Total FOH</TableCell>
                          <TableCell className="text-right font-bold">{totalFOH}</TableCell>
                          <TableCell className="text-right font-bold">{Math.round(staffPositionsData.foh.reduce((sum, staff) => sum + staff.cost, 0) / totalFOH).toLocaleString()}</TableCell>
                          <TableCell className="text-right font-bold">{staffPositionsData.foh.reduce((sum, staff) => sum + staff.cost, 0).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-4 font-medium bg-green-500/5">
                    <ChefHat className="h-3.5 w-3.5 mr-1 text-green-500" />
                    Back of House (BOH)
                  </Badge>
                  <div className="rounded-lg border border-border/30 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead className="text-right">Count</TableHead>
                          <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                          <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffPositionsData.boh.map((position) => (
                          <TableRow key={position.position}>
                            <TableCell className="font-medium">{position.position}</TableCell>
                            <TableCell className="text-right">{position.count}</TableCell>
                            <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/20">
                          <TableCell className="font-bold">Total BOH</TableCell>
                          <TableCell className="text-right font-bold">{totalBOH}</TableCell>
                          <TableCell className="text-right font-bold">{Math.round(staffPositionsData.boh.reduce((sum, staff) => sum + staff.cost, 0) / totalBOH).toLocaleString()}</TableCell>
                          <TableCell className="text-right font-bold">{staffPositionsData.boh.reduce((sum, staff) => sum + staff.cost, 0).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Total Staff</span>
                      <p className="text-lg font-bold">{totalStaff}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Total Monthly Cost</span>
                      <p className="text-lg font-bold">SAR {totalLaborCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Average Cost per Employee</span>
                      <p className="text-lg font-bold">SAR {averageCostPerEmployee.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost-analysis">
          <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-2 border-b border-border/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold tracking-tight">Labor Cost Analysis</CardTitle>
                  <CardDescription>Cost breakdown by department</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <CustomChartContainer 
                title="Monthly Cost by Department" 
                description="Breakdown of monthly labor costs across different departments"
                className="h-[400px] mb-8"
                contentClassName="pt-4"
              >
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costAnalysisData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barSize={60}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                      <XAxis 
                        dataKey="department" 
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        tickLine={{ stroke: 'var(--border)' }}
                        axisLine={{ stroke: 'var(--border)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        tickLine={{ stroke: 'var(--border)' }}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
                      />
                      <Bar 
                        dataKey="cost" 
                        name="Monthly Cost (SAR)" 
                        fill="var(--color-monthly_cost)"
                        radius={[6, 6, 0, 0]}
                        animationDuration={800}
                      >
                        <LabelList 
                          dataKey="percentage" 
                          position="top" 
                          content={(props: any) => {
                            const { x, y, width, value } = props;
                            return (
                              <g>
                                <text
                                  x={x + width / 2}
                                  y={y - 10}
                                  fill="var(--muted-foreground)"
                                  textAnchor="middle"
                                  fontSize={12}
                                >
                                  {`${value}%`}
                                </text>
                              </g>
                            );
                          }}
                        />
                      </Bar>
                      <ChartLegendContent />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CustomChartContainer>
              
              <div>
                <Badge variant="outline" className="mb-4 font-medium bg-primary/5">
                  <BadgePercent className="h-3.5 w-3.5 mr-1 text-primary" />
                  Cost Summary
                </Badge>
                <div className="rounded-lg border border-border/30 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                        <TableHead className="text-right">% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {costAnalysisData.map((dept) => (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell className="text-right">{dept.cost.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary">{dept.percentage}%</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/20">
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">
                          {costAnalysisData.reduce((sum, dept) => sum + dept.cost, 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge>100%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-primary/10">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm">Labor Cost %</h4>
                    </div>
                    <p className="text-2xl font-bold">24.3%</p>
                    <p className="text-xs text-muted-foreground">Of total revenue</p>
                  </Card>
                  
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-green-500/10">
                        <Users className="h-4 w-4 text-green-500" />
                      </div>
                      <h4 className="font-medium text-sm">Staff Efficiency</h4>
                    </div>
                    <p className="text-2xl font-bold">4.7</p>
                    <p className="text-xs text-muted-foreground">Covers per labor hour</p>
                  </Card>
                  
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-blue-500/10">
                        <Building2 className="h-4 w-4 text-blue-500" />
                      </div>
                      <h4 className="font-medium text-sm">Space Efficiency</h4>
                    </div>
                    <p className="text-2xl font-bold">SAR 4,250</p>
                    <p className="text-xs text-muted-foreground">Revenue per sqm</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffingStructure;
