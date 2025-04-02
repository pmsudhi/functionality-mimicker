
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  footer?: ReactNode;
}

export function ChartContainer({
  title,
  description,
  children,
  className,
  contentClassName,
  footer,
}: ChartContainerProps) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("flex-1", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <div className="p-4 pt-0 mt-auto">
          {footer}
        </div>
      )}
    </Card>
  );
}
