
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Parameter } from '../types';

interface ParameterSliderProps {
  parameter: Parameter;
  onChange: (updatedParameter: Parameter) => void;
}

const ParameterSlider = ({ parameter, onChange }: ParameterSliderProps) => {
  const handleValueChange = (newValue: number[]) => {
    const updatedParameter = {
      ...parameter,
      value: newValue[0]
    };
    
    onChange(updatedParameter);
    
    // Show toast notification with updated value
    toast.success(`Updated ${parameter.label} to ${newValue[0]}${parameter.unit || ''}`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{parameter.label}</Label>
        <span className="font-medium">
          {parameter.value}{parameter.unit || ''}
        </span>
      </div>
      <Slider 
        value={[parameter.value]} 
        min={parameter.min} 
        max={parameter.max} 
        step={parameter.step}
        disabled={parameter.disabled}
        onValueChange={handleValueChange}
      />
    </div>
  );
};

export default ParameterSlider;
