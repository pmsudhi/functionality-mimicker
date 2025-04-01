
import React from 'react';
import ParameterBlock from './ParameterBlock';

// Define the Parameter type
export interface Parameter {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  unit?: string;
}

// Define the Block type
export interface Block {
  id: string;
  type: string;
  title: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  parameters: Parameter[];
}

interface ParameterBlocksListProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
}

const ParameterBlocksList = ({ blocks, onBlocksChange }: ParameterBlocksListProps) => {
  // Handle deleting a block
  const handleDeleteBlock = (blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    onBlocksChange(updatedBlocks);
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

export default ParameterBlocksList;
