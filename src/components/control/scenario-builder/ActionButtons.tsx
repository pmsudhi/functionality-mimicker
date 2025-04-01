
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  buttonLabels: string[];
  onAddBlock: (blockType: string) => void;
}

const ActionButtons = ({ buttonLabels, onAddBlock }: ActionButtonsProps) => {
  const handleButtonClick = (label: string) => {
    toast.info(`Adding ${label} block`, {
      position: 'bottom-right',
    });
    onAddBlock(label);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {buttonLabels.map((label, index) => (
        <Button 
          key={index} 
          variant="outline" 
          className="flex items-center justify-start"
          onClick={() => handleButtonClick(label)}
        >
          <Plus className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
