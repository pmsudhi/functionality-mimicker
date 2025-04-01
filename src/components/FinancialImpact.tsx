
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, Line, Area, AreaChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { mockOutlets, mockBrands, createSampleScenario } from "@/services/mockData";
import { calculateMonthlyRevenue, calculateTotalLaborCost } from "@/services/calculationService";

// Sample financial data
const financialTrend = [
  { month: "Jan", revenue: 520000, laborCost: 135200, costPercentage: 26 },
  { month: "Feb", revenue: 540000, laborCost: 140400, costPercentage: 26 },
  { month: "Mar", revenue: 585000, laborCost: 146250, costPercentage: 25 },
  { month: "Apr", revenue: 610000, laborCost: 158600, costPercentage: 26 },
  { month: "May", revenue: 650000, laborCost: 169000, costPercentage: 26 },
  { month: "Jun", revenue: 695000, laborCost: 174000, costPercentage: 25 },
  { month: "Jul", revenue: 710000, laborCost: 184600, costPercentage: 26 },
  { month: "Aug", revenue: 730000, laborCost: 186900, costPercentage: 25.6 },
];

const costBreakdown = [
  { category: "Base Salary", value: 56 },
  { category: "Variable Pay", value: 12 },
  { category: "Benefits", value: 18 },
  { category: "Training", value: 6 },
  { category: "Recruitment", value: 5 },
  { category: "Meals", value: 3 },
];

const departmentCost = [
  { department: "FOH", value: 42 },
  { department: "BOH", value: 38 },
  { department: "Management", value: 20 },
];

const benchmarks = {
  "Fast Casual": { min: 22, target: 25, max: 28 },
  "Casual Dining": { min: 25, target: 28, max: 32 },
  "Premium Dining": { min: 30, target: 33, max: 36 },
};

