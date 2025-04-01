
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { mockScenarios, mockOutlets } from "@/services/mockData";
import { BarChart, BarChart2, TrendingUp, Users } from "lucide-react";

const EfficiencyMetrics = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  const [utilization, setUtilization] = useState(80);
  
  // Find the selected scenario
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  const outlet = scenario ? mockOutlets.find(o => o.id === scenario.outletId) : null;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Efficiency Metrics</h2>
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue per Labor Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario?.calculations.revenuePerLaborHour.toFixed(2) || "--"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {scenario?.calculations.revenuePerLaborHour || 0 > 550 ? "Above" : "Below"} industry standard
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Covers per Labor Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario?.calculations.coversPerLaborHour.toFixed(2) || "--"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {scenario?.calculations.coversPerLaborHour || 0 > 3.5 ? "Above" : "Below"} industry standard
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Staff Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario?.efficiencyParameters.staffUtilizationRate
                  ? (scenario.efficiencyParameters.staffUtilizationRate * 100).toFixed(0)
                  : "--"}%
              </span>
            </div>
            <Progress 
              value={scenario?.efficiencyParameters.staffUtilizationRate
                ? (scenario.efficiencyParameters.staffUtilizationRate * 100)
                : 0} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Position Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
              <p className="text-muted-foreground">Position efficiency chart</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Server/Waiter Efficiency</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    defaultValue={[85]} 
                    min={50} 
                    max={100} 
                    step={1}
                    className="flex-1" 
                  />
                  <span className="w-12 text-right font-medium">85%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Kitchen Staff Efficiency</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    defaultValue={[82]} 
                    min={50} 
                    max={100} 
                    step={1}
                    className="flex-1" 
                  />
                  <span className="w-12 text-right font-medium">82%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Runner/Busser Efficiency</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    defaultValue={[78]} 
                    min={50} 
                    max={100} 
                    step={1}
                    className="flex-1" 
                  />
                  <span className="w-12 text-right font-medium">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Staff Utilization Rate</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    value={[utilization]} 
                    min={50} 
                    max={100} 
                    step={1}
                    className="flex-1"
                    onValueChange={(vals) => setUtilization(vals[0])}
                  />
                  <span className="w-12 text-right font-medium">{utilization}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Percentage of time staff is engaged in productive activities
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Technology Impact</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    defaultValue={[8]} 
                    min={0} 
                    max={25} 
                    step={1}
                    className="flex-1" 
                  />
                  <span className="w-12 text-right font-medium">8%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Labor reduction achieved through technology implementation
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Cross-Training Capability</Label>
                <div className="flex items-center space-x-4">
                  <Slider 
                    defaultValue={[12]} 
                    min={0} 
                    max={30} 
                    step={1}
                    className="flex-1" 
                  />
                  <span className="w-12 text-right font-medium">12%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Percentage of staff that can cover multiple roles
                </p>
              </div>
              
              <div className="mt-4">
                <Button className="w-full">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Recalculate Efficiency
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Benchmarking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
            <p className="text-muted-foreground">Efficiency benchmarking chart</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Industry Benchmarks</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue per Labor Hour</span>
                  <span className="font-medium">550</span>
                </div>
                <div className="flex justify-between">
                  <span>Covers per Labor Hour</span>
                  <span className="font-medium">3.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Utilization Rate</span>
                  <span className="font-medium">82%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Your Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue per Labor Hour</span>
                  <span className="font-medium">{scenario?.calculations.revenuePerLaborHour.toFixed(2) || "--"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Covers per Labor Hour</span>
                  <span className="font-medium">{scenario?.calculations.coversPerLaborHour.toFixed(2) || "--"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Utilization Rate</span>
                  <span className="font-medium">
                    {scenario?.efficiencyParameters.staffUtilizationRate
                      ? (scenario.efficiencyParameters.staffUtilizationRate * 100).toFixed(0)
                      : "--"}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Improvement Potential</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue per Labor Hour</span>
                  <span className={`font-medium ${(scenario?.calculations.revenuePerLaborHour || 0) < 550 ? "text-red-500" : "text-green-500"}`}>
                    {(scenario?.calculations.revenuePerLaborHour || 0) < 550
                      ? `+${(550 - (scenario?.calculations.revenuePerLaborHour || 0)).toFixed(2)}`
                      : "On Target"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Covers per Labor Hour</span>
                  <span className={`font-medium ${(scenario?.calculations.coversPerLaborHour || 0) < 3.5 ? "text-red-500" : "text-green-500"}`}>
                    {(scenario?.calculations.coversPerLaborHour || 0) < 3.5
                      ? `+${(3.5 - (scenario?.calculations.coversPerLaborHour || 0)).toFixed(2)}`
                      : "On Target"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Utilization Rate</span>
                  <span className={`font-medium ${(scenario?.efficiencyParameters.staffUtilizationRate || 0) < 0.82 ? "text-red-500" : "text-green-500"}`}>
                    {(scenario?.efficiencyParameters.staffUtilizationRate || 0) < 0.82
                      ? `+${((0.82 - (scenario?.efficiencyParameters.staffUtilizationRate || 0)) * 100).toFixed(0)}%`
                      : "On Target"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EfficiencyMetrics;
