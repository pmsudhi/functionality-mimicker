
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ActionButtonsProps {
  buttonLabels: string[];
  onAddBlock: (blockType: string) => void;
}

const ActionButtons = ({ buttonLabels, onAddBlock }: ActionButtonsProps) => {
  const handleButtonClick = (label: string) => {
    onAddBlock(label);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {buttonLabels.map((label, index) => (
        <Button 
          key={index} 
          variant="outline" 
          className="flex items-center justify-start w-full text-sm font-normal px-3 h-10 border-border hover:bg-accent truncate"
          onClick={() => handleButtonClick(label)}
        >
          <Plus className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
