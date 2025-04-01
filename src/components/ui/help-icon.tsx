
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
          <HelpCircle className={`h-4 w-4 text-primary-400 hover:text-primary-600 transition-colors cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[400px] p-0 overflow-hidden bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-gray-800 rounded-lg"
          sideOffset={5}
        >
          <div className="p-4 text-sm text-gray-700 dark:text-gray-200">
            {typeof content === 'string' && content.includes('<') ? (
              <div 
                className="space-y-3"
                dangerouslySetInnerHTML={{ 
                  __html: content 
                }}
              />
            ) : (
              <div className="space-y-3">{content}</div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 

// Function to format tooltip content with styling is no longer needed as we're
// directly using the HTML content as provided in the constants
