
import React from 'react';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface ParameterBlockHeaderProps {
  title: string;
  number: number;
  parametersCount: number;
  colorClasses: {
    numberBg: string;
    numberText: string;
  };
  onDelete: () => void;
}

const ParameterBlockHeader = ({ 
  title, 
  number, 
  parametersCount, 
  colorClasses, 
  onDelete 
}: ParameterBlockHeaderProps) => {
  return (
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-sm font-medium flex items-center">
          <span className={`${colorClasses.numberBg} ${colorClasses.numberText} rounded-full w-5 h-5 inline-flex items-center justify-center mr-2`}>
            {number}
          </span>
          {title}
        </CardTitle>
        <CardDescription className="text-xs">
          Adjust parameters for this block
        </CardDescription>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{parametersCount} parameters</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onDelete}>
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ParameterBlockHeader;
