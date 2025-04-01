
import { useState } from "react";
import { PageLayout } from "@/components/ui/page-layout";
import { FilterBar } from "@/components/ui/filter-bar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockOutlets, mockBrands, mockLocations } from "@/services/mockData";

// Import the refactored components
import { DashboardHeader } from "./DashboardHeader";
import { MetricCards } from "./MetricCards";
import { StaffingTab } from "./StaffingTab";
import { LaborCostTab } from "./LaborCostTab";
import { EfficiencyTab } from "./EfficiencyTab";
import { RevenueTab } from "./RevenueTab";
import { DashboardFooter } from "./DashboardFooter";

// Dashboard component with improved organization
const Dashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(mockOutlets[0].id);
  const [selectedSection, setSelectedSection] = useState("efficiency");
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const currentLocation = currentOutlet ? mockLocations.find(l => l.id === currentOutlet.locationId) : null;

  return (
    <PageLayout>
      <div className="container mx-auto">
        <DashboardHeader 
          selectedOutlet={selectedOutlet} 
          setSelectedOutlet={setSelectedOutlet} 
        />
        
        {currentOutlet && currentBrand && currentLocation && (
          <>
            <div className="pb-6">
              <MetricCards />
              
              <Tabs value={selectedSection} onValueChange={setSelectedSection} className="mt-6">
                <TabsList className="bg-muted/40 mb-6">
                  <TabsTrigger value="staffing">Staffing Structure</TabsTrigger>
                  <TabsTrigger value="labor">Labor Cost</TabsTrigger>
                  <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue Projections</TabsTrigger>
                </TabsList>

                <TabsContent value="staffing" className="space-y-6">
                  <StaffingTab />
                </TabsContent>

                <TabsContent value="labor" className="space-y-6">
                  <LaborCostTab />
                </TabsContent>

                <TabsContent value="efficiency" className="space-y-6">
                  <EfficiencyTab />
                </TabsContent>

                <TabsContent value="revenue" className="space-y-6">
                  <RevenueTab />
                </TabsContent>
              </Tabs>
            </div>

            <DashboardFooter />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
