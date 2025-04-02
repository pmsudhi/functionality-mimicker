
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SpaceParametersTab from './parameters/SpaceParametersTab';
import ServiceParametersTab from './parameters/ServiceParametersTab';
import OperationalHoursTab from './parameters/OperationalHoursTab';
import EfficiencyDriversTab from './parameters/EfficiencyDriversTab';

const ParameterConfigTab = () => {
  const { toast } = useToast();
  const [activeParamTab, setActiveParamTab] = useState("space");
  
  const handleResetToDefaults = () => {
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to the default values.",
    });
  };
  
  const handleApplyChanges = () => {
    toast({
      title: "Changes Applied",
      description: "Your parameter changes have been applied to the scenario.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Parameter Configuration</CardTitle>
        <CardDescription>Adjust operational parameters for your scenario</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeParamTab} onValueChange={setActiveParamTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="space">Space Parameters</TabsTrigger>
            <TabsTrigger value="service">Service Parameters</TabsTrigger>
            <TabsTrigger value="operational">Operational Hours</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Drivers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="space">
            <SpaceParametersTab />
          </TabsContent>
          
          <TabsContent value="service">
            <ServiceParametersTab />
          </TabsContent>
          
          <TabsContent value="operational">
            <OperationalHoursTab />
          </TabsContent>
          
          <TabsContent value="efficiency">
            <EfficiencyDriversTab />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleResetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={handleApplyChanges}>
            Apply Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParameterConfigTab;
