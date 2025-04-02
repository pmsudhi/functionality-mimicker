
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Save, Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ControlPanelHeaderProps {
  handleDuplicate: () => void;
  handleSaveScenario: () => void;
  handleRunCalculation: () => void;
  showBackButton?: boolean;
}

const ControlPanelHeader = ({
  handleDuplicate,
  handleSaveScenario,
  handleRunCalculation,
  showBackButton = false
}: ControlPanelHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link to="/">
              <Button variant="outline" size="icon" className="hover:bg-background/80 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-bold">Control Panel</h1>
            <p className="text-muted-foreground">Adjust operational parameters to build different scenarios</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDuplicate} className="flex items-center gap-2 hover:bg-background/80 transition-colors">
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline" onClick={handleSaveScenario} className="flex items-center gap-2 hover:bg-background/80 transition-colors">
            <Save className="h-4 w-4" />
            Save Scenario
          </Button>
          <Button onClick={handleRunCalculation} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-sm">
            <Play className="h-4 w-4" />
            Run Calculation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanelHeader;
