
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface Parameter {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  unit?: string;
}

interface ParameterBlockProps {
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  number: number;
  title: string;
  parameters: Parameter[];
  onDelete: () => void;
}

const ParameterBlock = ({ color, number, title, parameters: initialParameters, onDelete }: ParameterBlockProps) => {
  const [parameters, setParameters] = useState<Parameter[]>(initialParameters);

  const colorClasses = {
    blue: {
      border: 'border-blue-200',
      bg: 'bg-blue-50/50',
      numberBg: 'bg-blue-100',
      numberText: 'text-blue-700',
    },
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50/50',
      numberBg: 'bg-green-100',
      numberText: 'text-green-700',
    },
    yellow: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50/50',
      numberBg: 'bg-yellow-100',
      numberText: 'text-yellow-700',
    },
    purple: {
      border: 'border-purple-200',
      bg: 'bg-purple-50/50',
      numberBg: 'bg-purple-100',
      numberText: 'text-purple-700',
    },
    orange: {
      border: 'border-orange-200',
      bg: 'bg-orange-50/50',
      numberBg: 'bg-orange-100',
      numberText: 'text-orange-700',
    }
  };

  const handleValueChange = (index: number, newValue: number[]) => {
    const updatedParameters = [...parameters];
    updatedParameters[index] = {
      ...updatedParameters[index],
      value: newValue[0]
    };
    setParameters(updatedParameters);
    
    // Show toast notification with updated value
    toast.success(`Updated ${updatedParameters[index].label} to ${newValue[0]}${updatedParameters[index].unit || ''}`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleAddParameter = () => {
    toast.info('Add parameter functionality coming soon', {
      position: 'bottom-right'
    });
  };

  const handleDeleteBlock = () => {
    toast.info(`Removed ${title} block`, {
      position: 'bottom-right'
    });
    onDelete();
  };

  return (
    <Card className={`border ${colorClasses[color].border} ${colorClasses[color].bg} shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-medium flex items-center">
            <span className={`${colorClasses[color].numberBg} ${colorClasses[color].numberText} rounded-full w-5 h-5 inline-flex items-center justify-center mr-2`}>
              {number}
            </span>
            {title}
          </CardTitle>
          <CardDescription className="text-xs">
            Adjust parameters for this block
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{parameters.length} parameters</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDeleteBlock}>
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {parameters.map((param, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <Label>{param.label}</Label>
              <span className="font-medium">
                {param.value}{param.unit || ''}
              </span>
            </div>
            <Slider 
              value={[param.value]} 
              min={param.min} 
              max={param.max} 
              step={param.step}
              disabled={param.disabled}
              onValueChange={(newValue) => handleValueChange(index, newValue)}
            />
          </div>
        ))}
        
        <Button variant="outline" size="sm" className="w-full" onClick={handleAddParameter}>
          <Plus className="mr-2 h-3 w-3" />
          Add Parameter
        </Button>
      </CardContent>
    </Card>
  );
};

export default ParameterBlock;
