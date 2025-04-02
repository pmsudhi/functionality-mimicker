
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  withPadding = true,
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        withPadding && "px-4 sm:px-6 lg:px-8 py-6",
        !fullWidth && "max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
