
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PlanningBoard from "@/components/PlanningBoard";
import ResourceAllocation from "@/components/ResourceAllocation";
import Skills from "@/components/Skills";
import Analytics from "@/components/Analytics";
import FilterPanel from "@/components/FilterPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("planning");
  
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-border bg-background p-2">
        <Tabs 
          defaultValue="planning" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="allocation">Resource Allocation</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full"
        >
          <ResizablePanel 
            defaultSize={20} 
            minSize={15}
            maxSize={30}
            className="bg-muted/10"
          >
            <FilterPanel activeTab={activeTab} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            {activeTab === "planning" && <PlanningBoard />}
            {activeTab === "allocation" && <ResourceAllocation />}
            {activeTab === "skills" && <Skills />}
            {activeTab === "analytics" && <Analytics />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Dashboard;
