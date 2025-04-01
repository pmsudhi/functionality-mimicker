
import { Block } from '../types';
import { toast } from 'sonner';

// Helper function to create new blocks based on type
export const createNewBlock = (blockType: string): Block | null => {
  let color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  let parameters = [];
  const uniqueId = `${blockType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  
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
      return null;
  }
  
  return {
    id: uniqueId,
    type: blockType.replace('Add ', ''),
    title: blockType.replace('Add ', ''),
    color,
    parameters
  };
};

// Function to check if a block already exists
export const blockExists = (blocks: Block[], blockType: string): boolean => {
  return blocks.some(block => block.type === blockType.replace('Add ', ''));
};

// Function to show toast for duplicate blocks
export const showDuplicateBlockToast = (blockType: string): void => {
  toast.info(`${blockType.replace('Add ', '')} block already exists!`, {
    position: 'bottom-right',
  });
};

// Function to show toast for added blocks
export const showAddedBlockToast = (blockType: string): void => {
  toast.success(`Added ${blockType.replace('Add ', '')} block`, {
    position: 'bottom-right',
  });
};
