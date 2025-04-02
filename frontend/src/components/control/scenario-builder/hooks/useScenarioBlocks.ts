
import { useState } from 'react';
import { Block } from '../types';
import { 
  createNewBlock, 
  blockExists, 
  showDuplicateBlockToast, 
  showAddedBlockToast 
} from '../blocks/BlockCreationHelper';

export const useScenarioBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Handle adding a new block
  const handleAddBlock = (blockType: string) => {
    // Check if the block already exists
    if (blockExists(blocks, blockType)) {
      showDuplicateBlockToast(blockType);
      return;
    }
    
    // Create a new block
    const newBlock = createNewBlock(blockType);
    
    if (newBlock) {
      setBlocks([...blocks, newBlock]);
      showAddedBlockToast(blockType);
    }
  };

  // Handle deleting a block
  const handleDeleteBlock = (blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
  };

  // Handle updating the blocks array
  const handleBlocksChange = (updatedBlocks: Block[]) => {
    setBlocks(updatedBlocks);
  };

  return {
    blocks,
    handleAddBlock,
    handleDeleteBlock,
    handleBlocksChange
  };
};
