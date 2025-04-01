
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ScenarioComparison = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Scenario Comparison</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Baseline Scenario</label>
          <Select defaultValue="base">
            <SelectTrigger>
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base">Base Scenario</SelectItem>
              <SelectItem value="alt1">Alternative 1</SelectItem>
              <SelectItem value="alt2">Alternative 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Comparison Scenario</label>
          <Select defaultValue="expansion">
            <SelectTrigger>
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expansion">Expansion Plan</SelectItem>
              <SelectItem value="alt1">Alternative 1</SelectItem>
              <SelectItem value="alt2">Alternative 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Headcount Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">Headcount comparison chart</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-muted-foreground">Cost comparison chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-muted-foreground">Efficiency comparison chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioComparison;
