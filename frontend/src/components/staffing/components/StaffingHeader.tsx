
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const StaffingHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Staffing Structure</h1>
        <p className="text-muted-foreground">Detailed breakdown of staff positions and costs</p>
      </div>
      
      <div className="flex gap-3 self-start">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};
