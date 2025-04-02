
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import ChartTooltip from "@/components/ui/chart-tooltip";

const EfficiencyComparison = () => {
  // Sample department data
  const departmentData = [
    { name: "Operations", value: 78, color: "#8b5cf6" },
    { name: "Sales", value: 82, color: "#3b82f6" },
    { name: "Marketing", value: 75, color: "#10b981" },
    { name: "IT", value: 85, color: "#f59e0b" },
    { name: "HR", value: 70, color: "#ef4444" }
  ];

  // Sample role data
  const roleData = [
    { name: "Manager", value: 82, color: "#8b5cf6" },
    { name: "Senior Staff", value: 79, color: "#3b82f6" },
    { name: "Junior Staff", value: 74, color: "#10b981" },
    { name: "Support", value: 68, color: "#f59e0b" }
  ];

  // Sample scenario data
  const scenarioData = [
    { name: "High Traffic", value: 65, color: "#8b5cf6" },
    { name: "Normal Op", value: 80, color: "#3b82f6" },
    { name: "Low Traffic", value: 90, color: "#10b981" }
  ];

  // Custom tooltip formatter
  const tooltipFormatter = (value: number) => `${value}%`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Efficiency Comparison</h2>
      </div>
      
      <Tabs defaultValue="department">
        <TabsList>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="role">By Role</TabsTrigger>
          <TabsTrigger value="scenario">By Scenario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="department" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      paddingAngle={2}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip valueFormatter={tooltipFormatter} />} />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
          
              <div className="grid grid-cols-1 gap-4 mt-6">
                {["Operations", "Sales", "Marketing", "IT", "HR"].map((dept, index) => (
                  <Card key={dept}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dept}</span>
                        <div className="flex items-center gap-4">
                          <div className="bg-muted h-2 w-40 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${70 + (index * 5)}%` }}
                            />
                          </div>
                          <span className="w-12 text-right">{70 + (index * 5)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="role" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      paddingAngle={2}
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip valueFormatter={tooltipFormatter} />} />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scenario" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%">
                  <PieChart>
                    <Pie
                      data={scenarioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      paddingAngle={2}
                    >
                      {scenarioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip valueFormatter={tooltipFormatter} />} />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EfficiencyComparison;
