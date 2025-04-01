
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  RefreshCw, 
  HelpCircle, 
  ArrowLeft
} from "lucide-react";
import { 
  SpaceParameters, 
  ServiceParameters, 
  RevenueParameters, 
  OperationalParameters, 
  EfficiencyParameters,
  ServiceStyle
} from "@/types/modelTypes";
import { mockOutlets, mockBrands, getDefaultParameters } from "@/services/mockData";

const ControlPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const serviceStyle = currentBrand?.serviceStyle as ServiceStyle || "Casual Dining";
  
  const defaultParams = getDefaultParameters(serviceStyle);
  
  const [spaceParams, setSpaceParams] = useState<SpaceParameters>(defaultParams.space);
  const [serviceParams, setServiceParams] = useState<ServiceParameters>(defaultParams.service);
  const [revenueParams, setRevenueParams] = useState<RevenueParameters>(defaultParams.revenue);
  const [operationalParams, setOperationalParams] = useState<OperationalParameters>(defaultParams.operational);
  const [efficiencyParams, setEfficiencyParams] = useState<EfficiencyParameters>(defaultParams.efficiency);
  
  const handleSaveParameters = () => {
    toast({
      title: "Parameters Saved",
      description: "Your changes have been applied to the current outlet.",
    });
  };
  
  const handleResetToDefaults = () => {
    const defaults = getDefaultParameters(serviceStyle);
    setSpaceParams(defaults.space);
    setServiceParams(defaults.service);
    setRevenueParams(defaults.revenue);
    setOperationalParams(defaults.operational);
    setEfficiencyParams(defaults.efficiency);
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to the default values for this outlet.",
    });
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Control Panel</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select an outlet" />
            </SelectTrigger>
            <SelectContent>
              {mockOutlets.map(outlet => (
                <SelectItem key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveParameters}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="space" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="space">Space Parameters</TabsTrigger>
          <TabsTrigger value="service">Service Parameters</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Drivers</TabsTrigger>
          <TabsTrigger value="operational">Operational Hours</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Drivers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="space" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Space Configuration</CardTitle>
              <CardDescription>
                Define the spatial parameters that impact seating capacity and service flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Total Restaurant Area (sqm)</Label>
                  <span className="font-medium">{spaceParams.totalArea} sqm</span>
                </div>
                <Slider 
                  value={[spaceParams.totalArea]} 
                  min={100} 
                  max={1000} 
                  step={10}
                  onValueChange={(value) => setSpaceParams({...spaceParams, totalArea: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>FOH Area Percentage</Label>
                  <span className="font-medium">{spaceParams.fohPercentage}%</span>
                </div>
                <Slider 
                  value={[spaceParams.fohPercentage]} 
                  min={40} 
                  max={80} 
                  step={5}
                  onValueChange={(value) => setSpaceParams({...spaceParams, fohPercentage: value[0]})}
                />
                <p className="text-sm text-muted-foreground">
                  FOH Area: {Math.round(spaceParams.totalArea * (spaceParams.fohPercentage / 100))} sqm
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Area per Cover (sqm)</Label>
                <Select 
                  value={spaceParams.areaPerCover.toString()} 
                  onValueChange={(value) => 
                    setSpaceParams({
                      ...spaceParams, 
                      areaPerCover: parseFloat(value) as 1.5 | 1.67 | 1.86 | 2.05 | 2.32
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area per cover" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.5">1.5 sqm (Fast Casual)</SelectItem>
                    <SelectItem value="1.67">1.67 sqm (Fast Casual+)</SelectItem>
                    <SelectItem value="1.86">1.86 sqm (Casual Dining)</SelectItem>
                    <SelectItem value="2.05">2.05 sqm (Casual Dining+)</SelectItem>
                    <SelectItem value="2.32">2.32 sqm (Premium Dining)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>External Seating Capacity</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="number"
                    value={spaceParams.externalSeating}
                    onChange={(e) => 
                      setSpaceParams({
                        ...spaceParams, 
                        externalSeating: parseInt(e.target.value) || 0
                      })
                    }
                    className="w-24"
                    min="0"
                  />
                  <span className="text-sm text-muted-foreground">seats</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total Seating Capacity:</span>
                  <span>
                    {Math.floor(
                      (spaceParams.totalArea * (spaceParams.fohPercentage / 100)) / spaceParams.areaPerCover
                    ) + spaceParams.externalSeating} 
                    seats
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Configuration</CardTitle>
              <CardDescription>
                Configure service parameters that determine staffing requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Covers per Waiter</Label>
                <Select 
                  value={serviceParams.coversPerWaiter.toString()} 
                  onValueChange={(value) => 
                    setServiceParams({
                      ...serviceParams, 
                      coversPerWaiter: parseInt(value) as 12 | 16 | 20 | 24
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select covers per waiter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 covers (Premium Dining)</SelectItem>
                    <SelectItem value="16">16 covers (Casual Dining)</SelectItem>
                    <SelectItem value="20">20 covers (Fast Casual+)</SelectItem>
                    <SelectItem value="24">24 covers (Fast Casual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Runner to Waiter Ratio</Label>
                <Select 
                  value={serviceParams.runnerToWaiterRatio.toString()} 
                  onValueChange={(value) => 
                    setServiceParams({
                      ...serviceParams, 
                      runnerToWaiterRatio: parseInt(value) as 25 | 50 | 75 | 100
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select runner to waiter ratio" />
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
                <div className="flex justify-between">
                  <Label>Kitchen Stations</Label>
                  <span className="font-medium">{serviceParams.kitchenStations}</span>
                </div>
                <Slider 
                  value={[serviceParams.kitchenStations]} 
                  min={2} 
                  max={12} 
                  step={1}
                  onValueChange={(value) => setServiceParams({...serviceParams, kitchenStations: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Staff per Station</Label>
                  <span className="font-medium">{serviceParams.staffPerStation.toFixed(1)}</span>
                </div>
                <Slider 
                  value={[serviceParams.staffPerStation * 10]} 
                  min={10} 
                  max={30} 
                  step={5}
                  onValueChange={(value) => setServiceParams({...serviceParams, staffPerStation: value[0] / 10})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Service Style Adjustment</Label>
                  <span className="font-medium">{serviceParams.serviceStyleAdjustment.toFixed(2)}x</span>
                </div>
                <Slider 
                  value={[serviceParams.serviceStyleAdjustment * 100]} 
                  min={70} 
                  max={130} 
                  step={5}
                  onValueChange={(value) => setServiceParams({...serviceParams, serviceStyleAdjustment: value[0] / 100})}
                />
                <p className="text-sm text-muted-foreground">
                  Based on {serviceStyle} service style
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Drivers</CardTitle>
              <CardDescription>
                Configure parameters that influence revenue projections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Average Spend per Guest</Label>
                  <span className="font-medium">${revenueParams.averageSpendPerGuest}</span>
                </div>
                <Slider 
                  value={[revenueParams.averageSpendPerGuest]} 
                  min={20} 
                  max={300} 
                  step={5}
                  onValueChange={(value) => setRevenueParams({...revenueParams, averageSpendPerGuest: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Guest Dwelling Time (minutes)</Label>
                  <span className="font-medium">{revenueParams.guestDwellingTime} min</span>
                </div>
                <Slider 
                  value={[revenueParams.guestDwellingTime]} 
                  min={30} 
                  max={180} 
                  step={5}
                  onValueChange={(value) => setRevenueParams({...revenueParams, guestDwellingTime: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Table Turn Time (minutes)</Label>
                  <span className="font-medium">{revenueParams.tableTurnTime} min</span>
                </div>
                <Slider 
                  value={[revenueParams.tableTurnTime]} 
                  min={40} 
                  max={200} 
                  step={5}
                  onValueChange={(value) => setRevenueParams({...revenueParams, tableTurnTime: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Peak Hour Factor</Label>
                  <span className="font-medium">{revenueParams.peakHourFactor.toFixed(1)}x</span>
                </div>
                <Slider 
                  value={[revenueParams.peakHourFactor * 10]} 
                  min={10} 
                  max={20} 
                  step={1}
                  onValueChange={(value) => setRevenueParams({...revenueParams, peakHourFactor: value[0] / 10})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Empty Seats Provision</Label>
                  <span className="font-medium">{(revenueParams.emptySeatsProvision * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[revenueParams.emptySeatsProvision * 100]} 
                  min={0} 
                  max={30} 
                  step={5}
                  onValueChange={(value) => setRevenueParams({...revenueParams, emptySeatsProvision: value[0] / 100})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="operational" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Hours</CardTitle>
              <CardDescription>
                Configure operating schedule and special periods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Operating Days per Year</Label>
                  <span className="font-medium">{operationalParams.operatingDays} days</span>
                </div>
                <Slider 
                  value={[operationalParams.operatingDays]} 
                  min={300} 
                  max={365} 
                  step={5}
                  onValueChange={(value) => setOperationalParams({...operationalParams, operatingDays: value[0]})}
                />
                <p className="text-sm text-muted-foreground">
                  Default is 350 days accounting for Ramadan period
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Ramadan Capacity Reduction</Label>
                  <span className="font-medium">{(operationalParams.ramadanCapacityReduction * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[operationalParams.ramadanCapacityReduction * 100]} 
                  min={0} 
                  max={100} 
                  step={5}
                  onValueChange={(value) => setOperationalParams({...operationalParams, ramadanCapacityReduction: value[0] / 100})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Weekday Operating Hours</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                    <div key={day} className="space-y-1">
                      <p className="text-sm font-medium">{day}</p>
                      <Input
                        type="number"
                        value={operationalParams.weekdayHours[index]}
                        onChange={(e) => {
                          const newHours = [...operationalParams.weekdayHours];
                          newHours[index] = parseInt(e.target.value) || 0;
                          setOperationalParams({...operationalParams, weekdayHours: newHours});
                        }}
                        className="w-full"
                        min="0"
                        max="24"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Weekend Operating Hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Saturday', 'Sunday'].map((day, index) => (
                    <div key={day} className="space-y-1">
                      <p className="text-sm font-medium">{day}</p>
                      <Input
                        type="number"
                        value={operationalParams.weekendHours[index]}
                        onChange={(e) => {
                          const newHours = [...operationalParams.weekendHours];
                          newHours[index] = parseInt(e.target.value) || 0;
                          setOperationalParams({...operationalParams, weekendHours: newHours});
                        }}
                        className="w-full"
                        min="0"
                        max="24"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Weekly Operating Hours:</span>
                  <span>
                    {operationalParams.weekdayHours.reduce((sum, h) => sum + h, 0) +
                      operationalParams.weekendHours.reduce((sum, h) => sum + h, 0)} 
                    hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Drivers</CardTitle>
              <CardDescription>
                Configure factors that impact staff productivity and utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Staff Utilization Rate</Label>
                  <span className="font-medium">{(efficiencyParams.staffUtilizationRate * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[efficiencyParams.staffUtilizationRate * 100]} 
                  min={60} 
                  max={95} 
                  step={5}
                  onValueChange={(value) => setEfficiencyParams({...efficiencyParams, staffUtilizationRate: value[0] / 100})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Position Efficiency</Label>
                {Object.entries(efficiencyParams.positionEfficiency).map(([position, efficiency]) => (
                  <div key={position} className="flex items-center justify-between gap-4">
                    <span className="text-sm">{position}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <Slider 
                        value={[efficiency * 100]} 
                        min={60} 
                        max={95} 
                        step={5}
                        onValueChange={(value) => {
                          const newEfficiencies = {...efficiencyParams.positionEfficiency};
                          newEfficiencies[position] = value[0] / 100;
                          setEfficiencyParams({...efficiencyParams, positionEfficiency: newEfficiencies});
                        }}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{(efficiency * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Technology Impact</Label>
                  <span className="font-medium">{(efficiencyParams.technologyImpact * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[efficiencyParams.technologyImpact * 100]} 
                  min={0} 
                  max={20} 
                  step={1}
                  onValueChange={(value) => setEfficiencyParams({...efficiencyParams, technologyImpact: value[0] / 100})}
                />
                <p className="text-sm text-muted-foreground">
                  Labor reduction due to technology adoption
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Cross-Training Capability</Label>
                  <span className="font-medium">{(efficiencyParams.crossTrainingCapability * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[efficiencyParams.crossTrainingCapability * 100]} 
                  min={0} 
                  max={25} 
                  step={5}
                  onValueChange={(value) => setEfficiencyParams({...efficiencyParams, crossTrainingCapability: value[0] / 100})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
