
import React from 'react';
import ParameterBlock from './ParameterBlock';
import EmptyState from './EmptyState';
import { Block } from './types';

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
      
      {blocks.length === 0 && <EmptyState />}
    </div>
  );
};

export default ParameterBlocksList;
