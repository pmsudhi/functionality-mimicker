
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ChefHat, 
  UserPlus, 
  UserMinus,
  Edit,
  Save,
  HelpCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPositions, mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { processScenario } from "@/services/calculationService";

const StaffingModeler = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  const [staffingView, setStaffingView] = useState("foh");
  const [isEditing, setIsEditing] = useState(false);

  // Find the selected scenario and related data
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  const outlet = scenario ? mockOutlets.find(o => o.id === scenario.outletId) : null;
  const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
  
  // Get positioned filtered by category
  const getFOHPositions = () => mockPositions.filter(p => p.category === "FOH");
  const getBOHPositions = () => mockPositions.filter(p => p.category === "BOH");
  const getManagementPositions = () => mockPositions.filter(p => p.category === "Management");
  
  // Get position count from the scenario staffing requirements
  const getPositionCount = (positionId: string) => {
    if (!scenario) return 0;
    const req = scenario.staffingRequirements.find(r => r.positionId === positionId);
    return req ? req.count : 0;
  };
  
  // Get position calculation method from the scenario staffing requirements
  const getPositionCalculation = (positionId: string) => {
    if (!scenario) return "";
    const req = scenario.staffingRequirements.find(r => r.positionId === positionId);
    return req ? req.calculationMethod : "";
  };
  
  // Handle saving the staffing model
  const handleSaveStaffing = () => {
    setIsEditing(false);
    // In a real app, you would save the updated staffing model here
  };
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Staffing Model</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              {mockScenarios.map(scenario => {
                const outlet = mockOutlets.find(o => o.id === scenario.outletId);
                return (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    {scenario.name} ({outlet?.name})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          
          {isEditing ? (
            <Button onClick={handleSaveStaffing}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Staffing
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Staff Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario ? Math.ceil(scenario.calculations.totalStaff) : "--"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">FOH Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario ? Math.ceil(
                  scenario.staffingRequirements
                    .filter(req => {
                      const position = mockPositions.find(p => p.id === req.positionId);
                      return position?.category === "FOH";
                    })
                    .reduce((sum, req) => sum + req.count, 0)
                ) : "--"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">BOH Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ChefHat className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario ? Math.ceil(
                  scenario.staffingRequirements
                    .filter(req => {
                      const position = mockPositions.find(p => p.id === req.positionId);
                      return position?.category === "BOH";
                    })
                    .reduce((sum, req) => sum + req.count, 0)
                ) : "--"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario ? Math.ceil(
                  scenario.staffingRequirements
                    .filter(req => {
                      const position = mockPositions.find(p => p.id === req.positionId);
                      return position?.category === "Management";
                    })
                    .reduce((sum, req) => sum + req.count, 0)
                ) : "--"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 border rounded-md overflow-hidden">
        <Tabs 
          defaultValue="foh" 
          value={staffingView}
          onValueChange={setStaffingView}
          className="h-full flex flex-col"
        >
          <div className="border-b">
            <TabsList className="bg-transparent w-auto m-2">
              <TabsTrigger value="foh">Front of House</TabsTrigger>
              <TabsTrigger value="boh">Back of House</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="foh" className="h-full p-4 m-0">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Required Staff</TableHead>
                      <TableHead className="hidden md:table-cell">Calculation Method</TableHead>
                      <TableHead className="hidden lg:table-cell">Base Salary</TableHead>
                      <TableHead className="hidden lg:table-cell">Total Cost</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFOHPositions().map(position => {
                      const count = getPositionCount(position.id);
                      const calculation = getPositionCalculation(position.id);
                      const totalCost = (position.baseSalary + position.variablePay + position.benefits) * count;
                      
                      return (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">{position.name}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserMinus className="h-3 w-3" />
                                </Button>
                                <Input 
                                  type="number" 
                                  className="w-16 h-8 text-center" 
                                  defaultValue={count.toString()} 
                                  min="0" 
                                  step="0.5"
                                />
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserPlus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Badge variant="secondary" className="hover:bg-secondary">
                                  {count.toFixed(1)}
                                </Badge>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {calculation}
                              <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {position.baseSalary.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {totalCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {isEditing && (
                              <Button variant="ghost" size="sm">
                                Adjust
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium mb-1">Service Parameters</h3>
                  <div className="text-sm space-y-1">
                    <p>Covers per Waiter: <span className="font-medium">{scenario?.serviceParameters.coversPerWaiter}</span></p>
                    <p>Runner to Waiter Ratio: <span className="font-medium">{scenario?.serviceParameters.runnerToWaiterRatio}%</span></p>
                    <p>Service Style: <span className="font-medium">{brand?.serviceStyle}</span></p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">FOH Summary</h3>
                  <div className="text-sm space-y-1">
                    <p>Total FOH Staff: <span className="font-medium">
                      {scenario ? Math.ceil(
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "FOH";
                          })
                          .reduce((sum, req) => sum + req.count, 0)
                      ) : "--"}
                    </span></p>
                    <p>FOH Labor Cost: <span className="font-medium">
                      {scenario ? (
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "FOH";
                          })
                          .reduce((sum, req) => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            if (!position) return sum;
                            return sum + (position.baseSalary + position.variablePay + position.benefits) * req.count;
                          }, 0)
                          .toLocaleString()
                      ) : "--"}
                    </span></p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="boh" className="h-full p-4 m-0">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Required Staff</TableHead>
                      <TableHead className="hidden md:table-cell">Calculation Method</TableHead>
                      <TableHead className="hidden lg:table-cell">Base Salary</TableHead>
                      <TableHead className="hidden lg:table-cell">Total Cost</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getBOHPositions().map(position => {
                      const count = getPositionCount(position.id);
                      const calculation = getPositionCalculation(position.id);
                      const totalCost = (position.baseSalary + position.variablePay + position.benefits) * count;
                      
                      return (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">{position.name}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserMinus className="h-3 w-3" />
                                </Button>
                                <Input 
                                  type="number" 
                                  className="w-16 h-8 text-center" 
                                  defaultValue={count.toString()} 
                                  min="0" 
                                  step="0.5"
                                />
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserPlus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Badge variant="secondary" className="hover:bg-secondary">
                                  {count.toFixed(1)}
                                </Badge>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {calculation}
                              <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {position.baseSalary.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {totalCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {isEditing && (
                              <Button variant="ghost" size="sm">
                                Adjust
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium mb-1">Kitchen Parameters</h3>
                  <div className="text-sm space-y-1">
                    <p>Kitchen Stations: <span className="font-medium">{scenario?.serviceParameters.kitchenStations}</span></p>
                    <p>Staff per Station: <span className="font-medium">{scenario?.serviceParameters.staffPerStation}</span></p>
                    <p>Service Style: <span className="font-medium">{brand?.serviceStyle}</span></p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">BOH Summary</h3>
                  <div className="text-sm space-y-1">
                    <p>Total BOH Staff: <span className="font-medium">
                      {scenario ? Math.ceil(
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "BOH";
                          })
                          .reduce((sum, req) => sum + req.count, 0)
                      ) : "--"}
                    </span></p>
                    <p>BOH Labor Cost: <span className="font-medium">
                      {scenario ? (
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "BOH";
                          })
                          .reduce((sum, req) => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            if (!position) return sum;
                            return sum + (position.baseSalary + position.variablePay + position.benefits) * req.count;
                          }, 0)
                          .toLocaleString()
                      ) : "--"}
                    </span></p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="management" className="h-full p-4 m-0">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Required Staff</TableHead>
                      <TableHead className="hidden md:table-cell">Calculation Method</TableHead>
                      <TableHead className="hidden lg:table-cell">Base Salary</TableHead>
                      <TableHead className="hidden lg:table-cell">Total Cost</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getManagementPositions().map(position => {
                      const count = getPositionCount(position.id);
                      const calculation = getPositionCalculation(position.id);
                      const totalCost = (position.baseSalary + position.variablePay + position.benefits) * count;
                      
                      return (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">{position.name}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center space-x-1">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserMinus className="h-3 w-3" />
                                </Button>
                                <Input 
                                  type="number" 
                                  className="w-16 h-8 text-center" 
                                  defaultValue={count.toString()} 
                                  min="0" 
                                  step="0.5"
                                />
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                  <UserPlus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Badge variant="secondary" className="hover:bg-secondary">
                                  {count.toFixed(1)}
                                </Badge>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              {calculation}
                              <HelpCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {position.baseSalary.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {totalCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {isEditing && (
                              <Button variant="ghost" size="sm">
                                Adjust
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium mb-1">Management Parameters</h3>
                  <div className="text-sm space-y-1">
                    <p>Total Capacity: <span className="font-medium">{scenario?.spaceParameters.totalCapacity}</span></p>
                    <p>Service Style: <span className="font-medium">{brand?.serviceStyle}</span></p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Management Summary</h3>
                  <div className="text-sm space-y-1">
                    <p>Total Management Staff: <span className="font-medium">
                      {scenario ? Math.ceil(
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "Management";
                          })
                          .reduce((sum, req) => sum + req.count, 0)
                      ) : "--"}
                    </span></p>
                    <p>Management Labor Cost: <span className="font-medium">
                      {scenario ? (
                        scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === "Management";
                          })
                          .reduce((sum, req) => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            if (!position) return sum;
                            return sum + (position.baseSalary + position.variablePay + position.benefits) * req.count;
                          }, 0)
                          .toLocaleString()
                      ) : "--"}
                    </span></p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="h-full p-4 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Staff distribution chart
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Labor Cost Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Labor cost distribution chart
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Staffing Summary</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Staff Count</TableHead>
                        <TableHead>Labor Cost</TableHead>
                        <TableHead>% of Total Staff</TableHead>
                        <TableHead>% of Total Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {["FOH", "BOH", "Management"].map((category) => {
                        if (!scenario) return null;
                        
                        const staffCount = scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === category;
                          })
                          .reduce((sum, req) => sum + req.count, 0);
                        
                        const laborCost = scenario.staffingRequirements
                          .filter(req => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            return position?.category === category;
                          })
                          .reduce((sum, req) => {
                            const position = mockPositions.find(p => p.id === req.positionId);
                            if (!position) return sum;
                            return sum + (position.baseSalary + position.variablePay + position.benefits) * req.count;
                          }, 0);
                        
                        const totalStaff = scenario.calculations.totalStaff;
                        const totalCost = scenario.calculations.laborCost;
                        
                        const staffPercentage = (staffCount / totalStaff) * 100;
                        const costPercentage = (laborCost / totalCost) * 100;
                        
                        return (
                          <TableRow key={category}>
                            <TableCell className="font-medium">{category}</TableCell>
                            <TableCell>{Math.ceil(staffCount)}</TableCell>
                            <TableCell>{laborCost.toLocaleString()}</TableCell>
                            <TableCell>{staffPercentage.toFixed(1)}%</TableCell>
                            <TableCell>{costPercentage.toFixed(1)}%</TableCell>
                          </TableRow>
                        );
                      })}
                      
                      {scenario && (
                        <TableRow>
                          <TableCell className="font-bold">Total</TableCell>
                          <TableCell className="font-bold">{Math.ceil(scenario.calculations.totalStaff)}</TableCell>
                          <TableCell className="font-bold">{scenario.calculations.laborCost.toLocaleString()}</TableCell>
                          <TableCell className="font-bold">100%</TableCell>
                          <TableCell className="font-bold">100%</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffingModeler;
