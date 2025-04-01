
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Plus,
  Save,
  Trash,
  Copy,
  Edit,
  ChevronsUp,
  ChevronsDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScenarioBuilder = () => {
  const { toast } = useToast();
  const [scenarioName, setScenarioName] = useState("New Scenario");
  const [selectedBrand, setSelectedBrand] = useState("white-robata");
  const [selectedOutlet, setSelectedOutlet] = useState("mall-of-dhahran");
  const [ramadanAdjustment, setRamadanAdjustment] = useState(false);
  
  // Space parameters
  const [totalArea, setTotalArea] = useState(300);
  const [fohPercentage, setFohPercentage] = useState(65);
  const [externalSeating, setExternalSeating] = useState(20);
  const [areaPerCover, setAreaPerCover] = useState("1.67");
  
  // Calculated values
  const fohArea = Math.round(totalArea * (fohPercentage / 100));
  const internalSeating = Math.round(fohArea / parseFloat(areaPerCover));
  const totalSeating = internalSeating + externalSeating;
  
  const handleSaveScenario = () => {
    toast({
      title: "Scenario Saved",
      description: `"${scenarioName}" has been saved successfully.`
    });
  };
  
  const handleReset = () => {
    setTotalArea(300);
    setFohPercentage(65);
    setExternalSeating(20);
    setAreaPerCover("1.67");
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to default values."
    });
  };
  
  const handleApplyChanges = () => {
    toast({
      title: "Changes Applied",
      description: "Your changes have been applied to the scenario."
    });
  };
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Scenario Configuration</CardTitle>
            <CardDescription>Define your scenario parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input 
                id="scenario-name" 
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white-robata">White Robata</SelectItem>
                  <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
                  <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
                  <SelectItem value="nomad">Nomad</SelectItem>
                  <SelectItem value="swaikhat">Swaikhat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="outlet">Outlet</Label>
              <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
                <SelectTrigger id="outlet">
                  <SelectValue placeholder="Select Outlet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
                  <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
                  <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
                  <SelectItem value="al-nakheel-mall">Al Nakheel Mall</SelectItem>
                  <SelectItem value="jeddah-corniche">Jeddah Corniche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="sar">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sar">SAR (Saudi Riyal)</SelectItem>
                  <SelectItem value="usd">USD (US Dollar)</SelectItem>
                  <SelectItem value="aed">AED (Emirati Dirham)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Switch 
                id="ramadan-adjustment" 
                checked={ramadanAdjustment}
                onCheckedChange={setRamadanAdjustment}
              />
              <Label htmlFor="ramadan-adjustment">Apply Ramadan Adjustment (50% capacity)</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parameter Configuration</CardTitle>
            <CardDescription>Adjust operational parameters for your scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Space Parameters</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Total Restaurant Area (sqm)</Label>
                      <span className="font-medium">{totalArea} sqm</span>
                    </div>
                    <Slider 
                      value={[totalArea]} 
                      min={100} 
                      max={1000} 
                      step={10}
                      onValueChange={(value) => setTotalArea(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>FOH Area Percentage (%)</Label>
                      <span className="font-medium">{fohPercentage}%</span>
                    </div>
                    <Slider 
                      value={[fohPercentage]} 
                      min={40} 
                      max={80} 
                      step={5}
                      onValueChange={(value) => setFohPercentage(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Area per Cover (sqm)</Label>
                    <Select 
                      value={areaPerCover}
                      onValueChange={setAreaPerCover}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area per cover" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.5">1.5 sqm (Fast Casual)</SelectItem>
                        <SelectItem value="1.67">1.67 sqm (Standard)</SelectItem>
                        <SelectItem value="1.86">1.86 sqm (Casual Dining)</SelectItem>
                        <SelectItem value="2.05">2.05 sqm (Casual Dining+)</SelectItem>
                        <SelectItem value="2.32">2.32 sqm (Premium Dining)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>External Seating Capacity</Label>
                      <span className="font-medium">{externalSeating} seats</span>
                    </div>
                    <Slider 
                      value={[externalSeating]} 
                      min={0} 
                      max={100} 
                      step={5}
                      onValueChange={(value) => setExternalSeating(value[0])}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" onClick={handleReset} className="mr-2">
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleApplyChanges}>
                    Apply Changes
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Calculated Values</h3>
                  
                  <div className="space-y-2">
                    <Label>FOH Area (sqm)</Label>
                    <Input 
                      value={fohArea} 
                      readOnly 
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Calculated as {totalArea} sqm × {fohPercentage}%
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Internal Seating Capacity</Label>
                    <Input 
                      value={internalSeating} 
                      readOnly 
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Calculated as {fohArea} sqm ÷ {areaPerCover} sqm per cover
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Total Seating Capacity</Label>
                    <Input 
                      value={totalSeating} 
                      readOnly 
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Internal ({internalSeating}) + External ({externalSeating})
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>BOH Area (sqm)</Label>
                    <Input 
                      value={totalArea - fohArea} 
                      readOnly 
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Calculated as {totalArea} sqm × {100 - fohPercentage}%
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="w-full" onClick={handleSaveScenario}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Scenario
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Drag & Drop Scenario Builder</CardTitle>
          <CardDescription>Build your scenario by dragging and arranging parameter blocks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    <span className="font-medium">{totalArea}</span>
                  </div>
                  <Slider 
                    value={[totalArea]} 
                    min={100} 
                    max={1000} 
                    step={10}
                    onValueChange={(value) => setTotalArea(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>FOH Percentage</Label>
                    <span className="font-medium">{fohPercentage}%</span>
                  </div>
                  <Slider 
                    value={[fohPercentage]} 
                    min={40} 
                    max={80} 
                    step={5}
                    onValueChange={(value) => setFohPercentage(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Seating Capacity</Label>
                    <span className="font-medium">{totalSeating}</span>
                  </div>
                  <Slider 
                    value={[totalSeating]} 
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
          
          <div className="mt-6 flex justify-center">
            <Button className="px-8">
              <Save className="mr-2 h-4 w-4" />
              Save Scenario
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioBuilder;
