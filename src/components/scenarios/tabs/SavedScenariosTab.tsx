
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Compare } from 'lucide-react';
import ScenarioTable from '../saved/ScenarioTable';
import { mockScenarios } from '@/services/mockData';
import { ScenarioComparison } from '@/types/extraTypes';
import { Button } from '@/components/ui/button';

const SavedScenariosTab = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [comparison, setComparison] = useState<ScenarioComparison | null>(null);

  const handleScenarioSelection = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedScenarios(prev => [...prev, id]);
    } else {
      setSelectedScenarios(prev => prev.filter(scenarioId => scenarioId !== id));
    }
  };

  const handleCompareScenarios = () => {
    // This would typically connect to a real comparison service
    // For now we'll just simulate a comparison when there are 2 scenarios selected
    if (selectedScenarios.length === 2) {
      const scenario1 = mockScenarios.find(s => s.id === selectedScenarios[0]);
      const scenario2 = mockScenarios.find(s => s.id === selectedScenarios[1]);
      
      if (scenario1 && scenario2) {
        setComparison({
          scenario1: {
            id: scenario1.id,
            name: scenario1.name,
            totalStaff: scenario1.calculations.totalStaff || 0,
            laborCost: scenario1.calculations.laborCost || 0,
            laborPercentage: scenario1.calculations.laborPercentage || 0
          },
          scenario2: {
            id: scenario2.id,
            name: scenario2.name,
            totalStaff: scenario2.calculations.totalStaff || 0,
            laborCost: scenario2.calculations.laborCost || 0,
            laborPercentage: scenario2.calculations.laborPercentage || 0
          },
          staffDiff: ((scenario2.calculations.totalStaff || 0) - (scenario1.calculations.totalStaff || 0)),
          costDiff: ((scenario2.calculations.laborCost || 0) - (scenario1.calculations.laborCost || 0)),
          laborPercentageDiff: ((scenario2.calculations.laborPercentage || 0) - (scenario1.calculations.laborPercentage || 0)),
          highlights: [
            `${scenario2.name} has ${Math.abs(((scenario2.calculations.totalStaff || 0) - (scenario1.calculations.totalStaff || 0)))} ${((scenario2.calculations.totalStaff || 0) - (scenario1.calculations.totalStaff || 0)) < 0 ? 'fewer' : 'more'} staff members than ${scenario1.name}.`,
            `Labor cost is ${Math.abs(((scenario2.calculations.laborCost || 0) - (scenario1.calculations.laborCost || 0))).toLocaleString()} SAR ${((scenario2.calculations.laborCost || 0) - (scenario1.calculations.laborCost || 0)) < 0 ? 'lower' : 'higher'} in ${scenario2.name}.`,
            `Labor percentage is ${Math.abs(((scenario2.calculations.laborPercentage || 0) - (scenario1.calculations.laborPercentage || 0))).toFixed(1)}% ${((scenario2.calculations.laborPercentage || 0) - (scenario1.calculations.laborPercentage || 0)) < 0 ? 'lower' : 'higher'} in ${scenario2.name}.`
          ]
        });
      }
    } else {
      setComparison(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-md">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Saved Scenarios</CardTitle>
                <CardDescription>
                  Select scenarios to compare or manage individual scenarios
                </CardDescription>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleCompareScenarios}
              disabled={selectedScenarios.length !== 2}
            >
              <Compare className="h-4 w-4" />
              Compare Selected
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScenarioTable 
            scenarios={mockScenarios} 
            selectedScenarios={selectedScenarios}
            onScenarioSelection={handleScenarioSelection}
          />
        </CardContent>
      </Card>
      
      {comparison && (
        <Card className="border shadow-sm bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-md">
                <Compare className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Scenario Comparison</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 text-primary">{comparison.scenario1.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Staff Count</div>
                    <div className="text-lg font-medium">{Math.ceil(comparison.scenario1.totalStaff)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor Cost</div>
                    <div className="text-lg font-medium">{comparison.scenario1.laborCost.toLocaleString()} SAR</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor %</div>
                    <div className="text-lg font-medium">{comparison.scenario1.laborPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 text-primary">{comparison.scenario2.name}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Staff Count</div>
                    <div className="text-lg font-medium">{Math.ceil(comparison.scenario2.totalStaff)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor Cost</div>
                    <div className="text-lg font-medium">{comparison.scenario2.laborCost.toLocaleString()} SAR</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor %</div>
                    <div className="text-lg font-medium">{comparison.scenario2.laborPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 text-primary">Difference</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Staff Count</div>
                    <div className={`text-lg font-medium ${comparison.staffDiff < 0 ? 'text-green-600' : comparison.staffDiff > 0 ? 'text-red-600' : ''}`}>
                      {comparison.staffDiff > 0 ? '+' : ''}{comparison.staffDiff.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor Cost</div>
                    <div className={`text-lg font-medium ${comparison.costDiff < 0 ? 'text-green-600' : comparison.costDiff > 0 ? 'text-red-600' : ''}`}>
                      {comparison.costDiff > 0 ? '+' : ''}{comparison.costDiff.toLocaleString()} SAR
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Labor %</div>
                    <div className={`text-lg font-medium ${comparison.laborPercentageDiff < 0 ? 'text-green-600' : comparison.laborPercentageDiff > 0 ? 'text-red-600' : ''}`}>
                      {comparison.laborPercentageDiff > 0 ? '+' : ''}{comparison.laborPercentageDiff.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-dashed rounded-lg">
              <h3 className="text-sm font-medium mb-2 text-primary">Key Observations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {comparison.highlights.map((highlight, index) => (
                  <li key={index} className="text-muted-foreground">{highlight}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavedScenariosTab;
