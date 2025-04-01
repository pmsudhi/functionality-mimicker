
import React, { useState } from 'react';
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
import ParameterBlocksList, { Block } from '../scenario-builder/ParameterBlocksList';
import { toast } from 'sonner';

const ScenarioBuilderTab = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  const actionButtonLabels = [
    'Add Space Configuration',
    'Add Service Parameters',
    'Add Operational Hours',
    'Add Efficiency Drivers',
    'Add Custom Parameters'
  ];

  const handleAddBlock = (blockType: string) => {
    // The actual adding is handled in ParameterBlocksList
  };

  const handleSaveScenario = () => {
    toast.success('Scenario saved successfully!', {
      position: 'bottom-right',
      description: 'Your scenario has been saved and can be accessed from the Saved Scenarios tab.',
    });
  };

  const handleBlocksChange = (updatedBlocks: Block[]) => {
    setBlocks(updatedBlocks);
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="bg-card">
        <CardTitle>Drag & Drop Scenario Builder</CardTitle>
        <CardDescription>Build your scenario by adding and arranging parameter blocks</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ActionButtons 
          buttonLabels={actionButtonLabels} 
          onAddBlock={handleAddBlock}
        />
        <ParameterBlocksList onBlocksChange={handleBlocksChange} />
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleSaveScenario}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioBuilderTab;
