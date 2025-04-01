
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StatComparison } from "@/components/ui/stat-comparison";
import { ScenarioComparison } from "@/types/extraTypes";

interface SavedScenariosTabProps {
  filteredScenarios: typeof mockScenarios;
  comparison: ScenarioComparison | null;
}

const SavedScenariosTab = ({ filteredScenarios, comparison }: SavedScenariosTabProps) => {
  return (
    <>
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
      
      {comparison && <ScenarioComparisonCard comparison={comparison} />}
    </>
  );
};

// Extracted the comparison card as a separate component
const ScenarioComparisonCard = ({ comparison }: { comparison: ScenarioComparison }) => (
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
);

export default SavedScenariosTab;
