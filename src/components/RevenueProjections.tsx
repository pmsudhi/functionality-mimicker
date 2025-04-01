
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import SliderControl from "@/components/scenarios/controls/SliderControl";
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
  const [selectedScenario, setSelectedScenario] = useState("optimized-staffing");
  const [averageCheck, setAverageCheck] = useState(135);
  const [seatingCapacity, setSeatingCapacity] = useState(135);
  const [turnoverRate, setTurnoverRate] = useState(3.0);
  const [occupancyRate, setOccupancyRate] = useState(73);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);

  // Monthly data with baseline and projected values based on image
  const monthlyData = [
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
  ];

  // Calculate sums for the table footer
  const totalBaseline = 9210000; // From image: SAR 92,10,000
  const totalProjected = 15087024; // From image: SAR 1,50,87,024
  const totalDifference = totalProjected - totalBaseline;
  const percentageChange = 63.8; // From image: 63.8%

  const handleRecalculate = () => {
    // Placeholder for recalculation logic
    console.log("Recalculating projections with new parameters");
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
                    onChange={(values) => setTurnoverRate(values[0])}
                    description="Average table turnover rate per day"
                  />

                  <SliderControl
                    label="Occupancy Rate (%)"
                    value={occupancyRate}
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
                    onClick={handleRecalculate}
                  >
                    Recalculate Projections
                  </Button>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 1400000]} />
                        <Tooltip />
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
                    <Card className="bg-background">
                      <CardContent className="pt-6">
                        <div className="text-sm mb-2">Annual Baseline</div>
                        <div className="text-2xl font-bold">SAR 92,10,000</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-background">
                      <CardContent className="pt-6">
                        <div className="text-sm mb-2">Annual Projected</div>
                        <div className="text-2xl font-bold">SAR 1,50,87,024</div>
                        <div className="text-xs text-green-500">+58,77,024 (63.8%)</div>
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
                      {monthlyData.slice(0, 3).map((item) => {
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
                      {/* Showing visible rows that match the image */}
                      <TableRow>
                        <TableCell>Jan</TableCell>
                        <TableCell className="text-right">6,50,000</TableCell>
                        <TableCell className="text-right">12,57,252</TableCell>
                        <TableCell className="text-right text-green-500">+6,07,252</TableCell>
                        <TableCell className="text-right text-green-500">+93.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Feb</TableCell>
                        <TableCell className="text-right">6,80,000</TableCell>
                        <TableCell className="text-right">12,57,252</TableCell>
                        <TableCell className="text-right text-green-500">+5,77,252</TableCell>
                        <TableCell className="text-right text-green-500">+84.9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mar</TableCell>
                        <TableCell className="text-right">7,20,000</TableCell>
                        <TableCell className="text-right">12,57,252</TableCell>
                        <TableCell className="text-right text-green-500">+5,37,252</TableCell>
                        <TableCell className="text-right text-green-500">+74.6%</TableCell>
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
