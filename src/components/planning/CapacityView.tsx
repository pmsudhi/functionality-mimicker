
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, BarChart3, TrendingUp, Users } from "lucide-react";

// Sample capacity planning data
const capacityData = [
  {
    month: "Jan",
    demand: 120,
    capacity: 100,
    gap: -20,
  },
  {
    month: "Feb",
    demand: 130,
    capacity: 105,
    gap: -25,
  },
  {
    month: "Mar",
    demand: 125,
    capacity: 110,
    gap: -15,
  },
  {
    month: "Apr",
    demand: 140,
    capacity: 115,
    gap: -25,
  },
  {
    month: "May",
    demand: 145,
    capacity: 125,
    gap: -20,
  },
  {
    month: "Jun",
    demand: 155,
    capacity: 130,
    gap: -25,
  },
  {
    month: "Jul",
    demand: 165,
    capacity: 140,
    gap: -25,
  },
  {
    month: "Aug",
    demand: 170,
    capacity: 150,
    gap: -20,
  },
  {
    month: "Sep",
    demand: 180,
    capacity: 160,
    gap: -20,
  },
  {
    month: "Oct",
    demand: 185,
    capacity: 170,
    gap: -15,
  },
  {
    month: "Nov",
    demand: 190,
    capacity: 175,
    gap: -15,
  },
  {
    month: "Dec",
    demand: 180,
    capacity: 180,
    gap: 0,
  },
];

// Department capacity data
const departmentCapacity = [
  {
    department: "Engineering",
    currentHeadcount: 65,
    plannedAdditions: 10,
    plannedReductions: 2,
    netChange: 8,
  },
  {
    department: "Design",
    currentHeadcount: 20,
    plannedAdditions: 5,
    plannedReductions: 1,
    netChange: 4,
  },
  {
    department: "Product",
    currentHeadcount: 15,
    plannedAdditions: 3,
    plannedReductions: 0,
    netChange: 3,
  },
  {
    department: "Marketing",
    currentHeadcount: 12,
    plannedAdditions: 2,
    plannedReductions: 1,
    netChange: 1,
  },
  {
    department: "Sales",
    currentHeadcount: 25,
    plannedAdditions: 5,
    plannedReductions: 2,
    netChange: 3,
  },
  {
    department: "Customer Support",
    currentHeadcount: 18,
    plannedAdditions: 4,
    plannedReductions: 0,
    netChange: 4,
  },
];

const CapacityView = () => {
  const [capacityPlan, setCapacityPlan] = useState("overview");
  const [attritionRate, setAttritionRate] = useState([8]);
  const [departments, setDepartments] = useState(departmentCapacity);
  
  const totalCurrentHeadcount = departments.reduce((sum, dept) => sum + dept.currentHeadcount, 0);
  const totalPlannedAdditions = departments.reduce((sum, dept) => sum + dept.plannedAdditions, 0);
  const totalPlannedReductions = departments.reduce((sum, dept) => sum + dept.plannedReductions, 0);
  const totalNetChange = departments.reduce((sum, dept) => sum + dept.netChange, 0);
  
  const handleHeadcountChange = (department: string, field: string, value: number) => {
    setDepartments(departments.map(dept => {
      if (dept.department === department) {
        const updatedDept = { ...dept, [field]: value };
        
        // Recalculate net change
        if (field === "plannedAdditions" || field === "plannedReductions") {
          updatedDept.netChange = updatedDept.plannedAdditions - updatedDept.plannedReductions;
        }
        
        return updatedDept;
      }
      return dept;
    }));
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-2 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Capacity Planning</h3>
          <div className="flex items-center space-x-2">
            <Select defaultValue="2023">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Headcount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalCurrentHeadcount}</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Planned Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">+{totalNetChange}</div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <Badge variant="outline" className="mt-1">
              {((totalNetChange / totalCurrentHeadcount) * 100).toFixed(1)}% increase
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attrition Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-bold">{attritionRate}%</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <Slider
              value={attritionRate}
              onValueChange={setAttritionRate}
              max={20}
              step={0.5}
              className="slider-track"
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 p-4 overflow-hidden">
        <Tabs 
          defaultValue="overview" 
          value={capacityPlan}
          onValueChange={setCapacityPlan}
          className="h-full flex flex-col"
        >
          <TabsList className="bg-transparent mb-4">
            <TabsTrigger value="overview">Capacity Overview</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
            <TabsTrigger value="planning">Headcount Planning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="flex-1 m-0">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Capacity vs. Demand (FTE)</CardTitle>
                <CardDescription>
                  Monthly view of capacity and demand throughout the year
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capacityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="capacity" fill="#4f46e5" name="Capacity" />
                    <Bar dataKey="demand" fill="#ef4444" name="Demand" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="flex-1 m-0">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Department Capacity</CardTitle>
                <CardDescription>
                  Current and planned headcount by department
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={departments} 
                    layout="vertical" 
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="department" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="currentHeadcount" fill="#4f46e5" name="Current" />
                    <Bar dataKey="netChange" fill="#10b981" name="Net Change" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planning" className="flex-1 m-0 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>Headcount Planning</CardTitle>
                <CardDescription>
                  Adjust planned headcount additions and reductions by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 font-medium text-sm border-b pb-2">
                  <div>Department</div>
                  <div>Current</div>
                  <div>Planned +/-</div>
                  <div>Net Change</div>
                </div>
                
                {departments.map((dept, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center py-3 border-b">
                    <div className="font-medium">{dept.department}</div>
                    <div>{dept.currentHeadcount}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <span className="text-xs text-green-600 mr-2">+</span>
                          <Input
                            type="number"
                            value={dept.plannedAdditions}
                            onChange={(e) => handleHeadcountChange(
                              dept.department,
                              "plannedAdditions",
                              parseInt(e.target.value || "0")
                            )}
                            className="h-8 w-16"
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-red-600 mr-2">-</span>
                          <Input
                            type="number"
                            value={dept.plannedReductions}
                            onChange={(e) => handleHeadcountChange(
                              dept.department,
                              "plannedReductions",
                              parseInt(e.target.value || "0")
                            )}
                            className="h-8 w-16"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${dept.netChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {dept.netChange >= 0 ? "+" : ""}{dept.netChange}
                    </div>
                  </div>
                ))}
                
                <div className="grid grid-cols-4 gap-4 items-center py-3 mt-2 border-t-2 font-semibold">
                  <div>Total</div>
                  <div>{totalCurrentHeadcount}</div>
                  <div className="flex space-x-4">
                    <span className="text-green-600">+{totalPlannedAdditions}</span>
                    <span className="text-red-600">-{totalPlannedReductions}</span>
                  </div>
                  <div className={`${totalNetChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalNetChange >= 0 ? "+" : ""}{totalNetChange}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CapacityView;
