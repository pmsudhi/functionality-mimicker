
import { useState } from "react";
import { PageLayout } from "@/components/ui/page-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockOutlets, mockBrands, mockLocations } from "@/services/mockData";
import { useBrandOutlet } from "@/context/BrandOutletContext";
import { ResponsiveContainer } from "@/components/ui/responsive-container";

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
  const { selectedBrandId, selectedOutletId } = useBrandOutlet();
  const [selectedSection, setSelectedSection] = useState("efficiency");
  
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutletId);
  const currentBrand = currentOutlet ? mockBrands.find(b => b.id === currentOutlet.brandId) : null;
  const currentLocation = currentOutlet ? mockLocations.find(l => l.id === currentOutlet.locationId) : null;

  return (
    <PageLayout className="p-0">
      <div className="w-full bg-gradient-to-r from-primary/5 to-transparent border-b border-border/20">
        <ResponsiveContainer className="py-6">
          <DashboardHeader />
        </ResponsiveContainer>
      </div>
      
      {currentOutlet && currentBrand && currentLocation && (
        <ResponsiveContainer className="py-6">
          <MetricCards />
          
          <Tabs 
            value={selectedSection} 
            onValueChange={setSelectedSection} 
            className="mt-6"
          >
            <TabsList className="bg-muted/40 mb-6 p-1 rounded-md border border-border/20">
              <TabsTrigger 
                value="staffing" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              >
                Staffing Structure
              </TabsTrigger>
              <TabsTrigger 
                value="labor" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              >
                Labor Cost
              </TabsTrigger>
              <TabsTrigger 
                value="efficiency" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              >
                Efficiency Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="revenue" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
              >
                Revenue Projections
              </TabsTrigger>
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

          <DashboardFooter />
        </ResponsiveContainer>
      )}
    </PageLayout>
  );
};

export default Dashboard;
