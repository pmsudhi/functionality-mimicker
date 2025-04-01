
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  BarChart4, 
  ArrowLeft,
  ArrowRightLeft
} from "lucide-react";
import { 
  mockScenarios, 
  mockOutlets, 
  mockBrands, 
  createSampleScenario 
} from "@/services/mockData";
import { compareScenarios } from "@/services/calculationService";

const ScenarioManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scenarios, setScenarios] = useState(mockScenarios);
  const [selectedOutletId, setSelectedOutletId] = useState(mockOutlets[0].id);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState("");
  const [compareScenario1, setCompareScenario1] = useState(scenarios[0]?.id || "");
  const [compareScenario2, setCompareScenario2] = useState(scenarios.length > 1 ? scenarios[1].id : "");
  
  const filteredScenarios = scenarios.filter(s => s.outletId === selectedOutletId);
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutletId);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  
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
  
  const handleDuplicateScenario = (scenarioId: string) => {
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
  
  const handleDeleteScenario = (scenarioId: string) => {
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
  
  const getComparisonData = () => {
    const scenario1 = scenarios.find(s => s.id === compareScenario1);
    const scenario2 = scenarios.find(s => s.id === compareScenario2);
    
    if (!scenario1 || !scenario2) return null;
    
    return compareScenarios(scenario1, scenario2);
  };
  
  const comparison = compareScenario1 && compareScenario2 ? getComparisonData() : null;
  
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
      
      <div className="space-y-8">
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
                    <TableHead>Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Staff Count</TableHead>
                    <TableHead>Labor Cost</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">{scenario.name}</TableCell>
                      <TableCell>{scenario.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>{scenario.calculations.totalStaff.toFixed(1)}</TableCell>
                      <TableCell>${scenario.calculations.laborCost.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
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
                  <Card className="bg-muted">
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
                  
                  <div className="mt-6 h-80 border rounded-md flex items-center justify-center bg-muted/40">
                    <p className="text-muted-foreground text-center">
                      Staffing comparison chart<br/>
                      <span className="text-xs">(Visualization to be implemented)</span>
                    </p>
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
      </div>
    </div>
  );
};

export default ScenarioManager;
