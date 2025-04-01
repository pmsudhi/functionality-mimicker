
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/ui/filter-bar";
import { useBrandOutletFilter } from "@/hooks/useBrandOutletFilter";
import { useScenarioSelection } from "@/hooks/useScenarioSelection";
import MetricCards from "./MetricCards";
import RevenueVsLaborTab from "./tabs/RevenueVsLaborTab";
import CostBreakdownTab from "./tabs/CostBreakdownTab";
import RevenueProjectionsTab from "./tabs/RevenueProjectionsTab";
import PLIntegrationTab from "./tabs/PLIntegrationTab";
import { formatIndianStyle } from "./utils";

const FinancialImpact = () => {
  const [selectedTab, setSelectedTab] = useState("revenue-vs-labor");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("monthly");
  
  const [seatingCapacity, setSeatingCapacity] = useState(135);
  const [laborPercentage] = useState(23.8);
  const [totalBaseline, setTotalBaseline] = useState(9280000);

  // Use the filter hook for brand and outlet selection
  const {
    selectedBrandId,
    selectedOutletId,
    availableBrands,
    availableOutlets,
    handleBrandChange,
    handleOutletChange
  } = useBrandOutletFilter();

  // Use the scenario selection hook
  const { 
    selectedScenarioId, 
    setSelectedScenarioId,
    availableScenarios
  } = useScenarioSelection({ 
    brandId: selectedBrandId, 
    outletId: selectedOutletId 
  });

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <FilterBar
        title="Financial Impact"
        className="mb-6"
      >
        <Select value={selectedBrandId || "all"} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {availableBrands.map(brand => (
              <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedOutletId || "all"} onValueChange={handleOutletChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Outlets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outlets</SelectItem>
            {availableOutlets.map(outlet => (
              <SelectItem key={outlet.id} value={outlet.id}>{outlet.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedScenarioId} 
          onValueChange={setSelectedScenarioId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Scenario" />
          </SelectTrigger>
          <SelectContent>
            {availableScenarios.map(scenario => (
              <SelectItem key={scenario.id} value={scenario.id}>
                {scenario.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterBar>
      
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
