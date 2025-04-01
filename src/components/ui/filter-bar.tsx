
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  actions?: ReactNode;
}

export function FilterBar({ 
  children, 
  className,
  title,
  actions 
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)}>
      {title && (
        <div className="flex-shrink-0">
          {typeof title === 'string' ? (
            <h1 className="text-3xl font-bold">{title}</h1>
          ) : (
            title
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-4 ml-auto">
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
