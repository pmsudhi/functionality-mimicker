
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
          className="max-w-[350px] bg-white dark:bg-zinc-900 shadow-lg border border-border rounded-lg text-sm text-foreground"
          side="top"
          sideOffset={5}
        >
          <div 
            className="tooltip-content p-3"
            dangerouslySetInnerHTML={{ 
              __html: content 
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
