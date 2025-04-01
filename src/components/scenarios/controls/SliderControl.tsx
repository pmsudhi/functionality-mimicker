
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (vals: number[]) => void;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
}

const SliderControl = ({ 
  label, 
  value, 
  onChange, 
  description,
  min = 50,
  max = 150,
  step = 1
}: SliderControlProps) => {
  // Local state to enable dragging experience
  const [localValue, setLocalValue] = useState(value);

  const handleValueChange = (vals: number[]) => {
    setLocalValue(vals[0]);
    onChange(vals);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-medium">{label.includes("Rate (%)") ? `${localValue}%` : localValue}</span>
      </div>
      <Slider 
        value={[localValue]} 
        min={min} 
        max={max} 
        step={label.includes("Turnover") ? 0.1 : step} 
        onValueChange={handleValueChange} 
        className="my-1"
      />
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

export default SliderControl;
