
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import ScenarioContent from '../scenario-builder/ScenarioContent';

const ScenarioBuilderTab = () => {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="bg-card">
        <CardTitle>Drag & Drop Scenario Builder</CardTitle>
        <CardDescription>Build your scenario by adding and arranging parameter blocks</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScenarioContent />
      </CardContent>
    </Card>
  );
};

export default ScenarioBuilderTab;
