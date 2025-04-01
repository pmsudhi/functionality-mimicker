
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import ActionButtons from '../scenario-builder/ActionButtons';
import ParameterBlocksList from '../scenario-builder/ParameterBlocksList';

const ScenarioBuilderTab = () => {
  const actionButtonLabels = [
    'Add Space Configuration',
    'Add Service Parameters',
    'Add Operational Hours',
    'Add Efficiency Drivers',
    'Add Custom Parameters'
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Drag & Drop Scenario Builder</CardTitle>
        <CardDescription>Build your scenario by adding and arranging parameter blocks</CardDescription>
      </CardHeader>
      <CardContent>
        <ActionButtons buttonLabels={actionButtonLabels} />
        <ParameterBlocksList />
        
        <div className="mt-6 flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioBuilderTab;
