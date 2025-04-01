
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

const ScenarioManager = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [tab, setTab] = useState("all");
  
  // Filter scenarios based on selections
  const filteredScenarios = mockScenarios.filter(scenario => {
    if (tab === "planning" && scenario.calculations.totalStaff > 0) return false;
    if (tab === "active" && scenario.calculations.totalStaff === 0) return false;
    
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
    
    const baseScenario = sortedByEfficiency[0];
    const comparisonScenario = sortedByEfficiency[1];
    
    // Do a safe comparison that handles potentially undefined values
    try {
      return compareScenarios(baseScenario, comparisonScenario);
    } catch (error) {
      console.error("Error comparing scenarios:", error);
      return null;
    }
  };
  
  const comparison = getComparisonData();

  const handleBrandChange = (value: string) => {
    setSelectedBrandId(value === "all" ? null : value);
  };

  const handleOutletChange = (value: string) => {
    setSelectedOutletId(value === "all" ? null : value);
  };
  
  return (
    <PageLayout>
      <FilterBar 
        title="Scenario Manager"
        actions={<Button>Create New Scenario</Button>}
      >
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
      </FilterBar>
      
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Scenarios</TabsTrigger>
          <TabsTrigger value="active">Active Scenarios</TabsTrigger>
          <TabsTrigger value="planning">Planning Scenarios</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scenario List</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Outlet</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-right">Staff Count</TableHead>
                  <TableHead className="text-right">Labor Cost</TableHead>
                  <TableHead className="text-right">Labor %</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScenarios.map(scenario => {
                  const outlet = mockOutlets.find(o => o.id === scenario.outletId);
                  const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
                  
                  return (
                    <TableRow key={scenario.id}>
                      <TableCell className="font-medium">{scenario.name}</TableCell>
                      <TableCell>{outlet?.name || "Unknown"}</TableCell>
                      <TableCell>{brand?.name || "Unknown"}</TableCell>
                      <TableCell className="text-right">
                        {scenario.calculations.totalStaff ? Math.ceil(scenario.calculations.totalStaff) : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {scenario.calculations.laborCost ? scenario.calculations.laborCost.toLocaleString() : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {scenario.calculations.laborPercentage 
                          ? `${scenario.calculations.laborPercentage.toFixed(1)}%` 
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {comparison && (
          <Card>
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
      </div>
    </PageLayout>
  );
};

export default ScenarioManager;
