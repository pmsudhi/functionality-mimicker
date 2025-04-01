
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MetricCards from "./MetricCards";
import RevenueVsLaborTab from "./tabs/RevenueVsLaborTab";
import CostBreakdownTab from "./tabs/CostBreakdownTab";
import RevenueProjectionsTab from "./tabs/RevenueProjectionsTab";
import PLIntegrationTab from "./tabs/PLIntegrationTab";
import { formatIndianStyle } from "./utils";

const FinancialImpact = () => {
  const [selectedTab, setSelectedTab] = useState("revenue-vs-labor");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");
  const [selectedScenario, setSelectedScenario] = useState("current-operation");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("monthly");
  
  const [seatingCapacity, setSeatingCapacity] = useState(135);
  const [laborPercentage] = useState(23.8);
  const [totalBaseline, setTotalBaseline] = useState(9280000);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Impact</h1>
        <div className="flex gap-4">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-brands">All Brands</SelectItem>
              <SelectItem value="white-robata">White Robata</SelectItem>
              <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
              <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-outlets">All Outlets</SelectItem>
              <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
              <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
              <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedScenario} onValueChange={setSelectedScenario}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-operation">Current Operation</SelectItem>
              <SelectItem value="optimized-staffing">Optimized Staffing</SelectItem>
              <SelectItem value="ramadan-schedule">Ramadan Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <MetricCards 
        totalBaseline={totalBaseline} 
        laborPercentage={laborPercentage} 
        seatingCapacity={seatingCapacity} 
      />
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="revenue-vs-labor">Revenue vs. Labor</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="revenue-projections">Revenue Projections</TabsTrigger>
          <TabsTrigger value="pl-integration">P&L Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue-vs-labor">
          <RevenueVsLaborTab />
        </TabsContent>
        
        <TabsContent value="cost-breakdown">
          <CostBreakdownTab />
        </TabsContent>
        
        <TabsContent value="revenue-projections">
          <RevenueProjectionsTab
            seatingCapacity={seatingCapacity}
            setSeatingCapacity={setSeatingCapacity}
            setTotalBaseline={setTotalBaseline}
          />
        </TabsContent>
        
        <TabsContent value="pl-integration">
          <PLIntegrationTab 
            selectedTimeFrame={selectedTimeFrame}
            setSelectedTimeFrame={setSelectedTimeFrame}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialImpact;
