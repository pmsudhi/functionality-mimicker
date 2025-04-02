
import { FolderOpen, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description = "There's no data to display right now.",
  icon,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 border-dashed border-muted-foreground/30",
      className
    )}>
      <div className="w-12 h-12 mb-4 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {action && (
        <Button onClick={action.onClick} size="sm" className="gap-1">
          <PlusCircle className="w-4 h-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
