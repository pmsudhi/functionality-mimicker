
import React, { useState } from 'react';
import { PageLayout } from '@/components/ui/page-layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ControlPanelHeader from './layout/ControlPanelHeader';
import ScenarioConfigTab from './tabs/ScenarioConfigTab';
import ParameterConfigTab from './tabs/ParameterConfigTab';
import ScenarioBuilderTab from './tabs/ScenarioBuilderTab';
import PeakHourAnalysisTab from './tabs/PeakHourAnalysisTab';

const ControlPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("parameter");
  
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
        <ControlPanelHeader 
          handleDuplicate={handleDuplicate}
          handleSaveScenario={handleSaveScenario}
          handleRunCalculation={handleRunCalculation}
        />
        
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
