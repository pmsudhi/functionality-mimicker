
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScenarioBuilder from "@/components/ScenarioBuilder"; // Make sure this is imported from the correct path
import { useToast } from "@/hooks/use-toast";

const ControlPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("scenario-builder");
  
  console.log("Rendering ControlPanel with activeTab:", activeTab);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Control Panel</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="scenario-builder">Scenario Builder</TabsTrigger>
          <TabsTrigger value="staff-management">Staff Management</TabsTrigger>
          <TabsTrigger value="outlet-settings">Outlet Settings</TabsTrigger>
          <TabsTrigger value="system-settings">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenario-builder">
          <ScenarioBuilder />
        </TabsContent>
        
        <TabsContent value="staff-management">
          <div className="text-center py-20 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Staff Management Module</h2>
            <p className="text-muted-foreground">
              This module will allow you to manage staff profiles, shifts, and permissions.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="outlet-settings">
          <div className="text-center py-20 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Outlet Settings Module</h2>
            <p className="text-muted-foreground">
              Configure outlet-specific parameters, operating hours, and capacity.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="system-settings">
          <div className="text-center py-20 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">System Settings Module</h2>
            <p className="text-muted-foreground">
              Configure global settings, integrations, and user permissions.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlPanel;
