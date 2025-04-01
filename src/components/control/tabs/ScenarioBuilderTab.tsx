
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
    // Create a new block based on the type and add it to the list
    const blockExists = blocks.some(block => block.type === blockType.replace('Add ', ''));
    
    if (blockExists) {
      toast.info(`${blockType.replace('Add ', '')} block already exists!`, {
        position: 'bottom-right',
      });
      return;
    }
    
    const uniqueId = `${blockType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    let color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
    let parameters = [];
    
    // Configure the block based on type
    switch (blockType) {
      case 'Add Space Configuration':
        color = 'blue';
        parameters = [
          {
            label: 'Total Area (sqm)',
            value: 350,
            min: 100,
            max: 1000,
            step: 10
          },
          {
            label: 'FOH Percentage',
            value: 70,
            min: 40,
            max: 80,
            step: 5,
            unit: '%'
          },
          {
            label: 'Seating Capacity',
            value: 120,
            min: 50,
            max: 200,
            step: 10,
            disabled: true
          }
        ];
        break;
      case 'Add Service Parameters':
        color = 'green';
        parameters = [
          {
            label: 'Covers per Waiter',
            value: 16,
            min: 12,
            max: 24,
            step: 4
          },
          {
            label: 'Runner Ratio',
            value: 2,
            min: 1,
            max: 4,
            step: 1
          },
          {
            label: 'Service Style',
            value: 0,
            min: 0,
            max: 0,
            step: 0
          }
        ];
        break;
      case 'Add Operational Hours':
        color = 'yellow';
        parameters = [
          {
            label: 'Operating Days per Week',
            value: 7,
            min: 5,
            max: 7,
            step: 1
          },
          {
            label: 'Daily Operating Hours',
            value: 12,
            min: 6,
            max: 24,
            step: 1
          },
          {
            label: 'Peak Hour Factor',
            value: 1.5,
            min: 1.0,
            max: 2.0,
            step: 0.1
          }
        ];
        break;
      case 'Add Efficiency Drivers':
        color = 'purple';
        parameters = [
          {
            label: 'Service Speed',
            value: 5,
            min: 1,
            max: 10,
            step: 1
          },
          {
            label: 'Staff Experience',
            value: 7,
            min: 1,
            max: 10,
            step: 1,
            unit: '/10'
          },
          {
            label: 'Automation Level',
            value: 3,
            min: 1,
            max: 10,
            step: 1,
            unit: '/10'
          }
        ];
        break;
      case 'Add Custom Parameters':
        color = 'orange';
        parameters = [
          {
            label: 'Parameter 1',
            value: 50,
            min: 0,
            max: 100,
            step: 5
          },
          {
            label: 'Parameter 2',
            value: 25,
            min: 0,
            max: 100,
            step: 5
          }
        ];
        break;
      default:
        color = 'blue';
    }
    
    const newBlock = {
      id: uniqueId,
      type: blockType.replace('Add ', ''),
      title: blockType.replace('Add ', ''),
      color,
      parameters
    };
    
    setBlocks([...blocks, newBlock]);
    toast.success(`Added ${blockType.replace('Add ', '')} block`, {
      position: 'bottom-right',
    });
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
        
        <ParameterBlocksList 
          blocks={blocks} 
          onBlocksChange={handleBlocksChange} 
        />
        
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
