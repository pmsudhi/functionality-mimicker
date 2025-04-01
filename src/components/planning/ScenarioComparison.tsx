
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown, Minus, ArrowRightLeft } from "lucide-react";
import { mockScenarios, mockOutlets, mockBrands, mockPositions } from "@/services/mockData";
import { compareScenarios } from "@/services/calculationService";

const ScenarioComparison = () => {
  const [baseScenarioId, setBaseScenarioId] = useState(mockScenarios[0].id);
  const [compareScenarioId, setCompareScenarioId] = useState(mockScenarios[1] ? mockScenarios[1].id : mockScenarios[0].id);
  
  // Find the selected scenarios
  const baseScenario = mockScenarios.find(s => s.id === baseScenarioId);
  const compareScenario = mockScenarios.find(s => s.id === compareScenarioId);
  
  // Get related outlet and brand information
  const baseOutlet = baseScenario ? mockOutlets.find(o => o.id === baseScenario.outletId) : null;
  const baseBrand = baseOutlet ? mockBrands.find(b => b.id === baseOutlet.brandId) : null;
  
  const compareOutlet = compareScenario ? mockOutlets.find(o => o.id === compareScenario.outletId) : null;
  const compareBrand = compareOutlet ? mockBrands.find(b => b.id === compareOutlet.brandId) : null;
  
  // Generate comparison data if both scenarios are selected
  const comparison = (baseScenario && compareScenario) 
    ? compareScenarios(baseScenario, compareScenario)
    : null;
  
  // Helper function to render difference values with color and icons
  const renderDifference = (value: number, reverse = false) => {
    const isPositive = reverse ? value < 0 : value > 0;
    const isNeutral = value === 0;
    
    return (
      <div className={`flex items-center font-medium ${isNeutral ? 'text-muted-foreground' : (isPositive ? 'text-green-600' : 'text-red-600')}`}>
        {isNeutral ? (
          <Minus className="mr-1 h-4 w-4" />
        ) : isPositive ? (
          <ChevronUp className="mr-1 h-4 w-4" />
        ) : (
          <ChevronDown className="mr-1 h-4 w-4" />
        )}
        {value.toFixed(1)}
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Scenario Comparison</h2>
        <Button 
          variant="outline"
          disabled={!baseScenario || !compareScenario}
          onClick={() => {
            // Swap the scenarios
            setBaseScenarioId(compareScenarioId);
            setCompareScenarioId(baseScenarioId);
          }}
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Swap Scenarios
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Base Scenario</label>
          <Select value={baseScenarioId} onValueChange={setBaseScenarioId}>
            <SelectTrigger>
              <SelectValue placeholder="Select base scenario" />
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
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Comparison Scenario</label>
          <Select value={compareScenarioId} onValueChange={setCompareScenarioId}>
            <SelectTrigger>
              <SelectValue placeholder="Select comparison scenario" />
            </SelectTrigger>
            <SelectContent>
              {mockScenarios.filter(s => s.id !== baseScenarioId).length > 0 ? (
                mockScenarios.filter(s => s.id !== baseScenarioId).map(scenario => {
                  const outlet = mockOutlets.find(o => o.id === scenario.outletId);
                  return (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name} ({outlet?.name})
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem value={mockScenarios[0]?.id || "fallback"}>
                  No other scenarios available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {baseScenario && compareScenario && comparison && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Key Differences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {comparison.highlights.map((highlight, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Staffing Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead className="text-center">{baseScenario.name}</TableHead>
                      <TableHead className="text-center">{compareScenario.name}</TableHead>
                      <TableHead className="text-center">Difference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(comparison.staffingDifference).map(([posId, diff]) => {
                      const position = mockPositions.find(p => p.id === posId);
                      if (!position) return null;
                      
                      const baseReq = baseScenario.staffingRequirements.find(r => r.positionId === posId);
                      const compareReq = compareScenario.staffingRequirements.find(r => r.positionId === posId);
                      
                      const baseCount = baseReq ? baseReq.count : 0;
                      const compareCount = compareReq ? compareReq.count : 0;
                      
                      return (
                        <TableRow key={posId}>
                          <TableCell className="font-medium">{position.name}</TableCell>
                          <TableCell className="text-center">{baseCount.toFixed(1)}</TableCell>
                          <TableCell className="text-center">{compareCount.toFixed(1)}</TableCell>
                          <TableCell className="text-center">
                            {renderDifference(diff)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell className="font-bold">Total Staff</TableCell>
                      <TableCell className="text-center font-bold">
                        {Math.ceil(baseScenario.calculations.totalStaff)}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {Math.ceil(compareScenario.calculations.totalStaff)}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderDifference(compareScenario.calculations.totalStaff - baseScenario.calculations.totalStaff)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-center">{baseScenario.name}</TableHead>
                      <TableHead className="text-center">{compareScenario.name}</TableHead>
                      <TableHead className="text-center">Difference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Labor Cost</TableCell>
                      <TableCell className="text-center">
                        {baseScenario.calculations.laborCost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {compareScenario.calculations.laborCost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderDifference(comparison.costDifference, true)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Labor Cost %</TableCell>
                      <TableCell className="text-center">
                        {baseScenario.calculations.laborCostPercentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        {compareScenario.calculations.laborCostPercentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        {renderDifference(comparison.costPercentageDifference, true)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Revenue per Labor Hour</TableCell>
                      <TableCell className="text-center">
                        {baseScenario.calculations.revenuePerLaborHour.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {compareScenario.calculations.revenuePerLaborHour.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderDifference(comparison.efficiencyDifference)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Covers per Labor Hour</TableCell>
                      <TableCell className="text-center">
                        {baseScenario.calculations.coversPerLaborHour.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {compareScenario.calculations.coversPerLaborHour.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderDifference(
                          compareScenario.calculations.coversPerLaborHour - 
                          baseScenario.calculations.coversPerLaborHour
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Differences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Space Parameters</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Area</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.spaceParameters.totalArea} sqm</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.spaceParameters.totalArea} sqm</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Area per Cover</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.spaceParameters.areaPerCover} sqm</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.spaceParameters.areaPerCover} sqm</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>FOH Percentage</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.spaceParameters.fohPercentage}%</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.spaceParameters.fohPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Service Parameters</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Covers per Waiter</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.serviceParameters.coversPerWaiter}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.serviceParameters.coversPerWaiter}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Runner to Waiter Ratio</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.serviceParameters.runnerToWaiterRatio}%</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.serviceParameters.runnerToWaiterRatio}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Kitchen Stations</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.serviceParameters.kitchenStations}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.serviceParameters.kitchenStations}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Revenue Parameters</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Spend per Guest</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.revenueParameters.averageSpendPerGuest}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.revenueParameters.averageSpendPerGuest}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guest Dwelling Time</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.revenueParameters.guestDwellingTime} min</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.revenueParameters.guestDwellingTime} min</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Table Turn Time</span>
                        <div className="flex items-center space-x-2">
                          <span>{baseScenario.revenueParameters.tableTurnTime} min</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{compareScenario.revenueParameters.tableTurnTime} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Staffing Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
                  <p className="text-muted-foreground">
                    Staffing comparison chart
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Key Insights</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        The {compareScenario.serviceParameters.coversPerWaiter > baseScenario.serviceParameters.coversPerWaiter ? "increased" : "decreased"} covers per waiter results in {Math.abs(compareScenario.calculations.totalStaff - baseScenario.calculations.totalStaff).toFixed(1)} {compareScenario.calculations.totalStaff > baseScenario.calculations.totalStaff ? "more" : "fewer"} total staff.
                      </li>
                      <li>
                        Labor cost percentage is {Math.abs(comparison.costPercentageDifference).toFixed(1)}% {comparison.costPercentageDifference > 0 ? "higher" : "lower"} in the comparison scenario.
                      </li>
                      <li>
                        Efficiency (measured by revenue per labor hour) is {Math.abs(comparison.efficiencyDifference).toFixed(2)} {comparison.efficiencyDifference > 0 ? "higher" : "lower"} in the comparison scenario.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommendation</h3>
                    <p className="text-sm">
                      {comparison.efficiencyDifference > 0 && comparison.costPercentageDifference < 0
                        ? `The comparison scenario shows both improved efficiency and lower labor costs, making it the recommended choice.`
                        : comparison.efficiencyDifference > 0
                        ? `The comparison scenario shows higher efficiency but at a higher labor cost. This may be justified if service quality is a priority.`
                        : comparison.costPercentageDifference < 0
                        ? `The comparison scenario has lower labor costs but reduced efficiency. This may be appropriate for cost-cutting initiatives.`
                        : `The base scenario appears to be more optimal based on both efficiency and labor cost metrics.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {(!baseScenario || !compareScenario) && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-md">
          <h3 className="text-lg font-medium mb-2">No Scenarios Selected</h3>
          <p className="text-center text-muted-foreground mb-6">
            Please select both a base scenario and a comparison scenario to see the comparison analysis.
          </p>
          <Button onClick={() => setBaseScenarioId(mockScenarios[0]?.id || "")}>
            Select Scenarios
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScenarioComparison;
