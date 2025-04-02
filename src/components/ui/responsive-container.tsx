
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
  withHorizontalPadding?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  withPadding = true,
  withHorizontalPadding = true,
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        withPadding && "py-6",
        withHorizontalPadding && "px-4 sm:px-6 lg:px-8",
        !fullWidth && "max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
