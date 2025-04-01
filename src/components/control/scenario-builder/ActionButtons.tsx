
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ActionButtonsProps {
  buttonLabels: string[];
}

const ActionButtons = ({ buttonLabels }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {buttonLabels.map((label, index) => (
        <Button key={index} variant="outline" className="flex items-center justify-start">
          <Plus className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
