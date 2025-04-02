
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

interface EfficiencyFactorsProps {
  utilization: number;
  setUtilization: (value: number) => void;
}

const EfficiencyFactors = ({ utilization, setUtilization }: EfficiencyFactorsProps) => {
  return (
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
  );
};

export default EfficiencyFactors;
