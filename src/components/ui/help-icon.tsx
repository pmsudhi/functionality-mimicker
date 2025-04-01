
import { HelpCircle, Info } from "lucide-react";
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
          <Info className={`h-4 w-4 text-primary-500 hover:text-primary-600 transition-colors cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[450px] p-0 overflow-hidden bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-gray-800 rounded-lg"
          sideOffset={5}
        >
          <div className="p-4 text-sm">
            <div 
              className="space-y-3"
              dangerouslySetInnerHTML={{ 
                __html: content 
              }}
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
