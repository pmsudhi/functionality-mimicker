
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddParameterButtonProps {
  onClick: () => void;
}

const AddParameterButton = ({ onClick }: AddParameterButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="w-full flex items-center justify-center text-sm font-normal border-border hover:bg-accent" 
      onClick={onClick}
    >
      <Plus className="mr-2 h-3 w-3 shrink-0 text-muted-foreground" />
      <span className="truncate">Add Parameter</span>
    </Button>
  );
};

export default AddParameterButton;
