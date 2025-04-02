
import React, { useState } from 'react';
import { PageLayout } from '@/components/ui/page-layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '@/components/ui/page-header';
import { Settings, ArrowLeft, Copy, Save, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ScenarioConfigTab from './tabs/ScenarioConfigTab';
import ParameterConfigTab from './tabs/ParameterConfigTab';
import ScenarioBuilderTab from './tabs/ScenarioBuilderTab';
import PeakHourAnalysisTab from './tabs/PeakHourAnalysisTab';

const ControlPanel = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("parameter");
  
  // Check if we came from the dashboard
  const showBackButton = location.state && location.state.from === "dashboard";
  
  const handleSaveScenario = () => {
    toast({
      title: "Scenario Saved",
      description: "Your scenario has been saved successfully.",
    });
  };
  
  const handleDuplicate = () => {
    toast({
      title: "Scenario Duplicated",
      description: "A copy of your scenario has been created.",
    });
  };
  
  const handleRunCalculation = () => {
    toast({
      title: "Calculation Running",
      description: "Processing your scenario parameters...",
    });
    
    // Simulate calculation
    setTimeout(() => {
      toast({
        title: "Calculation Complete",
        description: "Your scenario has been calculated successfully.",
      });
    }, 1500);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <PageHeader
          title="Control Panel"
          description="Adjust operational parameters to build different scenarios"
          icon={<Settings className="h-6 w-6 text-primary" />}
        >
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Link to="/">
                <Button variant="outline" size="icon" className="hover:bg-background/80 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleDuplicate} className="flex items-center gap-2 hover:bg-background/80 transition-colors">
              <Copy className="h-4 w-4" />
              Duplicate
            </Button>
            <Button variant="outline" onClick={handleSaveScenario} className="flex items-center gap-2 hover:bg-background/80 transition-colors">
              <Save className="h-4 w-4" />
              Save Scenario
            </Button>
            <Button onClick={handleRunCalculation} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-sm">
              <Play className="h-4 w-4" />
              Run Calculation
            </Button>
          </div>
        </PageHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-muted/50">
            <TabsTrigger value="parameter" className="text-base">Parameter Configuration</TabsTrigger>
            <TabsTrigger value="builder" className="text-base">Scenario Builder</TabsTrigger>
            <TabsTrigger value="peak" className="text-base">Peak Hour Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameter" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ScenarioConfigTab />
              </div>
              <div className="lg:col-span-2">
                <ParameterConfigTab />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="builder" className="space-y-6">
            <ScenarioBuilderTab />
          </TabsContent>
          
          <TabsContent value="peak" className="space-y-6">
            <PeakHourAnalysisTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ControlPanel;
