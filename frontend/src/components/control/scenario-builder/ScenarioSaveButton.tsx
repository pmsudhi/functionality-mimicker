
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const ScenarioSaveButton = () => {
  const handleSaveScenario = () => {
    toast.success('Scenario saved successfully!', {
      position: 'bottom-right',
      description: 'Your scenario has been saved and can be accessed from the Saved Scenarios tab.',
    });
  };

  return (
    <div className="mt-6 flex justify-end">
      <Button 
        onClick={handleSaveScenario}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Scenario
      </Button>
    </div>
  );
};

export default ScenarioSaveButton;
