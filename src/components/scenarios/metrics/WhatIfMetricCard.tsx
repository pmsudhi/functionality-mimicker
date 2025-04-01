
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WhatIfMetricCardProps {
  title: string;
  value: string;
  change?: string;
  isGreen?: boolean;
  className?: string;
}

const WhatIfMetricCard = ({ 
  title, 
  value, 
  change, 
  isGreen = true,
  className 
}: WhatIfMetricCardProps) => (
  <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
    <CardContent className="pt-6 p-4">
      <div className="text-sm font-medium text-muted-foreground mb-2">{title}</div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {change && (
        <div className={cn(
          "text-xs mt-1 font-medium", 
          isGreen ? "text-green-500" : "text-red-500"
        )}>
          {change}
        </div>
      )}
    </CardContent>
  </Card>
);

export default WhatIfMetricCard;
