
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddParameterButtonProps {
  onClick: () => void;
}

const AddParameterButton = ({ onClick }: AddParameterButtonProps) => {
  return (
    <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
      <Plus className="mr-2 h-3 w-3" />
      Add Parameter
    </Button>
  );
};

export default AddParameterButton;
