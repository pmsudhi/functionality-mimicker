
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockScenarios, mockOutlets } from "@/services/mockData";
import { calculateMonthlyRevenue } from "@/services/calculationService";
import { DollarSign, TrendingUp, Calendar, Users } from "lucide-react";

const RevenueProjections = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  const [viewType, setViewType] = useState("monthly");
  const [averageCheck, setAverageCheck] = useState<number>(0);
  
  // Find the selected scenario
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  const outlet = scenario ? mockOutlets.find(o => o.id === scenario.outletId) : null;
  
  // Set initial average check when scenario changes
  useState(() => {
    if (scenario) {
      setAverageCheck(scenario.revenueParameters.averageSpendPerGuest);
    }
  });
  
  // Calculate monthly revenue
  const monthlyRevenue = scenario
    ? calculateMonthlyRevenue(
        scenario.spaceParameters,
        scenario.revenueParameters,
        scenario.operationalParameters
      )
    : 0;
  
  // Calculate annual revenue
  const annualRevenue = monthlyRevenue * 12;
  
  // Calculate daily covers
  const dailyCovers = scenario
    ? Math.floor(
        scenario.spaceParameters.totalCapacity *
        (scenario.operationalParameters.weekdayHours.reduce((sum, h) => sum + h, 0) / 5 + 
         scenario.operationalParameters.weekendHours.reduce((sum, h) => sum + h, 0) / 2) * 60 /
        scenario.revenueParameters.tableTurnTime *
        (1 - scenario.revenueParameters.emptySeatsProvision)
      )
    : 0;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Revenue Projections</h2>
        <Select defaultValue={selectedScenario} onValueChange={setSelectedScenario}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a scenario" />
          </SelectTrigger>
          <SelectContent>
            {mockScenarios.map(scenario => {
              const outlet = mockOutlets.find(o => o.id === scenario.outletId);
              return (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name} ({outlet?.name})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {monthlyRevenue.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Projected monthly revenue
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {annualRevenue.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Projected annual revenue
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Covers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {dailyCovers.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average daily customer count
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Average Check</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      value={scenario?.revenueParameters.averageSpendPerGuest || 0}
                      onChange={(e) => setAverageCheck(Number(e.target.value))}
                      className="pl-8" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average spend per guest
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Guest Dwelling Time (min)</Label>
                  <Input 
                    type="number" 
                    value={scenario?.revenueParameters.guestDwellingTime || 0}
                    className="pl-3" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Average time a guest spends at the restaurant
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Table Turn Time (min)</Label>
                  <Input 
                    type="number" 
                    value={scenario?.revenueParameters.tableTurnTime || 0}
                    className="pl-3" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Total time including service and table reset
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Operating Days (per year)</Label>
                  <Input 
                    type="number" 
                    value={scenario?.operationalParameters.operatingDays || 350}
                    className="pl-3" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjusted for Ramadan and holidays
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Total Capacity</Label>
                  <Input 
                    type="number" 
                    value={scenario?.spaceParameters.totalCapacity || 0}
                    className="pl-3"
                    readOnly 
                  />
                  <p className="text-xs text-muted-foreground">
                    Total guest capacity
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Empty Seats Provision</Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      value={scenario?.revenueParameters.emptySeatsProvision ? scenario.revenueParameters.emptySeatsProvision * 100 : 0}
                      className="pl-3 pr-8" 
                    />
                    <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of seats expected to remain empty
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              <TrendingUp className="mr-2 h-4 w-4" />
              Update Revenue Projections
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
              <p className="text-muted-foreground">Revenue breakdown chart</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Food</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "75%" }} />
              </div>
            </div>
            
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-sm">
                <span>Beverages</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "20%" }} />
              </div>
            </div>
            
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-sm">
                <span>Other</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "5%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 border rounded-md overflow-hidden">
        <Tabs defaultValue="monthly" value={viewType} onValueChange={setViewType} className="h-full flex flex-col">
          <div className="border-b">
            <TabsList className="bg-transparent w-auto m-2">
              <TabsTrigger value="monthly">Monthly Projection</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly Analysis</TabsTrigger>
              <TabsTrigger value="annual">Annual Forecast</TabsTrigger>
              <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="monthly" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Projection</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Monthly revenue projection chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Monthly Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Peak Months (Nov-Jan)</span>
                      <span className="font-medium">+15% over average</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ramadan Period</span>
                      <span className="font-medium">-50% capacity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Summer Months (Jun-Aug)</span>
                      <span className="font-medium">-15% over average</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Key Revenue Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Monthly Revenue</span>
                      <span className="font-medium">{monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue per Seat</span>
                      <span className="font-medium">
                        {scenario?.spaceParameters.totalCapacity
                          ? Math.round(monthlyRevenue / scenario.spaceParameters.totalCapacity).toLocaleString()
                          : "--"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue per Square Meter</span>
                      <span className="font-medium">
                        {scenario?.spaceParameters.totalArea
                          ? Math.round(monthlyRevenue / scenario.spaceParameters.totalArea).toLocaleString()
                          : "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="quarterly" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Quarterly revenue analysis chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quarterly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Q1 (Jan-Mar)</span>
                        <span className="font-medium">{(monthlyRevenue * 3 * 0.95).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Q2 (Apr-Jun)</span>
                        <span className="font-medium">{(monthlyRevenue * 3 * 0.9).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Q3 (Jul-Sep)</span>
                        <span className="font-medium">{(monthlyRevenue * 3 * 0.85).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Q4 (Oct-Dec)</span>
                        <span className="font-medium">{(monthlyRevenue * 3 * 1.15).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quarterly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Q1 to Q2 Change</span>
                          <span className="font-medium text-red-500">-5.3%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Q2 to Q3 Change</span>
                          <span className="font-medium text-red-500">-5.6%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Q3 to Q4 Change</span>
                          <span className="font-medium text-green-500">+35.3%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Q4 to Q1 Change</span>
                          <span className="font-medium text-red-500">-17.4%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="annual" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Annual Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Annual revenue forecast chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Annual Projections</h3>
                  <div className="space-y-3 border rounded-md p-4">
                    <div className="flex justify-between text-sm">
                      <span>Annual Revenue</span>
                      <span className="font-medium">{annualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Annual Covers</span>
                      <span className="font-medium">{(dailyCovers * scenario?.operationalParameters.operatingDays || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Check</span>
                      <span className="font-medium">{scenario?.revenueParameters.averageSpendPerGuest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Labor Cost (Annual)</span>
                      <span className="font-medium">{(scenario?.calculations.laborCost * 12 || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Labor Cost %</span>
                      <span className="font-medium">{scenario?.calculations.laborCostPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Three-Year Projection</h3>
                  <div className="space-y-3 border rounded-md p-4">
                    <div className="flex justify-between text-sm">
                      <span>Year 1</span>
                      <span className="font-medium">{annualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Year 2 (5% growth)</span>
                      <span className="font-medium">{(annualRevenue * 1.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Year 3 (8% growth)</span>
                      <span className="font-medium">{(annualRevenue * 1.05 * 1.08).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2">
                      <span>3-Year Total</span>
                      <span>{(annualRevenue + annualRevenue * 1.05 + annualRevenue * 1.05 * 1.08).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scenarios" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>What-If Scenario Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Average Check</Label>
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            value={scenario?.revenueParameters.averageSpendPerGuest || 0}
                            className="pl-8" 
                          />
                        </div>
                        <Button variant="outline" size="sm">+5%</Button>
                        <Button variant="outline" size="sm">+10%</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Table Turn Time (min)</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="number" 
                          value={scenario?.revenueParameters.tableTurnTime || 0}
                          className="flex-1" 
                        />
                        <Button variant="outline" size="sm">-10%</Button>
                        <Button variant="outline" size="sm">-20%</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Operating Days</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="number" 
                          value={scenario?.operationalParameters.operatingDays || 350}
                          className="flex-1" 
                        />
                        <Button variant="outline" size="sm">+5 days</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calculate What-If Scenarios
                  </Button>
                  
                  <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
                    <p className="text-muted-foreground">What-if scenario comparison chart</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Base Case</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Annual Revenue</span>
                            <span className="font-medium">{annualRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Cost %</span>
                            <span className="font-medium">{scenario?.calculations.laborCostPercentage.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Profit Margin</span>
                            <span className="font-medium">18.5%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Price Increase</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Annual Revenue</span>
                            <span className="font-medium text-green-500">{(annualRevenue * 1.1).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Cost %</span>
                            <span className="font-medium text-green-500">{(scenario?.calculations.laborCostPercentage / 1.1).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Profit Margin</span>
                            <span className="font-medium text-green-500">21.2%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Improved Efficiency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Annual Revenue</span>
                            <span className="font-medium text-green-500">{(annualRevenue * 1.05).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Cost %</span>
                            <span className="font-medium text-green-500">{(scenario?.calculations.laborCostPercentage * 0.9).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Profit Margin</span>
                            <span className="font-medium text-green-500">20.8%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default RevenueProjections;
