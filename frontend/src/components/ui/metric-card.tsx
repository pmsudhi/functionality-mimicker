
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  description?: string;
  className?: string;
  footer?: ReactNode;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  description,
  className,
  footer,
}: MetricCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        
        {trend && (
          <div className="text-xs text-muted-foreground mt-1">
            <span 
              className={cn(
                "font-medium", 
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.value}
            </span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        
        {footer && (
          <div className="mt-2">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
