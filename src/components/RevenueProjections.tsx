
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { mockScenarios } from "@/services/mockData";

const RevenueProjections = () => {
  const [selectedScenario, setSelectedScenario] = useState("optimized-staffing");
  const [averageCheck, setAverageCheck] = useState(120);
  const [seatingCapacity, setSeatingCapacity] = useState(120);
  const [turnoverRate, setTurnoverRate] = useState(2.5);
  const [occupancyRate, setOccupancyRate] = useState(75);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);

  // Monthly data with baseline and projected values
  const monthlyData = [
    { month: "Jan", baseline: 650000, projected: 850500 },
    { month: "Feb", baseline: 680000, projected: 850500 },
    { month: "Mar", baseline: 720000, projected: 850500 },
    { month: "Apr", baseline: 700000, projected: 850500 },
    { month: "May", baseline: 750000, projected: 850500 },
    { month: "Jun", baseline: 800000, projected: 850500 },
    { month: "Jul", baseline: 830000, projected: 850500 },
    { month: "Aug", baseline: 820000, projected: 850500 },
    { month: "Sep", baseline: 780000, projected: 850500 },
    { month: "Oct", baseline: 790000, projected: 850500 },
    { month: "Nov", baseline: 810000, projected: 850500 },
    { month: "Dec", baseline: 900000, projected: 850500 }
  ];

  // Calculate sums for the table footer
  const totalBaseline = monthlyData.reduce((sum, item) => sum + item.baseline, 0);
  const totalProjected = monthlyData.reduce((sum, item) => sum + item.projected, 0);
  const totalDifference = totalProjected - totalBaseline;
  const percentageChange = (totalDifference / totalBaseline) * 100;

  const handleRecalculate = () => {
    // Placeholder for recalculation logic
    console.log("Recalculating projections with new parameters");
  };

  // Format numbers for display
  const formatCurrency = (value) => `SAR ${value.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Revenue Projections</h2>
      </div>
      
      <Tabs defaultValue="revenue-projections">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue-vs-labor">Revenue vs. Labor</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="revenue-projections">Revenue Projections</TabsTrigger>
          <TabsTrigger value="pl-integration">P&L Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue-projections" className="mt-6">
          <Card>
            <CardHeader>
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

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Average Check (SAR)</Label>
                      <span className="text-sm font-medium">{averageCheck}</span>
                    </div>
                    <Slider
                      value={[averageCheck]}
                      min={50}
                      max={200}
                      step={1}
                      onValueChange={(values) => setAverageCheck(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Seating Capacity</Label>
                      <span className="text-sm font-medium">{seatingCapacity}</span>
                    </div>
                    <Slider
                      value={[seatingCapacity]}
                      min={50}
                      max={200}
                      step={1}
                      onValueChange={(values) => setSeatingCapacity(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Turnover Rate (per day)</Label>
                      <span className="text-sm font-medium">{turnoverRate}</span>
                    </div>
                    <Slider
                      value={[turnoverRate]}
                      min={1}
                      max={5}
                      step={0.1}
                      onValueChange={(values) => setTurnoverRate(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Occupancy Rate (%)</Label>
                      <span className="text-sm font-medium">{occupancyRate}%</span>
                    </div>
                    <Slider
                      value={[occupancyRate]}
                      min={50}
                      max={100}
                      step={1}
                      onValueChange={(values) => setOccupancyRate(values[0])}
                    />
                  </div>

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
                    onClick={handleRecalculate}
                  >
                    Recalculate Projections
                  </Button>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="baseline"
                          name="Baseline"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="projected"
                          name="Projected"
                          stroke="#82ca9d"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-background">
                      <CardContent className="pt-6">
                        <div className="text-sm mb-2">Annual Baseline</div>
                        <div className="text-2xl font-bold">SAR 92,10,000</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-background">
                      <CardContent className="pt-6">
                        <div className="text-sm mb-2">Annual Projected</div>
                        <div className="text-2xl font-bold">SAR 1,02,06,000</div>
                        <div className="text-xs text-green-500">+9,96,000 (10.8%)</div>
                      </CardContent>
                    </Card>
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
                        
                        return (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell className="text-right">{item.baseline.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{item.projected.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-green-500">
                              +{difference.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-green-500">
                              +{change.toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow className="font-bold">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">{totalBaseline.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{totalProjected.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-500">
                          +{totalDifference.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-green-500">
                          +{percentageChange.toFixed(1)}%
                        </TableCell>
                      </TableRow>
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
