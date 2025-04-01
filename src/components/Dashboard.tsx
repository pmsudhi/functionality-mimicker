
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ScenarioBuilder from "@/components/ScenarioBuilder";
import StaffingStructure from "@/components/StaffingStructure";
import FinancialImpact from "@/components/FinancialImpact";
import ScenarioComparison from "@/components/ScenarioComparison";
import PeakHourAnalysis from "@/components/PeakHourAnalysis";
import EfficiencyComparison from "@/components/EfficiencyComparison";
import RevenueProjections from "@/components/RevenueProjections";
import PIIntegration from "@/components/PIIntegration";
import FilterPanel from "@/components/FilterPanel";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("scenarios");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-border bg-background p-2">
        <Tabs 
          defaultValue="scenarios" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-8 md:w-auto">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="staffing">Staffing Structure</TabsTrigger>
            <TabsTrigger value="financial">Financial Impact</TabsTrigger>
            <TabsTrigger value="comparison">Scenario Comparison</TabsTrigger>
            <TabsTrigger value="peak">Peak Hour Analysis</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Comparison</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Projections</TabsTrigger>
            <TabsTrigger value="pi">PI Integration</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full"
        >
          <ResizablePanel 
            defaultSize={sidebarCollapsed ? 4 : 20} 
            minSize={sidebarCollapsed ? 4 : 15}
            maxSize={sidebarCollapsed ? 4 : 30}
            className="bg-muted/10"
          >
            <div className="h-full p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="mb-4"
              >
                <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
              </Button>
              
              {!sidebarCollapsed && <FilterPanel activeTab={activeTab} />}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <div className="h-full p-4 overflow-auto">
              {activeTab === "scenarios" && <ScenarioBuilder />}
              {activeTab === "staffing" && <StaffingStructure />}
              {activeTab === "financial" && <FinancialImpact />}
              {activeTab === "comparison" && <ScenarioComparison />}
              {activeTab === "peak" && <PeakHourAnalysis />}
              {activeTab === "efficiency" && <EfficiencyComparison />}
              {activeTab === "revenue" && <RevenueProjections />}
              {activeTab === "pi" && <PIIntegration />}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Dashboard;
