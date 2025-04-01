import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  TooltipProps
} from "recharts";
import { Download, Calendar, TrendingUp, Users, DollarSign } from "lucide-react";

// Utilization data
const utilizationData = [
  { month: 'Jan', engineering: 82, design: 85, product: 78, marketing: 75 },
  { month: 'Feb', engineering: 80, design: 90, product: 76, marketing: 78 },
  { month: 'Mar', engineering: 85, design: 88, product: 80, marketing: 76 },
  { month: 'Apr', engineering: 87, design: 92, product: 82, marketing: 80 },
  { month: 'May', engineering: 90, design: 95, product: 85, marketing: 82 },
  { month: 'Jun', engineering: 92, design: 90, product: 88, marketing: 85 },
  { month: 'Jul', engineering: 88, design: 85, product: 90, marketing: 88 },
  { month: 'Aug', engineering: 85, design: 80, product: 88, marketing: 90 },
  { month: 'Sep', engineering: 87, design: 83, product: 85, marketing: 92 },
  { month: 'Oct', engineering: 90, design: 85, product: 80, marketing: 88 },
  { month: 'Nov', engineering: 92, design: 88, product: 82, marketing: 85 },
  { month: 'Dec', engineering: 88, design: 90, product: 85, marketing: 82 },
];

// Headcount trend
const headcountData = [
  { month: 'Jan', actual: 120, planned: 125 },
  { month: 'Feb', actual: 124, planned: 130 },
  { month: 'Mar', actual: 129, planned: 135 },
  { month: 'Apr', actual: 135, planned: 140 },
  { month: 'May', actual: 140, planned: 145 },
  { month: 'Jun', actual: 146, planned: 150 },
  { month: 'Jul', actual: 148, planned: 155 },
  { month: 'Aug', actual: 152, planned: 160 },
  { month: 'Sep', actual: 156, planned: 165 },
  { month: 'Oct', actual: 160, planned: 170 },
  { month: 'Nov', actual: 162, planned: 175 },
  { month: 'Dec', actual: 165, planned: 180 },
];

// Cost data
const costData = [
  { month: 'Jan', salary: 540000, benefits: 162000, contractors: 85000 },
  { month: 'Feb', salary: 558000, benefits: 167400, contractors: 90000 },
  { month: 'Mar', salary: 580500, benefits: 174150, contractors: 95000 },
  { month: 'Apr', salary: 607500, benefits: 182250, contractors: 100000 },
  { month: 'May', salary: 630000, benefits: 189000, contractors: 105000 },
  { month: 'Jun', salary: 657000, benefits: 197100, contractors: 110000 },
  { month: 'Jul', salary: 666000, benefits: 199800, contractors: 112000 },
  { month: 'Aug', salary: 684000, benefits: 205200, contractors: 115000 },
  { month: 'Sep', salary: 702000, benefits: 210600, contractors: 118000 },
  { month: 'Oct', salary: 720000, benefits: 216000, contractors: 120000 },
  { month: 'Nov', salary: 729000, benefits: 218700, contractors: 125000 },
  { month: 'Dec', salary: 742500, benefits: 222750, contractors: 130000 },
];

