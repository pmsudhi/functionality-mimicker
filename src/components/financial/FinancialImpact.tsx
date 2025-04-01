
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterBar } from "@/components/ui/filter-bar";
import { DollarSign, BadgePercent, Building2, Users } from "lucide-react";
import { useBrandOutletFilter } from "@/hooks/useBrandOutletFilter";
import { useScenarioSelection } from "@/hooks/useScenarioSelection";
import MetricCards from "./MetricCards";
import RevenueVsLaborTab from "./tabs/RevenueVsLaborTab";
import CostBreakdownTab from "./tabs/CostBreakdownTab";
import RevenueProjectionsTab from "./tabs/RevenueProjectionsTab";
import PLIntegrationTab from "./tabs/PLIntegrationTab";
import { formatIndianStyle } from "./utils";
import { PageLayout } from "@/components/ui/page-layout";

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
    <PageLayout>
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-card to-muted/5 transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Annual Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatIndianStyle(totalBaseline)}</div>
            <p className="text-xs text-muted-foreground">
              Based on 12-month projection
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/5 transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Annual Labor Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatIndianStyle(totalBaseline * (laborPercentage / 100))}</div>
            <p className="text-xs text-muted-foreground">
              Total staff cost for 12 months
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/5 transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Labor % of Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laborPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              Industry benchmark: 25-30%
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-muted/5 transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Monthly Cost per Seat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {Math.round((totalBaseline * (laborPercentage / 100) / 12) / seatingCapacity).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Based on {seatingCapacity} seats
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-muted/40 grid w-full grid-cols-4 mb-6">
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
    </PageLayout>
  );
};

export default FinancialImpact;
