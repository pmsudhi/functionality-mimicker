
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Plus, Trash, Save } from 'lucide-react';

const ScenarioBuilderTab = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Drag & Drop Scenario Builder</CardTitle>
        <CardDescription>Build your scenario by adding and arranging parameter blocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Button variant="outline" className="flex items-center justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Space Configuration
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Service Parameters
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Operational Hours
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Efficiency Drivers
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Custom Parameters
          </Button>
        </div>
        
        <div className="mt-6 space-y-6">
          <Card className="border-2 border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium flex items-center">
                  <span className="bg-blue-100 text-blue-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2">1</span>
                  Space Configuration
                </CardTitle>
                <CardDescription className="text-xs">
                  Adjust parameters for this block
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">3 parameters</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Total Area (sqm)</Label>
                  <span className="font-medium">350</span>
                </div>
                <Slider 
                  value={[350]} 
                  min={100} 
                  max={1000} 
                  step={10}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>FOH Percentage</Label>
                  <span className="font-medium">70%</span>
                </div>
                <Slider 
                  value={[70]} 
                  min={40} 
                  max={80} 
                  step={5}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Seating Capacity</Label>
                  <span className="font-medium">120</span>
                </div>
                <Slider 
                  value={[120]} 
                  min={50} 
                  max={200} 
                  step={10}
                  disabled
                />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-3 w-3" />
                Add Parameter
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-green-100 bg-green-50/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium flex items-center">
                  <span className="bg-green-100 text-green-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2">2</span>
                  Service Parameters
                </CardTitle>
                <CardDescription className="text-xs">
                  Adjust parameters for this block
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">3 parameters</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Parameters Block Contents */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Covers per Waiter</Label>
                  <span className="font-medium">16</span>
                </div>
                <Slider 
                  value={[16]} 
                  min={12} 
                  max={24} 
                  step={4}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Runner Ratio</Label>
                  <span className="font-medium">2</span>
                </div>
                <Slider 
                  value={[2]} 
                  min={1} 
                  max={4} 
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Service Style</Label>
                  <span className="font-medium">Full Service</span>
                </div>
                <div className="flex">
                  <div className="w-full h-6 bg-green-100 rounded-full flex items-center">
                    <div className="w-1/2 h-4 mx-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-3 w-3" />
                Add Parameter
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-yellow-100 bg-yellow-50/30">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium flex items-center">
                  <span className="bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2">3</span>
                  Operational Hours
                </CardTitle>
                <CardDescription className="text-xs">
                  Adjust parameters for this block
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">3 parameters</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Operational Hours Block Contents */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Operating Days per Week</Label>
                  <span className="font-medium">7</span>
                </div>
                <Slider 
                  value={[7]} 
                  min={5} 
                  max={7} 
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Daily Operating Hours</Label>
                  <span className="font-medium">12</span>
                </div>
                <Slider 
                  value={[12]} 
                  min={6} 
                  max={24} 
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Peak Hour Factor</Label>
                  <span className="font-medium">1.5</span>
                </div>
                <Slider 
                  value={[15]} 
                  min={10} 
                  max={20} 
                  step={1}
                />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-3 w-3" />
                Add Parameter
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioBuilderTab;
