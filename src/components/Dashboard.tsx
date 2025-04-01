
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
  ResponsiveContainer 
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

// Sample data
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

// Dashboard component with improved organization
const Dashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const currentLocation = currentOutlet ? mockLocations.find(l => l.id === currentOutlet.locationId) : null;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Total Staff"
              value="37"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: "↓ 3 from optimal", positive: true }}
            />

            <MetricCard
              title="Labor Cost"
              value="$32,450"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: "↑ 4.2% vs last month", positive: false }}
            />

            <MetricCard
              title="Labor Cost %"
              value="26.4%"
              icon={<TrendingUp className="h-5 w-5" />}
              description="Industry benchmark: 25-30%"
              footer={<Progress value={26.4} className="h-2 mt-2" />}
            />

            <MetricCard
              title="Covers per Labor Hour"
              value="3.8"
              icon={<Clock className="h-5 w-5" />}
              trend={{ value: "↑ 0.3 vs previous period", positive: true }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ChartContainer
              title="Staff Distribution"
              className="md:col-span-2"
            >
              <ResponsiveContainer width="100%" height={320}>
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
            </ChartContainer>

            <ChartContainer title="Staff Breakdown">
              <ResponsiveContainer width="100%" height={320}>
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
            </ChartContainer>
          </div>

          <ChartContainer
            title="Revenue vs. Labor Cost"
            className="mt-6"
          >
            <ResponsiveContainer width="100%" height={320}>
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
          </ChartContainer>

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
    </PageLayout>
  );
};

export default Dashboard;
