
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';

interface ParameterBlockProps {
  color: 'blue' | 'green' | 'yellow';
  number: number;
  title: string;
  parameters: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    unit?: string;
  }[];
}

const ParameterBlock = ({ color, number, title, parameters }: ParameterBlockProps) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-100',
      bg: 'bg-blue-50/30',
      numberBg: 'bg-blue-100',
      numberText: 'text-blue-700',
    },
    green: {
      border: 'border-green-100',
      bg: 'bg-green-50/30',
      numberBg: 'bg-green-100',
      numberText: 'text-green-700',
    },
    yellow: {
      border: 'border-yellow-100',
      bg: 'bg-yellow-50/30',
      numberBg: 'bg-yellow-100',
      numberText: 'text-yellow-700',
    },
  };

  return (
    <Card className={`border-2 ${colorClasses[color].border} ${colorClasses[color].bg}`}>
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
          <Button variant="ghost" size="icon" className="h-6 w-6">
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
            />
          </div>
        ))}
        
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="mr-2 h-3 w-3" />
          Add Parameter
        </Button>
      </CardContent>
    </Card>
  );
};

export default ParameterBlock;
