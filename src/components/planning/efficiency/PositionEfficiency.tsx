
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const PositionEfficiency = () => {
  return (
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
  );
};

export default PositionEfficiency;
