
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  BarChart4, 
  ArrowLeft,
  ArrowRightLeft,
  PieChart
} from "lucide-react";
import { 
  mockScenarios, 
  mockOutlets, 
  mockBrands, 
  createSampleScenario 
} from "@/services/mockData";
import { compareScenarios } from "@/services/calculationService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ScenarioManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scenarios, setScenarios] = useState(mockScenarios);
  const [selectedOutletId, setSelectedOutletId] = useState(mockOutlets[0].id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState("");
  const [compareScenario1, setCompareScenario1] = useState(scenarios[0]?.id || "");
  const [compareScenario2, setCompareScenario2] = useState(scenarios.length > 1 ? scenarios[1].id : "");
  const [activeTab, setActiveTab] = useState("saved-scenarios");
  
  const filteredScenarios = scenarios.filter(s => s.outletId === selectedOutletId);
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutletId);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  
  // What-if analysis parameters
  const [staffingLevel, setStaffingLevel] = useState(100);
  const [averageWage, setAverageWage] = useState(100);
  const [operatingHours, setOperatingHours] = useState(100);
  const [serviceEfficiency, setServiceEfficiency] = useState(100);
  const [customerVolume, setCustomerVolume] = useState(100);
  const [averageCheck, setAverageCheck] = useState(100);
  
  const handleCreateScenario = () => {
    if (!newScenarioName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a scenario name",
        variant: "destructive"
      });
      return;
    }
    
    const newScenario = createSampleScenario(selectedOutletId);
    newScenario.name = newScenarioName;
    
    setScenarios([...scenarios, newScenario]);
    setNewScenarioName("");
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Scenario Created",
      description: `"${newScenarioName}" has been added to your scenarios.`
    });
  };
  
  const handleDuplicateScenario = (scenarioId) => {
    const originalScenario = scenarios.find(s => s.id === scenarioId);
    if (!originalScenario) return;
    
    const duplicatedScenario = {
      ...originalScenario,
      id: `scenario-${Date.now()}`,
      name: `Copy of ${originalScenario.name}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setScenarios([...scenarios, duplicatedScenario]);
    
    toast({
      title: "Scenario Duplicated",
      description: `A copy of "${originalScenario.name}" has been created.`
    });
  };
  
  const handleDeleteScenario = (scenarioId) => {
    const filteredScenarios = scenarios.filter(s => s.id !== scenarioId);
    setScenarios(filteredScenarios);
    
    // Reset comparison selections if needed
    if (compareScenario1 === scenarioId) {
      setCompareScenario1(filteredScenarios[0]?.id || "");
    }
    if (compareScenario2 === scenarioId) {
      setCompareScenario2(filteredScenarios[0]?.id || "");
    }
    
    toast({
      title: "Scenario Deleted",
      description: "The scenario has been deleted."
    });
  };
  
  const handleSaveWhatIfScenario = () => {
    toast({
      title: "What-If Scenario Saved",
      description: "Your what-if analysis has been saved as a new scenario."
    });
  };
  
  const getComparisonData = () => {
    const scenario1 = scenarios.find(s => s.id === compareScenario1);
    const scenario2 = scenarios.find(s => s.id === compareScenario2);
    
    if (!scenario1 || !scenario2) return null;
    
    return compareScenarios(scenario1, scenario2);
  };
  
  const comparison = compareScenario1 && compareScenario2 ? getComparisonData() : null;
  
  const comparisonChartData = [
    { name: "Total Staff", base: 33, comparison: 29 },
    { name: "Labor Cost", base: 165500, comparison: 148000 },
    { name: "Labor %", base: 24.8, comparison: 22.1 }
  ];
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Scenario Manager</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedOutletId} onValueChange={setSelectedOutletId}>
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
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Scenario
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Scenario</DialogTitle>
                <DialogDescription>
                  Create a new staffing scenario for {currentOutlet?.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input 
                    id="scenario-name" 
                    value={newScenarioName}
                    onChange={(e) => setNewScenarioName(e.target.value)}
                    placeholder="e.g., Optimal Staff Efficiency"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <div className="text-sm font-medium">{currentBrand?.name} ({currentBrand?.serviceStyle})</div>
                </div>
                
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="text-sm font-medium">{currentOutlet?.name}</div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateScenario}>Create Scenario</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="saved-scenarios">Saved Scenarios</TabsTrigger>
          <TabsTrigger value="what-if-analysis">What-If Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved-scenarios" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Scenarios</CardTitle>
              <CardDescription>
                Manage your saved staffing scenarios for {currentOutlet?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredScenarios.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No scenarios found for this outlet</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Scenario
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Outlet</TableHead>
                      <TableHead>Total Staff</TableHead>
                      <TableHead>Labor Cost (SAR)</TableHead>
                      <TableHead>Labor %</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScenarios.map((scenario) => (
                      <TableRow key={scenario.id}>
                        <TableCell>
                          <input type="checkbox" className="rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell>{currentBrand?.name}</TableCell>
                        <TableCell>{currentOutlet?.name}</TableCell>
                        <TableCell>{scenario.calculations.totalStaff.toFixed(1)}</TableCell>
                        <TableCell>${scenario.calculations.laborCost.toLocaleString()}</TableCell>
                        <TableCell>{scenario.calculations.laborPercentage.toFixed(1)}%</TableCell>
                        <TableCell>{scenario.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate("/control-panel")}>
                              Load
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => navigate("/control-panel")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDuplicateScenario(scenario.id)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDeleteScenario(scenario.id)} className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          {filteredScenarios.length >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Scenario Comparison</CardTitle>
                <CardDescription>
                  Compare two scenarios to see the differences in staffing, costs and efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label className="mb-2 block">Baseline Scenario</Label>
                    <Select value={compareScenario1} onValueChange={setCompareScenario1}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredScenarios.map((scenario) => (
                          <SelectItem key={scenario.id} value={scenario.id}>
                            {scenario.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Comparison Scenario</Label>
                    <Select value={compareScenario2} onValueChange={setCompareScenario2}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredScenarios.map((scenario) => (
                          <SelectItem key={scenario.id} value={scenario.id} disabled={scenario.id === compareScenario1}>
                            {scenario.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {comparison && (
                  <>
                    <Card className="bg-muted mb-6">
                      <CardHeader>
                        <CardTitle className="text-base">Key Differences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {comparison.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ArrowRightLeft className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="base" name="Current Operation" fill="#8884d8" />
                          <Bar dataKey="comparison" name="Optimized Staffing" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  View Detailed Comparison
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="what-if-analysis">
          <Card>
            <CardHeader>
              <CardTitle>What-If Analysis</CardTitle>
              <CardDescription>
                Adjust parameters to see how changes would impact your staffing and financial metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-6">
                  <div>
                    <Label>Base Scenario</Label>
                    <Select defaultValue="current-operation" className="mt-2">
                      <SelectTrigger>
                        <SelectValue placeholder="Select base scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredScenarios.map((scenario) => (
                          <SelectItem key={scenario.id} value={scenario.id}>
                            {scenario.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Staffing Level (%)</Label>
                      <span className="font-medium">{staffingLevel}%</span>
                    </div>
                    <Slider 
                      value={[staffingLevel]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setStaffingLevel(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the total number of staff compared to the base scenario
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Average Wage (%)</Label>
                      <span className="font-medium">{averageWage}%</span>
                    </div>
                    <Slider 
                      value={[averageWage]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setAverageWage(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the average wage compared to the base scenario
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Operating Hours (%)</Label>
                      <span className="font-medium">{operatingHours}%</span>
                    </div>
                    <Slider 
                      value={[operatingHours]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setOperatingHours(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the operating hours compared to the base scenario
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Service Efficiency (%)</Label>
                      <span className="font-medium">{serviceEfficiency}%</span>
                    </div>
                    <Slider 
                      value={[serviceEfficiency]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setServiceEfficiency(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the service efficiency compared to the base scenario
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Customer Volume (%)</Label>
                      <span className="font-medium">{customerVolume}%</span>
                    </div>
                    <Slider 
                      value={[customerVolume]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setCustomerVolume(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the customer volume compared to the base scenario
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Average Check (%)</Label>
                      <span className="font-medium">{averageCheck}%</span>
                    </div>
                    <Slider 
                      value={[averageCheck]} 
                      min={80} 
                      max={120} 
                      step={1}
                      onValueChange={(value) => setAverageCheck(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Adjust the average check amount compared to the base scenario
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="seasonality" />
                    <Label htmlFor="seasonality">Include Seasonality Effects</Label>
                  </div>
                </div>
              </div>
              
              <div className="h-80 mt-8 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Total Staff", base: 33, adjusted: 33 * (staffingLevel / 100) },
                      { name: "Revenue (K SAR)", base: 667, adjusted: 667 * (customerVolume / 100) * (averageCheck / 100) },
                      { name: "Service Time (min)", base: 5500, adjusted: 5500 * (100 / serviceEfficiency) }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="base" name="Base Scenario" fill="#8884d8" />
                    <Bar dataKey="adjusted" name="What-If Scenario" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Impact on Labor Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">SAR 1,65,500</div>
                    <p className={`text-sm ${(staffingLevel * averageWage / 100 - 100) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {(staffingLevel * averageWage / 100 - 100) > 0 ? '+' : ''}
                      {((staffingLevel * averageWage / 100 - 100)).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Impact on Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">SAR 6,67,000</div>
                    <p className={`text-sm ${(customerVolume * averageCheck / 100 - 100) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {(customerVolume * averageCheck / 100 - 100) > 0 ? '+' : ''}
                      {((customerVolume * averageCheck / 100 - 100)).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Labor Percentage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(24.8 * (staffingLevel * averageWage) / (customerVolume * averageCheck)).toFixed(1)}%
                    </div>
                    <p className={`text-sm ${(staffingLevel * averageWage) / (customerVolume * averageCheck) - 1 > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {((staffingLevel * averageWage) / (customerVolume * averageCheck) - 1) > 0 ? '+' : ''}
                      {(((staffingLevel * averageWage) / (customerVolume * averageCheck) - 1) * 100).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Profit Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      SAR {(667000 * (customerVolume * averageCheck / 10000) - 165500 * (staffingLevel * averageWage / 10000) - (667000 - 165500)).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(667000 * (customerVolume * averageCheck / 10000) - 165500 * (staffingLevel * averageWage / 10000) - (667000 - 165500)) >= 0 ? 'Positive' : 'Negative'} impact on profit
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveWhatIfScenario}>
                Save What-If Scenario
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioManager;
