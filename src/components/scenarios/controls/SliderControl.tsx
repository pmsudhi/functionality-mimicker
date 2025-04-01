
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
  // Local state to track current slider value during dragging
  const [localValue, setLocalValue] = useState(value);
  
  // Sync local state with prop value when it changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Handle value change from slider
  const handleValueChange = (vals: number[]) => {
    const newValue = vals[0];
    setLocalValue(newValue); // Update local state for immediate UI feedback
    
    // Pass the new value up to parent
    onChange(vals);
  };

  // Format displayed value according to type of parameter
  const displayValue = label.includes("Rate") && !label.includes("Check") 
    ? localValue.toFixed(1) 
    : Math.round(localValue);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-md">
          {label.includes("Rate (%)") || label.includes("Rate (") || label.includes("%")
            ? `${displayValue}%` 
            : displayValue}
        </span>
      </div>
      <Slider 
        value={[localValue]} 
        min={min} 
        max={max} 
        step={label.includes("Turnover") || label.toLowerCase().includes("factor") ? 0.1 : step}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="my-1"
      />
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  );
};

export default SliderControl;
