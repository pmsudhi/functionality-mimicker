
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
          side="top"
          sideOffset={5}
        >
          <div 
            className="tooltip-content"
            dangerouslySetInnerHTML={{ 
              __html: content 
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