// Department distribution
const departmentData = [
  { name: 'Engineering', value: 65 },
  { name: 'Design', value: 20 },
  { name: 'Product', value: 15 },
  { name: 'Marketing', value: 25 },
  { name: 'Sales', value: 18 },
  { name: 'Support', value: 12 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Custom formatter function for tooltips
const formatTooltipValue = (value: any) => {
  if (typeof value === 'number') {
    return value.toFixed(0);
  }
  return value;
};

// Custom tooltip formatter for cost values
const costFormatter = (value: any) => {
  if (typeof value === 'number') {
    return `$${(value/1000).toFixed(0)}K`;
  }
  return value;
};

const Analytics = () => {
  const [analyticsView, setAnalyticsView] = useState("utilization");
  const [timeframe, setTimeframe] = useState("yearly");
  
  return (
    <div className="h-full flex flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Workforce Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarterly">Last Quarter</SelectItem>
              <SelectItem value="yearly">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            2023
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">78.5%</div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-xs text-green-500 mt-1">
              +2.3% from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Headcount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">165</div>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-xs text-blue-500 mt-1">
              +45 YTD growth
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attrition Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8.2%</div>
              <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
            </div>
            <div className="text-xs text-green-500 mt-1">
              -1.5% from previous period
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1.09M</div>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-xs text-amber-500 mt-1">
              +12.4% from previous period
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-hidden border rounded-md">
        <Tabs 
          defaultValue="utilization" 
          value={analyticsView}
          onValueChange={setAnalyticsView}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="utilization" className="data-[state=active]:bg-transparent">
                Utilization
              </TabsTrigger>
              <TabsTrigger value="headcount" className="data-[state=active]:bg-transparent">
                Headcount
              </TabsTrigger>
              <TabsTrigger value="costs" className="data-[state=active]:bg-transparent">
                Costs
              </TabsTrigger>
              <TabsTrigger value="distribution" className="data-[state=active]:bg-transparent">
                Distribution
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="utilization" className="h-full m-0 overflow-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Utilization by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="engineering" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="design" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="product" stroke="#ffc658" />
                      <Line type="monotone" dataKey="marketing" stroke="#ff8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Utilization Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="engineering" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="design" 
                        stackId="1"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="product" 
                        stackId="1"
                        stroke="#ffc658" 
                        fill="#ffc658" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="marketing" 
                        stackId="1"
                        stroke="#ff8042" 
                        fill="#ff8042" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Department Utilization (Current Month)</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Engineering', utilization: 88 },
                      { name: 'Design', utilization: 90 },
                      { name: 'Product', utilization: 85 },
                      { name: 'Marketing', utilization: 82 },
                      { name: 'Sales', utilization: 78 },
                      { name: 'Support', utilization: 75 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="utilization" fill="#8884d8">
                        {[
                          { name: 'Engineering', utilization: 88 },
                          { name: 'Design', utilization: 90 },
                          { name: 'Product', utilization: 85 },
                          { name: 'Marketing', utilization: 82 },
                          { name: 'Sales', utilization: 78 },
                          { name: 'Support', utilization: 75 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="headcount" className="h-full m-0 overflow-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Headcount Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={headcountData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[100, 200]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="planned" stroke="#82ca9d" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Headcount by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => {
                          if (typeof percent === 'number') {
                            return `${name} ${(percent * 100).toFixed(0)}%`;
                          }
                          return name;
                        }}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Hiring vs. Attrition</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { month: 'Jan', hiring: 8, attrition: 3 },
                      { month: 'Feb', hiring: 7, attrition: 2 },
                      { month: 'Mar', hiring: 10, attrition: 4 },
                      { month: 'Apr', hiring: 12, attrition: 5 },
                      { month: 'May', hiring: 9, attrition: 3 },
                      { month: 'Jun', hiring: 11, attrition: 4 },
                      { month: 'Jul', hiring: 7, attrition: 4 },
                      { month: 'Aug', hiring: 9, attrition: 5 },
                      { month: 'Sep', hiring: 8, attrition: 3 },
                      { month: 'Oct', hiring: 6, attrition: 1 },
                      { month: 'Nov', hiring: 5, attrition: 2 },
                      { month: 'Dec', hiring: 6, attrition: 2 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hiring" fill="#82ca9d" />
                      <Bar dataKey="attrition" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="costs" className="h-full m-0 overflow-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={costFormatter} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="salary" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Salaries"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="benefits" 
                        stackId="1"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Benefits"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="contractors" 
                        stackId="1"
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        name="Contractors"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cost per Department</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Engineering', value: 480000 },
                          { name: 'Design', value: 120000 },
                          { name: 'Product', value: 90000 },
                          { name: 'Marketing', value: 150000 },
                          { name: 'Sales', value: 135000 },
                          { name: 'Support', value: 72000 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => {
                          if (typeof percent === 'number') {
                            return `${name} ${(percent * 100).toFixed(0)}%`;
                          }
                          return name;
                        }}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={costFormatter} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Cost Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costData.map(item => {
                      const headcount = headcountData.find(h => h.month === item.month)?.actual || 1;
                      return {
                        month: item.month,
                        total: item.salary + item.benefits + item.contractors,
                        perEmployee: (item.salary + item.benefits) / headcount
                      };
                    })}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => {
                        if (typeof value === 'number') {
                          return name === "total" ? `$${(value/1000).toFixed(0)}K` : `$${value.toFixed(0)}`;
                        }
                        return value;
                      }} />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Total Cost"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="perEmployee" 
                        stroke="#82ca9d" 
                        name="Cost per Employee"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="h-full m-0 overflow-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => {
                          if (typeof percent === 'number') {
                            return `${name} ${(percent * 100).toFixed(0)}%`;
                          }
                          return name;
                        }}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Location Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'New York', value: 45 },
                          { name: 'San Francisco', value: 38 },
                          { name: 'London', value: 25 },
                          { name: 'Remote', value: 57 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => {
                          if (typeof percent === 'number') {
                            return `${name} ${(percent * 100).toFixed(0)}%`;
                          }
                          return name;
                        }}
                      >
                        {[
                          { name: 'New York', value: 45 },
                          { name: 'San Francisco', value: 38 },
                          { name: 'London', value: 25 },
                          { name: 'Remote', value: 57 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Seniority Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { level: 'Junior', count: 45 },
                      { level: 'Mid-level', count: 65 },
                      { level: 'Senior', count: 40 },
                      { level: 'Lead', count: 10 },
                      { level: 'Manager', count: 5 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8">
                        {[
                          { level: 'Junior', count: 45 },
                          { level: 'Mid-level', count: 65 },
                          { level: 'Senior', count: 40 },
                          { level: 'Lead', count: 10 },
                          { level: 'Manager', count: 5 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Employment Type</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Full-time', value: 135 },
                          { name: 'Part-time', value: 10 },
                          { name: 'Contractor', value: 20 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => {
                          if (typeof percent === 'number') {
                            return `${name} ${(percent * 100).toFixed(0)}%`;
                          }
                          return name;
                        }}
                      >
                        {[
                          { name: 'Full-time', value: 135 },
                          { name: 'Part-time', value: 10 },
                          { name: 'Contractor', value: 20 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
