
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const RevenueProjections = () => {
  // State for control values
  const [selectedScenario, setSelectedScenario] = useState("optimized-staffing");
  const [averageCheck, setAverageCheck] = useState(135);
  const [seatingCapacity, setSeatingCapacity] = useState(135);
  const [turnoverRate, setTurnoverRate] = useState(3.0);
  const [occupancyRate, setOccupancyRate] = useState(73);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);
  
  // State for calculated data
  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", baseline: 650000, projected: 1257252 },
    { month: "Feb", baseline: 680000, projected: 1257252 },
    { month: "Mar", baseline: 720000, projected: 1257252 },
    { month: "Apr", baseline: 700000, projected: 1257252 },
    { month: "May", baseline: 750000, projected: 1257252 },
    { month: "Jun", baseline: 800000, projected: 1257252 },
    { month: "Jul", baseline: 830000, projected: 1257252 },
    { month: "Aug", baseline: 820000, projected: 1257252 },
    { month: "Sep", baseline: 780000, projected: 1257252 },
    { month: "Oct", baseline: 790000, projected: 1257252 },
    { month: "Nov", baseline: 810000, projected: 1257252 },
    { month: "Dec", baseline: 900000, projected: 1257252 }
  ]);
  
  // Calculate totals
  const [totalBaseline, setTotalBaseline] = useState(9210000);
  const [totalProjected, setTotalProjected] = useState(15087024);
  const [percentageChange, setPercentageChange] = useState(63.8);

  // Function to recalculate projections based on parameter changes
  const recalculateProjections = () => {
    // Base monthly revenue calculation
    const monthlyRevenue = seatingCapacity * turnoverRate * occupancyRate / 100 * averageCheck * 30;
    
    // Apply seasonality if enabled
    let newMonthlyData = monthlyData.map((item, index) => {
      let seasonalFactor = 1;
      
      if (includeSeasonality) {
        // Simple seasonality model: summer higher, winter lower
        if (index >= 5 && index <= 7) seasonalFactor = 1.1; // Summer months
        if (index >= 0 && index <= 1 || index === 11) seasonalFactor = 0.9; // Winter months
      }
      
      return {
        ...item,
        projected: Math.round(monthlyRevenue * seasonalFactor)
      };
    });
    
    setMonthlyData(newMonthlyData);
    
    // Update totals
    const newTotalProjected = newMonthlyData.reduce((sum, item) => sum + item.projected, 0);
    setTotalProjected(newTotalProjected);
    
    // Calculate percentage change
    const newPercentageChange = ((newTotalProjected - totalBaseline) / totalBaseline) * 100;
    setPercentageChange(parseFloat(newPercentageChange.toFixed(1)));
  };

  // Effect to recalculate when parameters change
  useEffect(() => {
    recalculateProjections();
  }, [averageCheck, seatingCapacity, turnoverRate, occupancyRate, includeSeasonality]);

  // Format currency
  const formatSAR = (value: number) => {
    // Format like "92,10,000" as shown in the images
    const valueStr = value.toString();
    if (valueStr.length <= 3) return `SAR ${valueStr}`;
    
    const lastThree = valueStr.slice(-3);
    const remaining = valueStr.slice(0, -3);
    
    let formattedValue = lastThree;
    for (let i = remaining.length - 1; i >= 0; i--) {
      if ((remaining.length - i) % 2 === 0 && i !== 0) {
        formattedValue = remaining[i] + "," + formattedValue;
      } else {
        formattedValue = remaining[i] + formattedValue;
      }
    }
    
    return `SAR ${formattedValue}`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="revenue-projections">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue-vs-labor">Revenue vs. Labor</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="revenue-projections">Revenue Projections</TabsTrigger>
          <TabsTrigger value="pl-integration">P&L Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue-projections" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Revenue Projections</CardTitle>
              <p className="text-sm text-muted-foreground">
                Project revenue based on staffing scenarios and operational parameters
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Staffing Scenario</Label>
                    <Select value={selectedScenario} onValueChange={setSelectedScenario}>
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
                  />

                  <SliderControl
                    label="Seating Capacity"
                    value={seatingCapacity}
                    onChange={(values) => setSeatingCapacity(values[0])}
                    description="Total number of seats available"
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
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 1400000]} />
                        <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Revenue']} />
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
                      change={`+${formatSAR(totalProjected - totalBaseline).replace('SAR ', '')} (${percentageChange}%)`}
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
                      {monthlyData.map((item) => {
                        const difference = item.projected - item.baseline;
                        const change = (difference / item.baseline) * 100;
                        const formattedChange = change.toFixed(1);
                        
                        return (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell className="text-right">{item.baseline.toLocaleString().replace(/,/g, ',')}</TableCell>
                            <TableCell className="text-right">{item.projected.toLocaleString().replace(/,/g, ',')}</TableCell>
                            <TableCell className="text-right text-green-500">
                              +{difference.toLocaleString().replace(/,/g, ',')}
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
        
        <TabsContent value="revenue-vs-labor" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs. Labor Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Revenue vs. Labor cost chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost-breakdown" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Cost breakdown chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pl-integration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>P&L Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">P&L integration chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueProjections;
