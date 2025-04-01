
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HelpIconProps {
  content: string;
  className?: string;
}

export function HelpIcon({ content, className = "" }: HelpIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info 
            className={`h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-help ${className}`} 
          />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[350px] p-3 bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-lg text-sm text-foreground"
          sideOffset={5}
        >
          <div 
            className="space-y-2"
            dangerouslySetInnerHTML={{ 
              __html: content 
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
