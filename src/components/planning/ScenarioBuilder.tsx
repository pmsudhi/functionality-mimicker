
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Edit,
  Copy,
  ChevronRight,
  Globe,
  DollarSign,
  Users,
  BarChart2,
  Clock
} from "lucide-react";
import { mockBrands, mockLocations, mockOutlets, mockScenarios, createSampleScenario } from "@/services/mockData";

const ScenarioBuilder = () => {
  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("space");
  const [selectedBrand, setSelectedBrand] = useState(mockBrands[0].id);
  const [selectedLocation, setSelectedLocation] = useState(mockLocations[0].id);
  const [coverPerWaiter, setCoverPerWaiter] = useState<number>(16);
  const [areaPerCover, setAreaPerCover] = useState<number>(1.67);
  const [runnerRatio, setRunnerRatio] = useState<number>(50);
  const [totalArea, setTotalArea] = useState<number>(300);
  const [fohPercentage, setFohPercentage] = useState<number>(65);
  
  // Get brand and location details
  const selectedBrandDetails = mockBrands.find(b => b.id === selectedBrand);
  const selectedLocationDetails = mockLocations.find(l => l.id === selectedLocation);
  
  const handleCreateScenario = () => {
    // Here you would normally save the scenario to your state/backend
    setIsScenarioOpen(false);
  };
  
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Scenario Builder</h2>
        <Sheet open={isScenarioOpen} onOpenChange={setIsScenarioOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Scenario
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md md:max-w-lg">
            <SheetHeader>
              <SheetTitle>Create New Scenario</SheetTitle>
            </SheetHeader>
            
            <div className="py-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label>Scenario Name</Label>
                  <Input placeholder="e.g., Optimal Weekend Staffing" />
                </div>
                
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select defaultValue={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBrands.map(brand => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name} ({brand.serviceStyle})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select defaultValue={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLocations.map(location => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}, {location.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="space" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="space">Space</TabsTrigger>
                  <TabsTrigger value="service">Service</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="hours">Hours</TabsTrigger>
                  <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                </TabsList>
                
                <TabsContent value="space" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Total Restaurant Area (sqm)</Label>
                      <span className="text-sm">{totalArea}</span>
                    </div>
                    <Slider 
                      value={[totalArea]} 
                      min={100} 
                      max={1000} 
                      step={10}
                      onValueChange={(values) => setTotalArea(values[0])} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>FOH Area Percentage</Label>
                      <span className="text-sm">{fohPercentage}%</span>
                    </div>
                    <Slider 
                      value={[fohPercentage]} 
                      min={40} 
                      max={80} 
                      step={5}
                      onValueChange={(values) => setFohPercentage(values[0])} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Area per Cover (sqm)</Label>
                    <Select 
                      defaultValue={areaPerCover.toString()} 
                      onValueChange={(value) => setAreaPerCover(parseFloat(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area per cover" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.5">1.5 sqm (Compact)</SelectItem>
                        <SelectItem value="1.67">1.67 sqm (Standard)</SelectItem>
                        <SelectItem value="1.86">1.86 sqm (Comfortable)</SelectItem>
                        <SelectItem value="2.05">2.05 sqm (Spacious)</SelectItem>
                        <SelectItem value="2.32">2.32 sqm (Premium)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>External Seating</Label>
                    <Input type="number" min="0" max="200" defaultValue="30" />
                  </div>
                </TabsContent>
                
                <TabsContent value="service" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Covers per Waiter</Label>
                    <Select 
                      defaultValue={coverPerWaiter.toString()} 
                      onValueChange={(value) => setCoverPerWaiter(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select covers per waiter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 covers (Premium Service)</SelectItem>
                        <SelectItem value="16">16 covers (High Quality)</SelectItem>
                        <SelectItem value="20">20 covers (Standard)</SelectItem>
                        <SelectItem value="24">24 covers (Efficient)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Runner to Waiter Ratio</Label>
                    <Select 
                      defaultValue={runnerRatio.toString()} 
                      onValueChange={(value) => setRunnerRatio(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select runner ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25% (1 runner per 4 waiters)</SelectItem>
                        <SelectItem value="50">50% (1 runner per 2 waiters)</SelectItem>
                        <SelectItem value="75">75% (3 runners per 4 waiters)</SelectItem>
                        <SelectItem value="100">100% (1 runner per waiter)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Kitchen Stations</Label>
                    <Input type="number" min="2" max="12" defaultValue="6" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Staff per Station</Label>
                    <Input type="number" min="1" max="3" step="0.1" defaultValue="1.8" />
                  </div>
                </TabsContent>
                
                <TabsContent value="revenue" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Average Spend per Guest</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="number" min="0" className="pl-9" defaultValue="120" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Guest Dwelling Time (minutes)</Label>
                    <Input type="number" min="0" defaultValue="75" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Table Turn Time (minutes)</Label>
                    <Input type="number" min="0" defaultValue="90" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Peak Hour Factor</Label>
                    <Input type="number" min="1" max="2" step="0.1" defaultValue="1.4" />
                  </div>
                </TabsContent>
                
                <TabsContent value="hours" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Operating Days (per year)</Label>
                    <Input type="number" min="0" max="365" defaultValue="350" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Default is 350 to account for Ramadan
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Weekday Operating Hours</Label>
                    <Input type="number" min="0" max="24" defaultValue="12" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Weekend Operating Hours</Label>
                    <Input type="number" min="0" max="24" defaultValue="14" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ramadan Capacity Reduction</Label>
                    <div className="flex items-center space-x-2">
                      <Input type="number" min="0" max="100" defaultValue="50" />
                      <span className="text-sm">%</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="efficiency" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Staff Utilization Rate</Label>
                      <span className="text-sm">80%</span>
                    </div>
                    <Slider 
                      defaultValue={[80]} 
                      min={50} 
                      max={100} 
                      step={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Technology Impact</Label>
                      <span className="text-sm">8%</span>
                    </div>
                    <Slider 
                      defaultValue={[8]} 
                      min={0} 
                      max={30} 
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage reduction in labor requirements due to technology
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Cross-Training Capability</Label>
                      <span className="text-sm">12%</span>
                    </div>
                    <Slider 
                      defaultValue={[12]} 
                      min={0} 
                      max={30} 
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage of staff that can cover multiple roles
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setIsScenarioOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateScenario}>Create Scenario</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {mockScenarios.map((scenario, index) => {
          const outlet = mockOutlets.find(o => o.id === scenario.outletId);
          const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
          const location = outlet ? mockLocations.find(l => l.id === outlet.locationId) : null;
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{scenario.name}</CardTitle>
                <CardDescription>
                  {brand?.name} - {location?.name}, {location?.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Staff Required</span>
                      </div>
                      <p className="text-xl font-semibold">{Math.ceil(scenario.calculations.totalStaff)}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>Labor Cost %</span>
                      </div>
                      <p className="text-xl font-semibold">{scenario.calculations.laborCostPercentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Total Area</span>
                      </div>
                      <p className="text-sm">{scenario.spaceParameters.totalArea} sqm</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Covers per Waiter</span>
                      </div>
                      <p className="text-sm">{scenario.serviceParameters.coversPerWaiter}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span>Runner Ratio</span>
                      </div>
                      <p className="text-sm">{scenario.serviceParameters.runnerToWaiterRatio}%</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Capacity</span>
                      </div>
                      <p className="text-sm">{scenario.spaceParameters.totalCapacity || "--"} covers</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="default" size="sm">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Copy className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium">Duplicate Scenario</h4>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Create a copy of an existing scenario as a starting point
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium">Labor Cost Analysis</h4>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Deep dive into your labor costs and find optimization opportunities
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium">Compare Scenarios</h4>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Compare different scenarios side by side to identify the best approach
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
