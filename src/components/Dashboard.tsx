
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  Settings,
  ChevronRight
} from "lucide-react";
import { mockOutlets, mockBrands, mockLocations } from "@/services/mockData";

const staffDistribution = [
  { name: "Servers", current: 12, optimized: 10 },
  { name: "Cooks", current: 8, optimized: 6 },
  { name: "Runners", current: 6, optimized: 4 },
  { name: "Hosts", current: 4, optimized: 3 },
  { name: "Managers", current: 3, optimized: 3 },
  { name: "Dishwashers", current: 4, optimized: 3 },
];

const laborCostTrend = [
  { month: "Jan", revenue: 100000, laborCost: 28000 },
  { month: "Feb", revenue: 110000, laborCost: 29500 },
  { month: "Mar", revenue: 115000, laborCost: 30000 },
  { month: "Apr", revenue: 120000, laborCost: 31000 },
  { month: "May", revenue: 125000, laborCost: 32500 },
  { month: "Jun", revenue: 135000, laborCost: 33000 },
];

const Dashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const currentLocation = currentOutlet ? mockLocations.find(l => l.id === currentOutlet.locationId) : null;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">F&B Manpower Planning Dashboard</h1>
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
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentOutlet && currentBrand && currentLocation && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">37</div>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">↓ 3 </span>
                  from optimal
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Labor Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$32,450</div>
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500 font-medium">↑ 4.2% </span>
                  vs last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Labor Cost %
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">26.4%</div>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <Progress value={26.4} className="h-2 mt-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  Industry benchmark: 25-30%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Covers per Labor Hour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">3.8</div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">↑ 0.3 </span>
                  vs previous period
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Staff Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={staffDistribution}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar name="Current" dataKey="current" fill="#82ca9d" />
                      <Bar name="Optimized" dataKey="optimized" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'FOH', value: 22, fill: '#8884d8' },
                          { name: 'BOH', value: 15, fill: '#82ca9d' },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Revenue vs. Labor Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={laborCostTrend}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="laborCost" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4 justify-center">
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
    </div>
  );
};

export default Dashboard;
