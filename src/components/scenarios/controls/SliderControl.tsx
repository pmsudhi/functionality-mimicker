
import { Slider } from "@/components/ui/slider";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (vals: number[]) => void;
  description: string;
}

const SliderControl = ({ label, value, onChange, description }: SliderControlProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-sm font-medium">{label}</label>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <Slider 
      value={[value]} 
      min={50} 
      max={150} 
      step={label.includes("Turnover") ? 0.1 : 1} 
      onValueChange={onChange} 
      className="my-1"
    />
    <p className="text-xs text-muted-foreground hidden">{description}</p>
  </div>
);

export default SliderControl;
