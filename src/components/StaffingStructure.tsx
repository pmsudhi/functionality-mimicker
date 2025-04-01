
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import { mockOutlets, mockBrands, mockPositions } from "@/services/mockData";
import { calculateStaffingRequirements } from "@/services/calculationService";
import { getDefaultParameters } from "@/services/mockData";
import { Position, PositionCategory, StaffingRequirement } from "@/types/modelTypes";

const COLORS = {
  FOH: ["#8884d8", "#9e86e8", "#b389f9", "#c48ef7", "#d696f2"],
  BOH: ["#82ca9d", "#7dd6a8", "#76e3b3", "#6decbe", "#63f3c9"],
  Management: ["#ffc658", "#ffcf7c", "#ffd8a0", "#ffe1c4", "#ffeae8"]
};

const StaffingStructure = () => {
  const navigate = useNavigate();
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const [viewType, setViewType] = useState<"department" | "role" | "location">("department");
  
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  
  // Generate staffing requirements based on the brand's default parameters
  const getStaffingData = () => {
    if (!currentBrand) return [];
    
    const params = getDefaultParameters(currentBrand.serviceStyle);
    return calculateStaffingRequirements(
      params.space,
      params.service,
      params.efficiency,
      currentBrand.serviceStyle
    );
  };
  
  const staffingRequirements = getStaffingData();
  
  // Group positions by category
  const getPositionsByCategory = (category: PositionCategory) => {
    return staffingRequirements.filter(req => {
      const position = mockPositions.find(p => p.id === req.positionId);
      return position?.category === category;
    });
  };
  
  const fohPositions = getPositionsByCategory("FOH");
  const bohPositions = getPositionsByCategory("BOH");
  const managementPositions = getPositionsByCategory("Management");
  
  // Calculate department counts and costs
  const getFOHTotal = () => {
    return fohPositions.reduce((sum, req) => sum + req.count, 0);
  };
  
  const getBOHTotal = () => {
    return bohPositions.reduce((sum, req) => sum + req.count, 0);
  };
  
  const getManagementTotal = () => {
    return managementPositions.reduce((sum, req) => sum + req.count, 0);
  };
  
  const getTotalStaff = () => {
    return getFOHTotal() + getBOHTotal() + getManagementTotal();
  };
  
  const calculateCost = (requirements: StaffingRequirement[]) => {
    return requirements.reduce((total, req) => {
      const position = mockPositions.find(p => p.id === req.positionId);
      if (!position) return total;
      
      const monthlyCost = position.baseSalary + position.variablePay + position.benefits;
      return total + (monthlyCost * req.count);
    }, 0);
  };
  
  const fohCost = calculateCost(fohPositions);
  const bohCost = calculateCost(bohPositions);
  const managementCost = calculateCost(managementPositions);
  const totalCost = fohCost + bohCost + managementCost;
  
  // Prepare chart data
  const departmentData = [
    { name: "FOH", value: getFOHTotal(), fill: COLORS.FOH[0] },
    { name: "BOH", value: getBOHTotal(), fill: COLORS.BOH[0] },
    { name: "Management", value: getManagementTotal(), fill: COLORS.Management[0] }
  ];
  
  const costData = [
    { name: "FOH", value: fohCost, fill: COLORS.FOH[0] },
    { name: "BOH", value: bohCost, fill: COLORS.BOH[0] },
    { name: "Management", value: managementCost, fill: COLORS.Management[0] }
  ];
  
  const positionData = staffingRequirements.map(req => {
    const position = mockPositions.find(p => p.id === req.positionId);
    return {
      name: position ? position.name : "Unknown",
      count: req.count,
      category: position ? position.category : "Unknown"
    };
  }).sort((a, b) => b.count - a.count);
  
  const renderPositionRow = (req: StaffingRequirement, index: number) => {
    const position = mockPositions.find(p => p.id === req.positionId);
    if (!position) return null;
    
    const monthlyCost = position.baseSalary + position.variablePay + position.benefits;
    
    return (
      <div 
        key={position.id} 
        className={`flex justify-between py-3 px-2 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
      >
        <div className="flex-1">
          <div className="font-medium">{position.name}</div>
          <div className="text-xs text-muted-foreground">{req.calculationMethod}</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="w-16 text-center">
            <div className="font-medium">{req.count.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Staff</div>
          </div>
          <div className="w-24 text-right">
            <div className="font-medium">${(monthlyCost * req.count).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Monthly</div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Staffing Structure</h1>
        </div>
        
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
          
          <Select value={viewType} onValueChange={(value: "department" | "role" | "location") => setViewType(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="department">By Department</SelectItem>
              <SelectItem value="role">By Role</SelectItem>
              <SelectItem value="location">By Location</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Staff Distribution</CardTitle>
            <CardDescription>
              Total of {getTotalStaff().toFixed(1)} staff members with a monthly cost of ${totalCost.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={positionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(1), "Staff Count"]}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Staff Count">
                    {positionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.category === "FOH" 
                            ? COLORS.FOH[index % COLORS.FOH.length] 
                            : entry.category === "BOH" 
                              ? COLORS.BOH[index % COLORS.BOH.length]
                              : COLORS.Management[index % COLORS.Management.length]
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip formatter={(value: number) => [value.toFixed(1), "Staff Count"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Monthly Cost"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Front of House (FOH) Staff</CardTitle>
            <CardDescription>
              {getFOHTotal().toFixed(1)} staff members - ${fohCost.toLocaleString()} monthly cost
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="space-y-1">
              {fohPositions.map((req, index) => renderPositionRow(req, index))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Back of House (BOH) Staff</CardTitle>
            <CardDescription>
              {getBOHTotal().toFixed(1)} staff members - ${bohCost.toLocaleString()} monthly cost
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="space-y-1">
              {bohPositions.map((req, index) => renderPositionRow(req, index))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Management Staff</CardTitle>
            <CardDescription>
              {getManagementTotal().toFixed(1)} staff members - ${managementCost.toLocaleString()} monthly cost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {managementPositions.map((req, index) => renderPositionRow(req, index))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffingStructure;
