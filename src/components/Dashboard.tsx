
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Settings,
  ChevronRight
} from "lucide-react";
import { mockOutlets, mockBrands, mockLocations } from "@/services/mockData";
import { PageLayout } from "@/components/ui/page-layout";
import { FilterBar } from "@/components/ui/filter-bar";
import { MetricCard } from "@/components/ui/metric-card";
import { ChartContainer } from "@/components/ui/chart-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data for charts and metrics
const staffDistribution = [
  { name: "Kitchen Staff", value: 40, color: "#22c55e" },
  { name: "Service Staff", value: 29, color: "#3b82f6" },
  { name: "Management", value: 11, color: "#8b5cf6" },
  { name: "Cleaning", value: 13, color: "#a855f7" },
  { name: "Security", value: 7, color: "#ec4899" }
];

const laborCostTrend = [
  { month: "Jan", revenue: 100000, laborCost: 28000, laborPercentage: 28 },
  { month: "Feb", revenue: 110000, laborCost: 29500, laborPercentage: 26.8 },
  { month: "Mar", revenue: 115000, laborCost: 30000, laborPercentage: 26.1 },
  { month: "Apr", revenue: 120000, laborCost: 31000, laborPercentage: 25.8 },
  { month: "May", revenue: 125000, laborCost: 32500, laborPercentage: 26 },
  { month: "Jun", revenue: 135000, laborCost: 33000, laborPercentage: 24.4 },
  { month: "Jul", revenue: 130000, laborCost: 32000, laborPercentage: 24.6 },
  { month: "Aug", revenue: 125000, laborCost: 31000, laborPercentage: 24.8 },
  { month: "Sep", revenue: 120000, laborCost: 30000, laborPercentage: 25 },
  { month: "Oct", revenue: 125000, laborCost: 31000, laborPercentage: 24.8 },
  { month: "Nov", revenue: 130000, laborCost: 32000, laborPercentage: 24.6 },
  { month: "Dec", revenue: 140000, laborCost: 35000, laborPercentage: 25 }
];

const revenueTrend = [
  { month: "Jan", actual: 2400000, projected: 2350000 },
  { month: "Feb", actual: 2450000, projected: 2400000 },
  { month: "Mar", actual: 2500000, projected: 2450000 },
  { month: "Apr", actual: 2550000, projected: 2500000 },
  { month: "May", actual: 2600000, projected: 2550000 },
  { month: "Jun", actual: 2700000, projected: 2600000 },
  { month: "Jul", actual: 2650000, projected: 2700000 },
  { month: "Aug", actual: 2600000, projected: 2650000 },
  { month: "Sep", actual: 2550000, projected: 2600000 },
  { month: "Oct", actual: 2600000, projected: 2550000 },
  { month: "Nov", actual: 2650000, projected: 2600000 },
  { month: "Dec", actual: 2800000, projected: 2700000 }
];

const revenueByOutlet = [
  { name: "Mall of Dhahran", value: 25, color: "#10b981" },
  { name: "Riyadh Park", value: 22, color: "#3b82f6" },
  { name: "Jeddah Corniche", value: 20, color: "#8b5cf6" },
  { name: "Al Nakheel Mall", value: 17, color: "#6366f1" },
  { name: "Red Sea Mall", value: 16, color: "#ec4899" }
];

const laborCostByPosition = [
  { position: "Servers", cost: 120000 },
  { position: "Chefs", cost: 90000 },
  { position: "Line Cooks", cost: 100000 },
  { position: "Managers", cost: 70000 },
  { position: "Hosts", cost: 50000 },
  { position: "Bartenders", cost: 40000 },
  { position: "Dishwashers", cost: 60000 },
  { position: "Others", cost: 70000 }
];

const benchmarkData = [
  { metric: "Covers per Labor Hour", current: 4.7, industry: 5.5 },
  { metric: "Revenue per Labor Hour", current: 600, industry: 650 },
  { metric: "Labor Utilization", current: 80, industry: 85 },
  { metric: "Turnover Time", current: 75, industry: 65 },
  { metric: "Staff Retention", current: 70, industry: 75 },
  { metric: "Customer Satisfaction", current: 88, industry: 90 }
];

const radarData = [
  { subject: 'Covers per Labor Hour', A: 4.7, B: 5.5, fullMark: 7 },
  { subject: 'Revenue per Labor Hour', A: 600, B: 650, fullMark: 800 },
  { subject: 'Labor Utilization', A: 80, B: 85, fullMark: 100 },
  { subject: 'Turnover Time', A: 75, B: 65, fullMark: 100 },
  { subject: 'Staff Retention', A: 70, B: 75, fullMark: 100 },
  { subject: 'Customer Satisfaction', A: 88, B: 90, fullMark: 100 },
];

