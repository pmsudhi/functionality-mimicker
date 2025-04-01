
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockScenarios, mockOutlets } from "@/services/mockData";
import { Clock, Calendar, BarChart2 } from "lucide-react";

const PeakHourAnalysis = () => {
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0].id);
  const [viewType, setViewType] = useState("daily");
  
  // Find the selected scenario
  const scenario = mockScenarios.find(s => s.id === selectedScenario);
  const outlet = scenario ? mockOutlets.find(o => o.id === scenario.outletId) : null;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Peak Hour Analysis</h2>
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
            <CardTitle className="text-sm font-medium">Peak Hour Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario?.revenueParameters.peakHourFactor.toFixed(1)}x
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Multiplier for highest demand periods
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Operating Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario
                  ? ((scenario.operationalParameters.weekdayHours.reduce((sum, h) => sum + h, 0) / 5) * 5 +
                     (scenario.operationalParameters.weekendHours.reduce((sum, h) => sum + h, 0) / 2) * 2) / 7
                    : "--"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average hours per day
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operating Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {scenario?.operationalParameters.operatingDays}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Days per year (adjusted for Ramadan)
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 border rounded-md overflow-hidden">
        <Tabs defaultValue="daily" value={viewType} onValueChange={setViewType} className="h-full flex flex-col">
          <div className="border-b">
            <TabsList className="bg-transparent w-auto m-2">
              <TabsTrigger value="daily">Daily Distribution</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Pattern</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
              <TabsTrigger value="staffing">Staffing Impact</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto">
            <TabsContent value="daily" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Covers Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Daily covers distribution chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Peak Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lunch Peak (12-2pm)</span>
                      <span className="font-medium">30% of daily covers</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dinner Peak (7-9pm)</span>
                      <span className="font-medium">45% of daily covers</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Off-Peak Hours</span>
                      <span className="font-medium">25% of daily covers</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Optimization Opportunities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Adjusting staffing levels during peak hours could improve service efficiency</li>
                    <li>Implementing reservation incentives for off-peak hours could smooth demand</li>
                    <li>Menu engineering for quick-service items during peak lunch hours</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Covers Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Weekly covers distribution chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Day of Week Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekend Days (Fri-Sat)</span>
                      <span className="font-medium">40% of weekly covers</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mid-Week (Wed-Thu)</span>
                      <span className="font-medium">35% of weekly covers</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Early Week (Sun-Tue)</span>
                      <span className="font-medium">25% of weekly covers</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Weekly Staffing Adjustments</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Increase FOH staff by 15% for weekend service</li>
                    <li>Reduce kitchen staff by 10% on Mondays and Tuesdays</li>
                    <li>Schedule training and maintenance during slower periods</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Seasonality Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Monthly seasonality chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Seasonal Factors</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>High Season (Nov-Jan)</span>
                      <span className="font-medium">+15% over average</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ramadan Period</span>
                      <span className="font-medium">-50% capacity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Summer Months (Jun-Aug)</span>
                      <span className="font-medium">-15% over average</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Long-term Planning</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Adjust staffing levels seasonally to maintain labor cost percentage</li>
                    <li>Plan marketing campaigns for traditionally slower months</li>
                    <li>Schedule renovations and major training during low season</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="staffing" className="h-full p-4 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Staffing Requirements by Hour</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Hourly staffing requirements chart</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Shift Planning</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Opening Shift (9am-5pm)</span>
                      <span className="font-medium">60% of full staff</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Middle Shift (12pm-8pm)</span>
                      <span className="font-medium">80% of full staff</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Closing Shift (5pm-1am)</span>
                      <span className="font-medium">100% of full staff</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Optimization Strategy</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Implement staggered shifts to match demand patterns</li>
                    <li>Cross-train staff to handle multiple roles during transition periods</li>
                    <li>Use part-time staff to supplement during peak hours only</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PeakHourAnalysis;
