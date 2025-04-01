
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
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { 
  Save, 
  RefreshCw, 
  Copy,
  Play,
  Plus,
  Trash
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
  const [activeTab, setActiveTab] = useState("parameter");
  const [activeParamTab, setActiveParamTab] = useState("space");
  
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const serviceStyle = currentBrand?.serviceStyle as ServiceStyle || "Casual Dining";
  
  const defaultParams = getDefaultParameters(serviceStyle);
  
  const [spaceParams, setSpaceParams] = useState<SpaceParameters>(defaultParams.space);
  const [serviceParams, setServiceParams] = useState<ServiceParameters>(defaultParams.service);
  const [revenueParams, setRevenueParams] = useState<RevenueParameters>(defaultParams.revenue);
  const [operationalParams, setOperationalParams] = useState<OperationalParameters>(defaultParams.operational);
  const [efficiencyParams, setEfficiencyParams] = useState<EfficiencyParameters>(defaultParams.efficiency);
  const [ramadanAdjustment, setRamadanAdjustment] = useState(false);
  const [weekendBoost, setWeekendBoost] = useState(false);
  
  // Calculated values
  const fohArea = Math.round(spaceParams.totalArea * (spaceParams.fohPercentage / 100));
  const bohArea = spaceParams.totalArea - fohArea;
  const internalSeatingCapacity = Math.floor(fohArea / spaceParams.areaPerCover);
  const totalSeatingCapacity = internalSeatingCapacity + spaceParams.externalSeating;
  const totalAnnualHours = operationalParams.operatingDays * 12;
  const waitersNeeded = Math.ceil(100 / serviceParams.coversPerWaiter);
  const runnersNeeded = Math.ceil(waitersNeeded * (serviceParams.runnerToWaiterRatio / 100));
  const kitchenStaffNeeded = serviceParams.kitchenStations * serviceParams.staffPerStation;
  const totalFOHStaff = waitersNeeded + runnersNeeded + 2; // +2 for host and manager
  const peakHoursPerDay = 4;
  const peakHoursPerYear = peakHoursPerDay * operationalParams.operatingDays;
  const standardHoursPerYear = totalAnnualHours - peakHoursPerYear;
  const staffingRequirement = `${revenueParams.peakHourFactor}× standard staffing`;
  
  const handleSaveParameters = () => {
    toast({
      title: "Scenario Saved",
      description: "Your scenario has been saved successfully.",
    });
  };
  
  const handleResetToDefaults = () => {
    const defaults = getDefaultParameters(serviceStyle);
    setSpaceParams(defaults.space);
    setServiceParams(defaults.service);
    setRevenueParams(defaults.revenue);
    setOperationalParams(defaults.operational);
    setEfficiencyParams(defaults.efficiency);
    setRamadanAdjustment(false);
    setWeekendBoost(false);
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to the default values for this outlet.",
    });
  };
  
  const handleRunCalculation = () => {
    toast({
      title: "Calculation Running",
      description: "Processing your scenario parameters...",
    });
    
    // Simulate calculation
    setTimeout(() => {
      toast({
        title: "Calculation Complete",
        description: "Your scenario has been calculated successfully.",
      });
    }, 1500);
  };
  
  const handleDuplicate = () => {
    toast({
      title: "Scenario Duplicated",
      description: "A copy of your scenario has been created.",
    });
  };
  
  const handleApplyChanges = () => {
    toast({
      title: "Changes Applied",
      description: "Your parameter changes have been applied to the scenario.",
    });
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Control Panel</h1>
          <p className="text-muted-foreground">Adjust operational parameters to build different scenarios</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={handleSaveParameters}>
            <Save className="mr-2 h-4 w-4" />
            Save Scenario
          </Button>
          <Button onClick={handleRunCalculation}>
            <Play className="mr-2 h-4 w-4" />
            Run Calculation
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/50">
          <TabsTrigger value="parameter" className="text-base">Parameter Configuration</TabsTrigger>
          <TabsTrigger value="builder" className="text-base">Scenario Builder</TabsTrigger>
          <TabsTrigger value="peak" className="text-base">Peak Hour Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parameter" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Scenario Configuration</CardTitle>
                <CardDescription>Define your scenario parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input id="scenario-name" placeholder="New Scenario" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBrands.map(brand => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="outlet">Outlet</Label>
                  <Select defaultValue="outlet-1">
                    <SelectTrigger id="outlet">
                      <SelectValue placeholder="Select Outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockOutlets.map(outlet => (
                        <SelectItem key={outlet.id} value={outlet.id}>
                          {outlet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="sar">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="SAR (Saudi Riyal)" />
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
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Parameter Configuration</CardTitle>
                <CardDescription>Adjust operational parameters for your scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeParamTab} onValueChange={setActiveParamTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="space">Space Parameters</TabsTrigger>
                    <TabsTrigger value="service">Service Parameters</TabsTrigger>
                    <TabsTrigger value="operational">Operational Hours</TabsTrigger>
                    <TabsTrigger value="efficiency">Efficiency Drivers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="space" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Total Restaurant Area (sqm)</Label>
                            <Input 
                              value={spaceParams.totalArea}
                              onChange={e => setSpaceParams({...spaceParams, totalArea: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
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
                            <Label>FOH Area Percentage (%)</Label>
                            <Input 
                              value={spaceParams.fohPercentage}
                              onChange={e => setSpaceParams({...spaceParams, fohPercentage: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[spaceParams.fohPercentage]} 
                            min={40} 
                            max={80} 
                            step={5}
                            onValueChange={(value) => setSpaceParams({...spaceParams, fohPercentage: value[0]})}
                          />
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
                            <Input 
                              value={spaceParams.externalSeating}
                              onChange={e => setSpaceParams({...spaceParams, externalSeating: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[spaceParams.externalSeating]} 
                            min={0} 
                            max={100} 
                            step={5}
                            onValueChange={(value) => setSpaceParams({...spaceParams, externalSeating: value[0]})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>FOH Area (sqm)</Label>
                          <Input
                            value={fohArea}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {spaceParams.totalArea} sqm × {spaceParams.fohPercentage}%
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Internal Seating Capacity</Label>
                          <Input
                            value={internalSeatingCapacity}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {fohArea} sqm ÷ {spaceParams.areaPerCover} sqm per cover
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Total Seating Capacity</Label>
                          <Input
                            value={totalSeatingCapacity}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Internal ({internalSeatingCapacity}) + External ({spaceParams.externalSeating})
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>BOH Area (sqm)</Label>
                          <Input
                            value={bohArea}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {spaceParams.totalArea} sqm × {100 - spaceParams.fohPercentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="service" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
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
                              <SelectItem value="16">16 covers (Standard Service)</SelectItem>
                              <SelectItem value="20">20 covers (Fast Casual+)</SelectItem>
                              <SelectItem value="24">24 covers (Fast Casual)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Runner to Waiter Ratio (%)</Label>
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
                              <SelectItem value="50">50% (1:2 Ratio)</SelectItem>
                              <SelectItem value="75">75% (3 runners per 4 waiters)</SelectItem>
                              <SelectItem value="100">100% (1 runner per waiter)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Kitchen Stations</Label>
                            <Input 
                              value={serviceParams.kitchenStations}
                              onChange={e => setServiceParams({...serviceParams, kitchenStations: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
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
                          <Label>Service Style</Label>
                          <Select defaultValue="casual-dining">
                            <SelectTrigger>
                              <SelectValue placeholder="Select service style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fast-casual">Fast Casual</SelectItem>
                              <SelectItem value="casual-dining">Casual Dining</SelectItem>
                              <SelectItem value="premium-dining">Premium Dining</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Waiters Needed (for 100 covers)</Label>
                          <Input
                            value={waitersNeeded}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as 100 covers ÷ {serviceParams.coversPerWaiter} covers per waiter
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Runners Needed</Label>
                          <Input
                            value={runnersNeeded}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {waitersNeeded} waiters × {serviceParams.runnerToWaiterRatio}% (rounded up)
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Kitchen Staff Needed</Label>
                          <Input
                            value={kitchenStaffNeeded.toFixed(1)}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {serviceParams.kitchenStations} stations × {serviceParams.staffPerStation} staff per station
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Total FOH Staff</Label>
                          <Input
                            value={totalFOHStaff}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Waiters ({waitersNeeded}) + Runners ({runnersNeeded}) + Host (1) + Manager (1)
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="operational" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Operating Days per Year</Label>
                            <Input 
                              value={operationalParams.operatingDays}
                              onChange={e => setOperationalParams({...operationalParams, operatingDays: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[operationalParams.operatingDays]} 
                            min={300} 
                            max={365} 
                            step={5}
                            onValueChange={(value) => setOperationalParams({...operationalParams, operatingDays: value[0]})}
                          />
                          <p className="text-xs text-muted-foreground">
                            Default is 350 days (accounts for Ramadan and other closures)
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Daily Operating Hours</Label>
                            <Input 
                              value={operationalParams.weekdayHours[0]}
                              onChange={e => {
                                const newHours = [...operationalParams.weekdayHours];
                                const value = Number(e.target.value);
                                for (let i = 0; i < newHours.length; i++) {
                                  newHours[i] = value;
                                }
                                setOperationalParams({...operationalParams, weekdayHours: newHours});
                              }}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[operationalParams.weekdayHours[0]]} 
                            min={6} 
                            max={24} 
                            step={1}
                            onValueChange={(value) => {
                              const newHours = [...operationalParams.weekdayHours];
                              for (let i = 0; i < newHours.length; i++) {
                                newHours[i] = value[0];
                              }
                              setOperationalParams({...operationalParams, weekdayHours: newHours});
                            }}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Peak Hour Staffing Factor</Label>
                            <Input 
                              value={revenueParams.peakHourFactor.toFixed(1)}
                              onChange={e => setRevenueParams({...revenueParams, peakHourFactor: Number(e.target.value)})}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[revenueParams.peakHourFactor * 10]} 
                            min={10} 
                            max={20} 
                            step={1}
                            onValueChange={(value) => setRevenueParams({...revenueParams, peakHourFactor: value[0] / 10})}
                          />
                          <p className="text-xs text-muted-foreground">
                            Multiplier for staff needed during peak hours
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <Switch 
                            id="weekend-boost" 
                            checked={weekendBoost}
                            onCheckedChange={setWeekendBoost}
                          />
                          <Label htmlFor="weekend-boost">Apply Weekend Boost (25% more staff)</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Total Annual Operating Hours</Label>
                          <Input
                            value={totalAnnualHours}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Calculated as {operationalParams.operatingDays} days × {operationalParams.weekdayHours[0]} hours
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Standard Hours per Year</Label>
                          <Input
                            value={standardHoursPerYear}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Total hours minus peak hours
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Peak Hours per Year</Label>
                          <Input
                            value={peakHoursPerYear}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            {peakHoursPerDay} peak hours per day × {operationalParams.operatingDays} days
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Peak Hour Staffing Requirement</Label>
                          <Input
                            value={staffingRequirement}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            During peak hours, staffing is increased by this factor
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="efficiency" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Staff Utilization Rate (%)</Label>
                            <Input 
                              value={Math.round(efficiencyParams.staffUtilizationRate * 100)}
                              onChange={e => setEfficiencyParams({
                                ...efficiencyParams, 
                                staffUtilizationRate: Number(e.target.value) / 100
                              })}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[efficiencyParams.staffUtilizationRate * 100]} 
                            min={50} 
                            max={100} 
                            step={5}
                            onValueChange={(value) => setEfficiencyParams({
                              ...efficiencyParams, 
                              staffUtilizationRate: value[0] / 100
                            })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Percentage of time staff are productively engaged
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Technology Impact (%)</Label>
                            <Input 
                              value={Math.round(efficiencyParams.technologyImpact * 100)}
                              onChange={e => setEfficiencyParams({
                                ...efficiencyParams, 
                                technologyImpact: Number(e.target.value) / 100
                              })}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[efficiencyParams.technologyImpact * 100]} 
                            min={0} 
                            max={30} 
                            step={1}
                            onValueChange={(value) => setEfficiencyParams({
                              ...efficiencyParams, 
                              technologyImpact: value[0] / 100
                            })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Labor reduction from POS, kitchen display systems, etc.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Cross-Training Benefits (%)</Label>
                            <Input 
                              value={Math.round(efficiencyParams.crossTrainingCapability * 100)}
                              onChange={e => setEfficiencyParams({
                                ...efficiencyParams, 
                                crossTrainingCapability: Number(e.target.value) / 100
                              })}
                              className="w-20 text-right"
                            />
                          </div>
                          <Slider 
                            value={[efficiencyParams.crossTrainingCapability * 100]} 
                            min={0} 
                            max={30} 
                            step={1}
                            onValueChange={(value) => setEfficiencyParams({
                              ...efficiencyParams, 
                              crossTrainingCapability: value[0] / 100
                            })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Labor savings from multi-skilled staff
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Seasonality Factor</Label>
                          <Select defaultValue="moderate">
                            <SelectTrigger>
                              <SelectValue placeholder="Select seasonality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (5% variation)</SelectItem>
                              <SelectItem value="moderate">Moderate (15% variation)</SelectItem>
                              <SelectItem value="high">High (25% variation)</SelectItem>
                              <SelectItem value="extreme">Extreme (35% variation)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Effective Staff Utilization</Label>
                          <Input
                            value={(efficiencyParams.staffUtilizationRate).toFixed(2)}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(efficiencyParams.staffUtilizationRate * 100)}% expressed as a decimal
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Technology Labor Savings</Label>
                          <Input
                            value={(efficiencyParams.technologyImpact).toFixed(2)}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(efficiencyParams.technologyImpact * 100)}% expressed as a decimal
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Cross-Training Labor Savings</Label>
                          <Input
                            value={(efficiencyParams.crossTrainingCapability).toFixed(2)}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(efficiencyParams.crossTrainingCapability * 100)}% expressed as a decimal
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Total Efficiency Factor</Label>
                          <Input
                            value={Math.round(75) / 100}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            Combined impact of all efficiency drivers
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleResetToDefaults}>
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleApplyChanges}>
                    Apply Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="builder" className="space-y-6">
          <Card>
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
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Scenario
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="peak" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Peak Hour Analysis</CardTitle>
              <CardDescription>
                Analyze staffing requirements during peak hours of operation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This tab provides tools to analyze how staffing requirements change during peak operating hours.
              </p>
              <div className="h-60 flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Peak hour analysis content coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
