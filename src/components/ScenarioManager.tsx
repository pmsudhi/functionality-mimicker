
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { compareScenarios } from "@/services/calculationService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/components/ui/page-layout";
import { FilterBar } from "@/components/ui/filter-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatComparison } from "@/components/ui/stat-comparison";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { BarChart, BarChart3 } from "lucide-react";

const ScenarioManager = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("saved");
  const [baseScenario, setBaseScenario] = useState<string>(mockScenarios[0]?.id || "");
  
  // State for What-If analysis sliders
  const [staffingLevel, setStaffingLevel] = useState(100);
  const [averageWage, setAverageWage] = useState(100);
  const [operatingHours, setOperatingHours] = useState(100);
  const [serviceEfficiency, setServiceEfficiency] = useState(100);
  const [customerVolume, setCustomerVolume] = useState(100);
  const [averageCheck, setAverageCheck] = useState(100);
  
  // Filter scenarios based on selections
  const filteredScenarios = mockScenarios.filter(scenario => {
    const outlet = mockOutlets.find(o => o.id === scenario.outletId);
    if (!outlet) return false;
    
    if (selectedOutletId && outlet.id !== selectedOutletId) return false;
    if (selectedBrandId && outlet.brandId !== selectedBrandId) return false;
    
    return true;
  });
  
  // Get available brands and outlets for filtering
  const availableBrands = Array.from(new Set(mockOutlets.map(o => o.brandId)))
    .map(brandId => mockBrands.find(b => b.id === brandId))
    .filter(brand => brand !== undefined) as typeof mockBrands;
  
  const availableOutlets = selectedBrandId
    ? mockOutlets.filter(o => o.brandId === selectedBrandId)
    : mockOutlets;
  
  // Calculate comparisons for each scenario against the best performing one
  const getComparisonData = () => {
    if (filteredScenarios.length <= 1) return null;
    
    // Find the scenario with the lowest labor percentage as the baseline
    const sortedByEfficiency = [...filteredScenarios].sort(
      (a, b) => a.calculations.laborPercentage - b.calculations.laborPercentage
    );
    
    const baselineScenario = sortedByEfficiency[0];
    const comparisonScenario = sortedByEfficiency[1];
    
    // Do a safe comparison that handles potentially undefined values
    try {
      return compareScenarios(baselineScenario, comparisonScenario);
    } catch (error) {
      console.error("Error comparing scenarios:", error);
      return null;
    }
  };
  
  const selectedBaseScenario = mockScenarios.find(s => s.id === baseScenario);
  const comparison = getComparisonData();

  const handleBrandChange = (value: string) => {
    setSelectedBrandId(value === "all" ? null : value);
  };

  const handleOutletChange = (value: string) => {
    setSelectedOutletId(value === "all" ? null : value);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Scenarios</h1>
        <p className="text-muted-foreground">Create, compare, and manage staffing scenarios</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="saved" className="py-3">Saved Scenarios</TabsTrigger>
          <TabsTrigger value="what-if" className="py-3">What-If Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <Select value={selectedBrandId ? selectedBrandId : "all"} onValueChange={handleBrandChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {availableBrands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedOutletId ? selectedOutletId : "all"} onValueChange={handleOutletChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Outlets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outlets</SelectItem>
                  {availableOutlets.map(outlet => (
                    <SelectItem key={outlet.id} value={outlet.id}>{outlet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button>Create New Scenario</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Saved Scenarios</CardTitle>
              <p className="text-sm text-muted-foreground">Select scenarios to compare or manage individual scenarios</p>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Outlet</TableHead>
                    <TableHead className="text-right">Total Staff</TableHead>
                    <TableHead className="text-right">Labor Cost (SAR)</TableHead>
                    <TableHead className="text-right">Labor %</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScenarios.map(scenario => {
                    const outlet = mockOutlets.find(o => o.id === scenario.outletId);
                    const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
                    const createdDate = new Date(scenario.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '-');
                    
                    return (
                      <TableRow key={scenario.id}>
                        <TableCell className="pr-0">
                          <Checkbox id={`select-${scenario.id}`} />
                        </TableCell>
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell>{brand?.name || "Unknown"}</TableCell>
                        <TableCell>{outlet?.name || "Unknown"}</TableCell>
                        <TableCell className="text-right">
                          {scenario.calculations.totalStaff ? Math.ceil(scenario.calculations.totalStaff) : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          {scenario.calculations.laborCost ? Number(scenario.calculations.laborCost).toLocaleString() : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          {scenario.calculations.laborPercentage 
                            ? `${scenario.calculations.laborPercentage.toFixed(1)}%` 
                            : "N/A"}
                        </TableCell>
                        <TableCell>{createdDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">Load</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {comparison && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Scenario Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Baseline: {comparison.scenario1.name}</h3>
                    <div className="space-y-2 text-sm">
                      <StatComparison 
                        label="Staff Count"
                        value1={Math.ceil(comparison.scenario1.totalStaff)}
                        value2=""
                      />
                      <StatComparison 
                        label="Labor Cost"
                        value1={comparison.scenario1.laborCost.toLocaleString()}
                        value2=""
                      />
                      <StatComparison 
                        label="Labor %"
                        value1={`${comparison.scenario1.laborPercentage.toFixed(1)}%`}
                        value2=""
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Comparison: {comparison.scenario2.name}</h3>
                    <div className="space-y-2 text-sm">
                      <StatComparison 
                        label="Staff Count"
                        value1={Math.ceil(comparison.scenario2.totalStaff)}
                        value2=""
                      />
                      <StatComparison 
                        label="Labor Cost"
                        value1={comparison.scenario2.laborCost.toLocaleString()}
                        value2=""
                      />
                      <StatComparison 
                        label="Labor %"
                        value1={`${comparison.scenario2.laborPercentage.toFixed(1)}%`}
                        value2=""
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Difference</h3>
                    <div className="space-y-2 text-sm">
                      <StatComparison 
                        label="Staff Count"
                        value1=""
                        value2=""
                        difference={comparison.staffDiff}
                        positiveIsBetter={false}
                      />
                      <StatComparison 
                        label="Labor Cost"
                        value1=""
                        value2=""
                        difference={comparison.costDiff}
                        positiveIsBetter={false}
                      />
                      <StatComparison 
                        label="Labor %"
                        value1=""
                        value2=""
                        difference={comparison.laborPercentageDiff}
                        positiveIsBetter={false}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Key Observations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {comparison.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="what-if" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>What-If Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">Adjust parameters to see how changes would impact your staffing and financial metrics</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Base Scenario</label>
                    <Select value={baseScenario} onValueChange={setBaseScenario}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select base scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockScenarios.map(scenario => (
                          <SelectItem key={scenario.id} value={scenario.id}>{scenario.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Staffing Level (%)</label>
                        <span className="text-sm font-medium">{staffingLevel}%</span>
                      </div>
                      <Slider 
                        value={[staffingLevel]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setStaffingLevel(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the total number of staff compared to the base scenario</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Average Wage (%)</label>
                        <span className="text-sm font-medium">{averageWage}%</span>
                      </div>
                      <Slider 
                        value={[averageWage]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setAverageWage(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the average wage compared to the base scenario</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Operating Hours (%)</label>
                        <span className="text-sm font-medium">{operatingHours}%</span>
                      </div>
                      <Slider 
                        value={[operatingHours]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setOperatingHours(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the operating hours compared to the base scenario</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Service Efficiency (%)</label>
                        <span className="text-sm font-medium">{serviceEfficiency}%</span>
                      </div>
                      <Slider 
                        value={[serviceEfficiency]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setServiceEfficiency(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the service efficiency compared to the base scenario</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Customer Volume (%)</label>
                        <span className="text-sm font-medium">{customerVolume}%</span>
                      </div>
                      <Slider 
                        value={[customerVolume]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setCustomerVolume(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the customer volume compared to the base scenario</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Average Check (%)</label>
                        <span className="text-sm font-medium">{averageCheck}%</span>
                      </div>
                      <Slider 
                        value={[averageCheck]} 
                        min={50} 
                        max={150} 
                        step={1} 
                        onValueChange={(vals) => setAverageCheck(vals[0])} 
                      />
                      <p className="text-xs text-muted-foreground">Adjust the average check amount compared to the base scenario</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-60 border border-dashed rounded-md p-4 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">Comparison chart showing the impact of changes</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Impact on Labor Cost</h3>
                        <p className="text-2xl font-bold">SAR {selectedBaseScenario?.calculations.laborCost.toLocaleString() || "0"}</p>
                        <p className="text-xs text-muted-foreground">0.0(%)</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Impact on Revenue</h3>
                        <p className="text-2xl font-bold">SAR 6,67,000</p>
                        <p className="text-xs text-muted-foreground">0.0(%)</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Labor Percentage</h3>
                        <p className="text-2xl font-bold">{selectedBaseScenario?.calculations.laborPercentage.toFixed(1) || "0.0"}%</p>
                        <p className="text-xs text-muted-foreground">0.0%</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-1">Profit Impact</h3>
                        <p className="text-2xl font-bold">SAR 0</p>
                        <p className="text-xs text-muted-foreground">Negative impact on profit</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Save What-If Scenario
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioManager;
