
import { cn } from "@/lib/utils";

interface StatComparisonProps {
  label: string;
  value1: string | number;
  value2: string | number;
  difference?: number;
  positiveIsBetter?: boolean;
  className?: string;
}

export function StatComparison({
  label,
  value1,
  value2,
  difference,
  positiveIsBetter = true,
  className,
}: StatComparisonProps) {
  // Display the difference with the correct styling
  const getDiffDisplay = () => {
    if (difference === undefined || difference === 0) return null;
    
    const isPositive = difference > 0;
    const isGood = (isPositive && positiveIsBetter) || (!isPositive && !positiveIsBetter);
    
    return (
      <span className={cn(
        "font-medium",
        isGood ? "text-green-500" : "text-red-500"
      )}>
        {isPositive ? '+' : ''}{difference.toLocaleString()}
      </span>
    );
  };

  return (
    <div className={cn("flex justify-between text-sm", className)}>
      <span>{label}</span>
      <div className="flex gap-2">
        <span className="font-medium">{value1}</span>
        {value2 && <span className="text-muted-foreground">vs {value2}</span>}
        {getDiffDisplay()}
      </div>
    </div>
  );
}