const outletComparison = [
  { name: "Mall of Dhahran", covers: 4.7 },
  { name: "Riyadh Park", covers: 4.5 },
  { name: "Al Nakheel Mall", covers: 4.3 },
  { name: "Red Sea Mall", covers: 4.1 }
];

const staffBreakdown = {
  foh: [
    { position: "Servers", count: 42 },
    { position: "Hosts/Hostesses", count: 12 },
    { position: "Bartenders", count: 8 },
    { position: "Cashiers", count: 10 },
    { position: "Managers", count: 8 }
  ],
  boh: [
    { position: "Chefs", count: 18 },
    { position: "Line Cooks", count: 36 },
    { position: "Prep Cooks", count: 24 },
    { position: "Dishwashers", count: 20 },
    { position: "Kitchen Managers", count: 10 }
  ]
};

// Dashboard component with improved organization
const Dashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const [selectedSection, setSelectedSection] = useState("efficiency");
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const currentLocation = currentOutlet ? mockLocations.find(l => l.id === currentOutlet.locationId) : null;

  const totalFOH = staffBreakdown.foh.reduce((sum, staff) => sum + staff.count, 0);
  const totalBOH = staffBreakdown.boh.reduce((sum, staff) => sum + staff.count, 0);

  return (
    <PageLayout>
      <FilterBar
        title="F&B Manpower Planning Dashboard"
      >
        <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select an outlet" />
          </SelectTrigger>
          <SelectContent>
            {mockOutlets.map(outlet => (
              <SelectItem key={outlet.id} value={outlet.id}>
                {outlet.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </FilterBar>

      {currentOutlet && currentBrand && currentLocation && (
        <>
          <div className="p-6 pt-4">
            <h1 className="text-2xl font-semibold mb-2">Operational Dashboard</h1>
            <p className="text-sm text-muted-foreground mb-6">Overview of your F&B operations and staffing metrics</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Staff"
                value="247"
                icon={<Users className="h-5 w-5" />}
                trend={{ value: "+2.5% from last month", positive: true }}
                description="Across all outlets"
              />

              <MetricCard
                title="Labor Cost"
                value="24.3%"
                icon={<DollarSign className="h-5 w-5" />}
                trend={{ value: "-0.8% from last month", positive: true }}
                description="% of Revenue"
              />

              <MetricCard
                title="Covers per Labor Hour"
                value="4.7"
                icon={<TrendingUp className="h-5 w-5" />}
                trend={{ value: "+0.3 from last month", positive: true }}
                description="Efficiency metric"
              />

              <MetricCard
                title="Revenue per sqm"
                value="SAR 4,250"
                icon={<Clock className="h-5 w-5" />}
                trend={{ value: "+5.2% from last month", positive: true }}
                description="Space efficiency"
              />
            </div>

            <Tabs value={selectedSection} onValueChange={setSelectedSection} className="mt-6">
              <TabsList className="bg-muted/40 mb-6">
                <TabsTrigger value="staffing">Staffing Structure</TabsTrigger>
                <TabsTrigger value="labor">Labor Cost</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Projections</TabsTrigger>
              </TabsList>

              <TabsContent value="staffing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Distribution by Department</CardTitle>
                    <CardDescription>Breakdown of staff across departments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={staffDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={110}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}%`}
                            >
                              {staffDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Staff Breakdown by Position</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-medium mb-2">Front of House (FOH)</h4>
                            <div className="space-y-2">
                              {staffBreakdown.foh.map((position) => (
                                <div key={position.position} className="flex justify-between">
                                  <span>{position.position}</span>
                                  <span className="font-medium">{position.count}</span>
                                </div>
                              ))}
                              <div className="flex justify-between font-bold border-t pt-2">
                                <span>Total FOH</span>
                                <span>{totalFOH}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Back of House (BOH)</h4>
                            <div className="space-y-2">
                              {staffBreakdown.boh.map((position) => (
                                <div key={position.position} className="flex justify-between">
                                  <span>{position.position}</span>
                                  <span className="font-medium">{position.count}</span>
                                </div>
                              ))}
                              <div className="flex justify-between font-bold border-t pt-2">
                                <span>Total BOH</span>
                                <span>{totalBOH}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="labor" className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <Card>
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
              </TabsContent>

              <TabsContent value="efficiency" className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              </TabsContent>

              <TabsContent value="revenue" className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </TabsContent>
            </Tabs>
          </div>

          <div className="px-6 pb-6 flex gap-4 justify-center">
            <Link to="/control-panel">
              <Button>
                Adjust Parameters
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/scenarios">
              <Button variant="outline">
                Manage Scenarios
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Dashboard;
