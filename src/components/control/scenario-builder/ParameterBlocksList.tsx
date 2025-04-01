
import React, { useState } from 'react';
import ParameterBlock from './ParameterBlock';

// Define the Parameter type
interface Parameter {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  unit?: string;
}

// Define the Block type
interface Block {
  id: string;
  type: string;
  title: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  parameters: Parameter[];
}

interface ParameterBlocksListProps {
  onBlocksChange?: (blocks: Block[]) => void;
}

const ParameterBlocksList = ({ onBlocksChange }: ParameterBlocksListProps) => {
  // Create blocks for each parameter group
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 'space-config',
      type: 'Space Configuration',
      title: 'Space Configuration',
      color: 'blue',
      parameters: [
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
      ]
    },
    {
      id: 'service-params',
      type: 'Service Parameters',
      title: 'Service Parameters',
      color: 'green',
      parameters: [
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
      ]
    },
    {
      id: 'operational-hours',
      type: 'Operational Hours',
      title: 'Operational Hours',
      color: 'yellow',
      parameters: [
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
      ]
    }
  ]);

  // Handle deleting a block
  const handleDeleteBlock = (blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
    if (onBlocksChange) {
      onBlocksChange(updatedBlocks);
    }
  };

  // Function to add a new block based on type
  const addBlock = (blockType: string) => {
    let newBlock: Block;
    let color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
    let parameters: Parameter[] = [];
    
    // Generate unique ID
    const uniqueId = `${blockType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    // Configure block based on type
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
    
    // Create the new block
    newBlock = {
      id: uniqueId,
      type: blockType.replace('Add ', ''),
      title: blockType.replace('Add ', ''),
      color,
      parameters
    };
    
    // Add the new block to the list
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    
    if (onBlocksChange) {
      onBlocksChange(updatedBlocks);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {blocks.map((block, index) => (
        <ParameterBlock 
          key={block.id}
          color={block.color} 
          number={index + 1} 
          title={block.title} 
          parameters={block.parameters} 
          onDelete={() => handleDeleteBlock(block.id)}
        />
      ))}
      
      {blocks.length === 0 && (
        <div className="text-center p-6 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/50">
          <p className="text-muted-foreground">No parameter blocks added yet. Use the buttons above to add blocks.</p>
        </div>
      )}
    </div>
  );
};

export { type Block, type Parameter };
export default ParameterBlocksList;
