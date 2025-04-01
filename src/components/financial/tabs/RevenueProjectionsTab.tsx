
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SliderControl from "@/components/scenarios/controls/SliderControl";
import WhatIfMetricCard from "@/components/scenarios/metrics/WhatIfMetricCard";
import { formatSAR, formatIndianStyle, getSeasonalFactor } from "../utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

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

interface RevenueProjectionsTabProps {
  seatingCapacity: number;
  setSeatingCapacity: (value: number) => void;
  setTotalBaseline: (value: number) => void;
}

const RevenueProjectionsTab = ({ 
  seatingCapacity, 
  setSeatingCapacity,
  setTotalBaseline,
}: RevenueProjectionsTabProps) => {
  const { toast } = useToast();
  
  const [averageCheck, setAverageCheck] = useState(135);
  const [turnoverRate, setTurnoverRate] = useState(3.0);
  const [occupancyRate, setOccupancyRate] = useState(73);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);

  const [monthlyRevenueData, setMonthlyRevenueData] = useState(initialMonthlyRevenueData);
  const [totalBaseline, setLocalTotalBaseline] = useState(0);
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
    
    setLocalTotalBaseline(newBaseline);
    setTotalProjected(newProjected);
    setPercentageChange(newPercentageChange);
    
    // Update parent state
    setTotalBaseline(newBaseline);
  }, [averageCheck, seatingCapacity, turnoverRate, occupancyRate, includeSeasonality, setTotalBaseline]);

  const recalculateProjections = () => {
    toast({
      title: "Projections Recalculated",
      description: "Your revenue projections have been updated based on the new parameters."
    });
  };

  return (
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
  );
};

export default RevenueProjectionsTab;
