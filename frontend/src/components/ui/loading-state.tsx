
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ 
  message = "Loading...", 
  className, 
  iconClassName,
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], iconClassName)} />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
