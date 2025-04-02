
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { mockScenarios } from "@/services/mockData";
import { compareScenarios } from "@/services/calculationService";
import { ScenarioComparison as ScenarioComparisonType } from "@/types/extraTypes";
import { 
  BarChart,
  BarChart2,
  LineChart
} from "lucide-react";

const ScenarioComparison = () => {
  const [baseScenario, setBaseScenario] = useState(mockScenarios[0].id);
  const [comparisonScenario, setComparisonScenario] = useState(mockScenarios[1].id);
  const [comparisonData, setComparisonData] = useState<ScenarioComparisonType | null>(null);
  
  useEffect(() => {
    // Find the selected scenarios
    const scenarioA = mockScenarios.find(s => s.id === baseScenario);
    const scenarioB = mockScenarios.find(s => s.id === comparisonScenario);
    
    if (scenarioA && scenarioB) {
      try {
        const comparisonResult = compareScenarios(scenarioA, scenarioB);
        setComparisonData(comparisonResult);
      } catch (error) {
        console.error("Error comparing scenarios:", error);
        setComparisonData(null);
      }
    } else {
      setComparisonData(null);
    }
  }, [baseScenario, comparisonScenario]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Scenario Comparison</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Baseline Scenario</label>
          <Select value={baseScenario} onValueChange={setBaseScenario}>
            <SelectTrigger>
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              {mockScenarios.map(scenario => (
                <SelectItem key={scenario.id} value={scenario.id}>{scenario.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Comparison Scenario</label>
          <Select value={comparisonScenario} onValueChange={setComparisonScenario}>
            <SelectTrigger>
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              {mockScenarios.map(scenario => (
                <SelectItem key={scenario.id} value={scenario.id}>{scenario.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {comparisonData && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Headcount Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">{comparisonData.scenario1.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold">{comparisonData.scenario1.totalStaff.toFixed(0)}</span>
                    <span className="text-sm text-muted-foreground">staff</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    FOH/BOH Ratio: {comparisonData.scenario1.fohBohRatio.toFixed(1)}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">{comparisonData.scenario2.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold">{comparisonData.scenario2.totalStaff.toFixed(0)}</span>
                    <span className="text-sm text-muted-foreground">staff</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    FOH/BOH Ratio: {comparisonData.scenario2.fohBohRatio.toFixed(1)}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Difference</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-3xl font-bold ${comparisonData.staffDiff > 0 ? 'text-amber-500' : comparisonData.staffDiff < 0 ? 'text-green-500' : ''}`}>
                      {comparisonData.staffDiff > 0 ? '+' : ''}{comparisonData.staffDiff.toFixed(0)}
                    </span>
                    <span className="text-sm text-muted-foreground">staff</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.abs(comparisonData.staffDiff).toFixed(0)} {comparisonData.staffDiff > 0 ? 'more' : 'fewer'} staff members
                  </p>
                </div>
              </div>
              
              <div className="h-60 mt-6 flex items-center justify-center border-2 border-dashed rounded-md">
                <div className="text-center">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mt-2">Headcount comparison chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Labor Cost</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">${comparisonData.scenario1.laborCost.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Baseline</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Labor Cost</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">${comparisonData.scenario2.laborCost.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Comparison</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Difference</h3>
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold ${comparisonData.costDiff > 0 ? 'text-amber-500' : comparisonData.costDiff < 0 ? 'text-green-500' : ''}`}>
                        {comparisonData.costDiff > 0 ? '+' : ''}{comparisonData.costDiff.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{(Math.abs(comparisonData.costDiff / comparisonData.scenario1.laborCost) * 100).toFixed(1)}% change</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Labor %</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">{comparisonData.scenario1.laborPercentage.toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Baseline</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Labor %</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">{comparisonData.scenario2.laborPercentage.toFixed(1)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Comparison</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Difference</h3>
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold ${comparisonData.laborPercentageDiff > 0 ? 'text-amber-500' : comparisonData.laborPercentageDiff < 0 ? 'text-green-500' : ''}`}>
                        {comparisonData.laborPercentageDiff > 0 ? '+' : ''}{comparisonData.laborPercentageDiff.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Percentage points change</p>
                  </div>
                </div>
                
                <div className="h-40 mt-4 flex items-center justify-center border-2 border-dashed rounded-md">
                  <div className="text-center">
                    <BarChart2 className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mt-1">Cost comparison chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Revenue/Labor Hour</h3>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">${comparisonData.scenario1.totalStaff ? (comparisonData.scenario1.laborCost / comparisonData.scenario1.totalStaff / 160).toFixed(2) : "0.00"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Baseline</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Revenue/Labor Hour</h3>
                    <div className="flex items-center">
                      <span className="text-xl font-bold">${comparisonData.scenario2.totalStaff ? (comparisonData.scenario2.laborCost / comparisonData.scenario2.totalStaff / 160).toFixed(2) : "0.00"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Comparison</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Difference</h3>
                    <div className="flex items-center">
                      <span className={`text-xl font-bold ${comparisonData.efficiencyDifference > 0 ? 'text-green-500' : comparisonData.efficiencyDifference < 0 ? 'text-amber-500' : ''}`}>
                        {comparisonData.efficiencyDifference > 0 ? '+' : ''}{comparisonData.efficiencyDifference.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.abs(comparisonData.efficiencyDifference) > 0 
                        ? `${(Math.abs(comparisonData.efficiencyDifference) / (comparisonData.scenario1.laborCost / comparisonData.scenario1.totalStaff / 160) * 100).toFixed(1)}% ${comparisonData.efficiencyDifference > 0 ? 'improvement' : 'reduction'}`
                        : 'No change'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <h3 className="text-sm font-medium">Key Observations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {comparisonData.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                    {comparisonData.highlights.length === 0 && (
                      <li>No significant differences detected</li>
                    )}
                  </ul>
                </div>
                
                <div className="h-32 mt-4 flex items-center justify-center border-2 border-dashed rounded-md">
                  <div className="text-center">
                    <LineChart className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mt-1">Efficiency trend chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {!comparisonData && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-muted-foreground">Select two different scenarios to compare</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScenarioComparison;
