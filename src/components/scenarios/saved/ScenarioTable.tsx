
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockOutlets, mockBrands } from "@/services/mockData";
import { Scenario } from "@/types/modelTypes";
import { Download, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScenarioTableProps {
  scenarios: Scenario[];
  selectedScenarios: string[];
  onScenarioSelection: (id: string, isSelected: boolean) => void;
}

const ScenarioTable = ({ scenarios, selectedScenarios, onScenarioSelection }: ScenarioTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12 p-0"></TableHead>
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
          {scenarios.map(scenario => {
            const outlet = mockOutlets.find(o => o.id === scenario.outletId);
            const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
            const isSelected = selectedScenarios.includes(scenario.id);
            
            return (
              <TableRow key={scenario.id} className={isSelected ? "bg-primary/5" : ""}>
                <TableCell className="pr-0">
                  <Checkbox 
                    id={`select-${scenario.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => onScenarioSelection(scenario.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {scenario.name}
                  {scenario.isBaseline && (
                    <Badge variant="outline" className="ml-2 text-xs bg-blue-500/10 text-blue-700 hover:bg-blue-500/10 border-blue-200">
                      Baseline
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{brand?.name || "Unknown"}</TableCell>
                <TableCell>{outlet?.name || "Unknown"}</TableCell>
                <TableCell className="text-right font-medium">
                  {scenario.calculations.totalStaff ? Math.ceil(scenario.calculations.totalStaff) : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {scenario.calculations.laborCost ? Number(scenario.calculations.laborCost).toLocaleString() : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {scenario.calculations.laborPercentage 
                    ? (
                        <div className="flex items-center justify-end gap-2">
                          <span>{scenario.calculations.laborPercentage.toFixed(1)}%</span>
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                scenario.calculations.laborPercentage <= 23 ? 'bg-green-500' :
                                scenario.calculations.laborPercentage <= 27 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${Math.min(scenario.calculations.laborPercentage * 2, 100)}%` }}
                            />
                          </div>
                        </div>
                      ) 
                    : "N/A"}
                </TableCell>
                <TableCell>{new Date(scenario.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScenarioTable;
