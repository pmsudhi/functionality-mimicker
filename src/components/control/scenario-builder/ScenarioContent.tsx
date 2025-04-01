
import React from 'react';
import ActionButtons from './ActionButtons';
import ParameterBlocksList from './ParameterBlocksList';
import ScenarioSaveButton from './ScenarioSaveButton';
import { Block } from './types';
import { useScenarioBlocks } from './hooks/useScenarioBlocks';

const ScenarioContent = () => {
  const { 
    blocks, 
    handleAddBlock, 
    handleBlocksChange 
  } = useScenarioBlocks();
  
  const actionButtonLabels = [
    'Add Space Configuration',
    'Add Service Parameters',
    'Add Operational Hours',
    'Add Efficiency Drivers',
    'Add Custom Parameters'
  ];

  return (
    <>
      <ActionButtons 
        buttonLabels={actionButtonLabels} 
        onAddBlock={handleAddBlock}
      />
      
      <ParameterBlocksList 
        blocks={blocks} 
        onBlocksChange={handleBlocksChange} 
      />
      
      <ScenarioSaveButton />
    </>
  );
};

export default ScenarioContent;
