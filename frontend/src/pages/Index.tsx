
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu, Settings } from "lucide-react";

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="border-b border-border bg-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">Manpower Planning</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel 
            defaultSize={20}
            minSize={collapsed ? 4 : 15}
            maxSize={collapsed ? 4 : 30}
            className="bg-muted/10 border-r border-border"
          >
            <div className="h-full p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCollapsed(!collapsed)}
                className="mb-4"
              >
                <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
              </Button>
              
              {!collapsed && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Filters</h3>
                    <div className="space-y-1 text-sm">
                      <p>Time Period</p>
                      <p>Department</p>
                      <p>Location</p>
                      <p>Position Type</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Parameters</h3>
                    <div className="space-y-1 text-sm">
                      <p>Staffing Requirements</p>
                      <p>Budget Constraints</p>
                      <p>Skill Matrix</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <div className="h-full flex flex-col overflow-hidden">
              <Tabs defaultValue="scenarios" className="w-full">
                <div className="border-b border-border">
                  <TabsList className="ml-4 bg-transparent">
                    <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                    <TabsTrigger value="staffing">Staffing Structure</TabsTrigger>
                    <TabsTrigger value="financial">Financial Impact</TabsTrigger>
                    <TabsTrigger value="comparison">Scenario Comparison</TabsTrigger>
                    <TabsTrigger value="peak">Peak Hour Analysis</TabsTrigger>
                    <TabsTrigger value="efficiency">Efficiency Comparison</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue Projections</TabsTrigger>
                    <TabsTrigger value="pi">PI Integration</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-4 flex-1 overflow-auto">
                  <TabsContent value="scenarios" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Scenario Builder</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="border rounded-md p-4">
                          <h3 className="font-medium mb-2">Current Scenarios</h3>
                          <p className="text-sm text-muted-foreground">View and manage existing workforce scenarios</p>
                        </div>
                        <div className="border rounded-md p-4">
                          <h3 className="font-medium mb-2">Create New Scenario</h3>
                          <p className="text-sm text-muted-foreground">Build a new workforce planning scenario</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="staffing" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Staffing Structure</h2>
                      <p>Visualize and optimize your staffing composition</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financial" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Financial Impact</h2>
                      <p>Analyze cost implications of staffing decisions</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comparison" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Scenario Comparison</h2>
                      <p>Compare different workforce planning scenarios</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="peak" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Peak Hour Analysis</h2>
                      <p>Identify and plan for high-demand periods</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="efficiency" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Efficiency Comparison</h2>
                      <p>Evaluate workforce efficiency across scenarios</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="revenue" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">Revenue Projections</h2>
                      <p>Forecast revenue based on staffing models</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pi" className="h-full mt-0">
                    <div className="h-full border rounded-md p-6">
                      <h2 className="text-lg font-medium mb-4">PI Integration</h2>
                      <p>Connect with performance indicators</p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
