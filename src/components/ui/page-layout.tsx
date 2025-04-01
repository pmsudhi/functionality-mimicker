
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageLayout({ 
  children, 
  className,
  fullWidth = false
}: PageLayoutProps) {
  return (
    <div className={cn(
      "p-6 h-full overflow-auto",
      !fullWidth && "container mx-auto max-w-7xl",
      className
    )}>
      {children}
    </div>
  );
}
