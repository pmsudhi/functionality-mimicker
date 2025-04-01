
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPositions, mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { calculateMonthlyRevenue } from "@/services/calculationService";
import { DollarSign, TrendingUp, TrendingDown, BarChart, BarChart2 } from "lucide-react";

const FinancialImpact = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  
  // Find the selected scenario and related data
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  const outlet = scenario ? mockOutlets.find(o => o.id === scenario.outletId) : null;
  const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
  
  // Calculate monthly revenue if scenario exists
  const monthlyRevenue = scenario 
    ? calculateMonthlyRevenue(
        scenario.spaceParameters, 
        scenario.revenueParameters, 
        scenario.operationalParameters
      )
    : 0;
  
  // Group positions by category and calculate costs
  const positionsByCategory = mockPositions.reduce((acc, position) => {
    if (!acc[position.category]) {
      acc[position.category] = [];
    }
    acc[position.category].push(position);
    return acc;
  }, {} as Record<string, typeof mockPositions>);
  
  // Calculate costs by category
  const calculateCostByCategory = (category: string) => {
    if (!scenario) return 0;
    
    return scenario.staffingRequirements
      .filter(req => {
        const position = mockPositions.find(p => p.id === req.positionId);
        return position?.category === category;
      })
      .reduce((sum, req) => {
        const position = mockPositions.find(p => p.id === req.positionId);
        if (!position) return sum;
        const baseCost = position.baseSalary + position.variablePay + position.benefits;
        const additionalCosts = position.trainingCost + position.recruitmentCost * position.turnoverRate + position.mealCost;
        return sum + (baseCost + additionalCosts) * req.count;
      }, 0);
  };
  
  // Calculate monthly P&L
  const laborCost = scenario ? scenario.calculations.laborCost : 0;
  const laborCostPercentage = scenario ? scenario.calculations.laborCostPercentage : 0;
  
  // Assume other costs based on industry averages
  const foodCostPercentage = 30;
  const foodCost = monthlyRevenue * (foodCostPercentage / 100);
  
  const rentPercentage = 8;
  const rentCost = monthlyRevenue * (rentPercentage / 100);
  
  const utilitiesPercentage = 5;
  const utilitiesCost = monthlyRevenue * (utilitiesPercentage / 100);
  
  const marketingPercentage = 3;
  const marketingCost = monthlyRevenue * (marketingPercentage / 100);
  
  const otherPercentage = 10;
  const otherCost = monthlyRevenue * (otherPercentage / 100);
  
  const totalCosts = laborCost + foodCost + rentCost + utilitiesCost + marketingCost + otherCost;
  const profit = monthlyRevenue - totalCosts;
  const profitPercentage = (profit / monthlyRevenue) * 100;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Financial Impact</h2>
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Labor Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario ? scenario.calculations.laborCost.toLocaleString() : "--"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {laborCostPercentage.toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {profit.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {profitPercentage.toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {profitPercentage > 15 ? (
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="text-2xl font-bold">
                {profitPercentage > 15 ? "Good" : "Needs Attention"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly P&L Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% of Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Revenue</TableCell>
                  <TableCell className="text-right">{monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">100.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Food Cost</TableCell>
                  <TableCell className="text-right">({foodCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{foodCostPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Labor Cost</TableCell>
                  <TableCell className="text-right">({laborCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{laborCostPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rent</TableCell>
                  <TableCell className="text-right">({rentCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{rentPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Utilities</TableCell>
                  <TableCell className="text-right">({utilitiesCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{utilitiesPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Marketing</TableCell>
                  <TableCell className="text-right">({marketingCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{marketingPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Other Expenses</TableCell>
                  <TableCell className="text-right">({otherCost.toLocaleString()})</TableCell>
                  <TableCell className="text-right">{otherPercentage.toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Total Expenses</TableCell>
                  <TableCell className="text-right">({totalCosts.toLocaleString()})</TableCell>
                  <TableCell className="text-right">
                    {((totalCosts / monthlyRevenue) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Net Profit</TableCell>
                  <TableCell className="font-bold text-right">{profit.toLocaleString()}</TableCell>
                  <TableCell className="font-bold text-right">{profitPercentage.toFixed(1)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Labor Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
              <p className="text-muted-foreground">Labor cost breakdown chart</p>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">% of Labor Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["FOH", "BOH", "Management"].map(category => {
                  const categoryCost = calculateCostByCategory(category);
                  const categoryPercentage = (categoryCost / laborCost) * 100;
                  
                  return (
                    <TableRow key={category}>
                      <TableCell className="font-medium">{category}</TableCell>
                      <TableCell className="text-right">{categoryCost.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{categoryPercentage.toFixed(1)}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Labor Cost Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label className="mb-2 block">Adjust Labor Cost to see impact on profit</Label>
            <div className="flex items-center space-x-4">
              <Slider 
                defaultValue={[laborCostPercentage]} 
                min={15} 
                max={40} 
                step={0.5}
                className="flex-1" 
              />
              <span className="w-12 text-right font-medium">{laborCostPercentage.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Benchmark Comparison</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Industry Average ({brand?.serviceStyle})</span>
                    <span>
                      {brand?.serviceStyle === "Fast Casual" ? "25.0%" : 
                       brand?.serviceStyle === "Casual Dining" ? "28.0%" : "30.0%"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        laborCostPercentage > (brand?.serviceStyle === "Fast Casual" ? 25 : 
                                             brand?.serviceStyle === "Casual Dining" ? 28 : 30) 
                          ? "bg-red-500" 
                          : "bg-green-500"
                      }`}
                      style={{ 
                        width: `${
                          (laborCostPercentage / (brand?.serviceStyle === "Fast Casual" ? 25 : 
                                                brand?.serviceStyle === "Casual Dining" ? 28 : 30)) * 100
                        }%` 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Top Performers ({brand?.serviceStyle})</span>
                    <span>
                      {brand?.serviceStyle === "Fast Casual" ? "22.0%" : 
                       brand?.serviceStyle === "Casual Dining" ? "25.0%" : "27.0%"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        laborCostPercentage > (brand?.serviceStyle === "Fast Casual" ? 22 : 
                                             brand?.serviceStyle === "Casual Dining" ? 25 : 27) 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                      }`}
                      style={{ 
                        width: `${
                          (laborCostPercentage / (brand?.serviceStyle === "Fast Casual" ? 22 : 
                                                brand?.serviceStyle === "Casual Dining" ? 25 : 27)) * 100
                        }%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Optimization Opportunities</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded mr-2 flex-shrink-0">
                    <BarChart2 className="h-4 w-4" />
                  </span>
                  <span>Increasing server coverage from {scenario?.serviceParameters.coversPerWaiter} to {(scenario?.serviceParameters.coversPerWaiter || 0) + 4} covers could reduce labor cost by approximately 2.3%</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded mr-2 flex-shrink-0">
                    <BarChart className="h-4 w-4" />
                  </span>
                  <span>Reducing runner to waiter ratio from {scenario?.serviceParameters.runnerToWaiterRatio}% to {Math.max(25, (scenario?.serviceParameters.runnerToWaiterRatio || 50) - 25)}% could save approximately 1.8% in labor costs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary p-1 rounded mr-2 flex-shrink-0">
                    <BarChart2 className="h-4 w-4" />
                  </span>
                  <span>Cross-training BOH staff could increase efficiency by approximately 5% and reduce overall staffing needs</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialImpact;
