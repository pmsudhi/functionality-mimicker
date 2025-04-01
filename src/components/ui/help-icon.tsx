import { HelpCircle } from "lucide-react";
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
          <HelpCircle className={`h-4 w-4 text-muted-foreground cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[400px] p-4 whitespace-pre-wrap bg-white dark:bg-zinc-950 shadow-lg"
          style={{ 
            fontSize: '13px',
            lineHeight: '1.5'
          }}
        >
          <div 
            className="space-y-3"
            dangerouslySetInnerHTML={{ 
              __html: content.replace(
                /───+/g, 
                '<hr class="my-2 border-t border-gray-200 dark:border-gray-800" />'
              )
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 