const FinancialImpact = () => {
  const navigate = useNavigate();
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const serviceStyle = currentBrand?.serviceStyle || "Casual Dining";
  
  // Get the scenario for this outlet
  const scenario = createSampleScenario(selectedOutlet);
  
  // Calculate financial metrics
  const monthlyRevenue = calculateMonthlyRevenue(
    scenario.spaceParameters,
    scenario.revenueParameters,
    scenario.operationalParameters
  );
  
  const laborCost = calculateTotalLaborCost(scenario.staffingRequirements);
  const laborCostPercentage = (laborCost / monthlyRevenue) * 100;
  
  // Get industry benchmarks for this service style
  const benchmark = benchmarks[serviceStyle];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Financial Impact</h1>
        </div>
        
        <div className="flex items-center gap-4">
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
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Financial Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(monthlyRevenue)}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>Projected from capacity and spending</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Labor Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatCurrency(laborCost)}</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <DollarSign className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Total monthly labor expense</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Labor Cost %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{laborCostPercentage.toFixed(1)}%</div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  {laborCostPercentage > benchmark.max ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">Above target ({benchmark.target}%)</span>
                    </>
                  ) : laborCostPercentage < benchmark.min ? (
                    <>
                      <TrendingDown className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-500">Below target ({benchmark.target}%)</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Within target range</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue vs. Labor Cost Trend</CardTitle>
                <CardDescription>
                  Monthly revenue and labor cost with percentage trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={financialTrend}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 50]} />
                      <Tooltip formatter={(value, name) => {
                        if (name === "costPercentage") return [`${value}%`, "Labor Cost %"];
                        return [formatCurrency(value as number), name === "revenue" ? "Revenue" : "Labor Cost"];
                      }} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="left" type="monotone" dataKey="laborCost" name="Labor Cost" stroke="#82ca9d" />
                      <Line yAxisId="right" type="monotone" dataKey="costPercentage" name="Labor Cost %" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Cost Distribution</CardTitle>
                <CardDescription>Percentage of labor cost by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentCost}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="department" />
                      <Tooltip formatter={(value) => [`${value}%`, "of total labor cost"]} />
                      <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Labor Cost Breakdown</CardTitle>
                <CardDescription>Distribution of labor costs by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costBreakdown}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, "of total labor cost"]} />
                      <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cost per Seat Analysis</CardTitle>
                <CardDescription>Monthly labor cost per seat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-7xl font-bold text-primary">
                      {formatCurrency(laborCost / (scenario.spaceParameters.totalCapacity || 100))}
                    </div>
                    <div className="text-lg text-muted-foreground mt-4">Per Seat Monthly</div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
                      <div className="text-center">
                        <div className="text-xl font-semibold">{formatCurrency(laborCost / (scenario.spaceParameters.totalCapacity || 100) / 30)}</div>
                        <div className="text-xs text-muted-foreground">Daily</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">{formatCurrency(laborCost / (scenario.spaceParameters.totalCapacity || 100) / 4)}</div>
                        <div className="text-xs text-muted-foreground">Weekly</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">{formatCurrency(laborCost / (scenario.spaceParameters.totalCapacity || 100) * 12)}</div>
                        <div className="text-xs text-muted-foreground">Yearly</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Industry Benchmark Comparison</CardTitle>
                <CardDescription>Labor cost percentage compared to industry standards for {serviceStyle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Current", value: laborCostPercentage },
                        { name: "Min Benchmark", value: benchmark.min },
                        { name: "Target Benchmark", value: benchmark.target },
                        { name: "Max Benchmark", value: benchmark.max }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 40]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Labor Cost Percentage"]} />
                      <Bar dataKey="value" name="Percentage" fill={(data) => {
                        const value = data.value as number;
                        if (data.name === "Current") {
                          if (value > benchmark.max) return "#ef4444";
                          if (value < benchmark.min) return "#f59e0b";
                          return "#22c55e";
                        }
                        if (data.name === "Target Benchmark") return "#3b82f6";
                        return "#94a3b8";
                      }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>12-Month Financial Forecast</CardTitle>
              <CardDescription>Projected revenue, labor cost, and cost percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[...financialTrend, 
                      { month: "Sep", revenue: 750000, laborCost: 195000, costPercentage: 26 },
                      { month: "Oct", revenue: 785000, laborCost: 204100, costPercentage: 26 },
                      { month: "Nov", revenue: 820000, laborCost: 213200, costPercentage: 26 },
                      { month: "Dec", revenue: 865000, laborCost: 224900, costPercentage: 26 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => {
                      if (name === "costPercentage") return [`${value}%`, "Labor Cost %"];
                      return [formatCurrency(value as number), name === "revenue" ? "Revenue" : "Labor Cost"];
                    }} />
                    <Legend />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorLaborCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="laborCost" name="Labor Cost" stroke="#82ca9d" fillOpacity={1} fill="url(#colorLaborCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Projections</CardTitle>
                <CardDescription>Quarterly financial summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">Quarter</th>
                        <th className="text-right font-medium p-2">Revenue</th>
                        <th className="text-right font-medium p-2">Labor Cost</th>
                        <th className="text-right font-medium p-2">Labor %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Q1</td>
                        <td className="text-right p-2">{formatCurrency(1645000)}</td>
                        <td className="text-right p-2">{formatCurrency(421850)}</td>
                        <td className="text-right p-2">25.6%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Q2</td>
                        <td className="text-right p-2">{formatCurrency(1955000)}</td>
                        <td className="text-right p-2">{formatCurrency(501600)}</td>
                        <td className="text-right p-2">25.7%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Q3</td>
                        <td className="text-right p-2">{formatCurrency(2190000)}</td>
                        <td className="text-right p-2">{formatCurrency(566500)}</td>
                        <td className="text-right p-2">25.9%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Q4</td>
                        <td className="text-right p-2">{formatCurrency(2470000)}</td>
                        <td className="text-right p-2">{formatCurrency(642200)}</td>
                        <td className="text-right p-2">26.0%</td>
                      </tr>
                      <tr className="font-medium">
                        <td className="p-2">Annual</td>
                        <td className="text-right p-2">{formatCurrency(8260000)}</td>
                        <td className="text-right p-2">{formatCurrency(2132150)}</td>
                        <td className="text-right p-2">25.8%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
                <CardDescription>Potential areas for labor cost optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-md">
                    <h3 className="font-medium mb-1">Cross-Training Staff</h3>
                    <p className="text-sm text-muted-foreground">Potential savings of {formatCurrency(laborCost * 0.05)} per month by increasing cross-training capability by 10%.</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-md">
                    <h3 className="font-medium mb-1">Technology Integration</h3>
                    <p className="text-sm text-muted-foreground">Potential savings of {formatCurrency(laborCost * 0.08)} per month through improved POS and kitchen display systems.</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-md">
                    <h3 className="font-medium mb-1">Staff Scheduling Optimization</h3>
                    <p className="text-sm text-muted-foreground">Potential savings of {formatCurrency(laborCost * 0.06)} per month through improved peak hour management.</p>
                  </div>
                  
                  <div className="p-3 bg-green-100 dark:bg-green-950 rounded-md">
                    <h3 className="font-medium mb-1">Total Potential Savings</h3>
                    <p className="text-sm">Up to {formatCurrency(laborCost * 0.19)} per month ({(19).toFixed(1)}% of current labor cost)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialImpact;
