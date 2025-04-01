
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (vals: number[]) => void;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  instantUpdate?: boolean;
}

const SliderControl = ({ 
  label, 
  value, 
  onChange, 
  description,
  min = 50,
  max = 150,
  step = 1,
  disabled = false,
  instantUpdate = true
}: SliderControlProps) => {
  // Local state to enable dragging experience
  const [localValue, setLocalValue] = useState(value);
  
  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = (vals: number[]) => {
    setLocalValue(vals[0]);
    
    // If instantUpdate is true, update parent state immediately
    if (instantUpdate) {
      onChange(vals);
    }
  };

  // If not instant update, update parent when dragging ends
  const handleValueCommit = () => {
    if (!instantUpdate) {
      onChange([localValue]);
    }
  };

  const displayValue = label.includes("Rate") && !label.includes("Check") 
    ? localValue.toFixed(1) 
    : Math.round(localValue);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-medium">
          {label.includes("Rate (%)") || label.includes("Rate (") 
            ? `${displayValue}%` 
            : displayValue}
        </span>
      </div>
      <Slider 
        value={[localValue]} 
        min={min} 
        max={max} 
        step={label.includes("Turnover") ? 0.1 : step} 
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        disabled={disabled}
        className="my-1"
      />
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

export default SliderControl;
