
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
            <div 
              className="space-y-3"
              dangerouslySetInnerHTML={{ 
                __html: formatTooltipContent(content)
              }}
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 

// Function to format tooltip content with styling
function formatTooltipContent(content: string): string {
  // Process horizontal rules
  let formatted = content.replace(
    /───+/g, 
    '<hr class="my-3 border-t border-gray-200 dark:border-gray-700" />'
  );
  
  // Format formulas section
  formatted = formatted.replace(
    /Formulas:/g,
    '<h4 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Formulas:</h4>'
  );
  
  // Format variable names in formulas
  formatted = formatted.replace(
    /(FOH Area|Internal Seating|Total Seating|Total Restaurant Area|FOH%|Area per Cover|External Seating)(?=\s*[=\+\-\*\/])/g,
    '<span class="font-medium text-primary-600 dark:text-primary-400">$1</span>'
  );
  
  // Format operators
  formatted = formatted.replace(
    /([=\+\-\*\/×÷])/g,
    '<span class="mx-1 text-gray-500 dark:text-gray-400">$1</span>'
  );
  
  // Format section headers
  formatted = formatted.replace(
    /(Fast Casual|Casual Dining|Premium Dining|Area per Cover Options):/g,
    '<h5 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-3 mb-1">$1:</h5>'
  );
  
  // Format bullet points
  formatted = formatted.replace(
    /•\s+([\d\.]+\s+sqm\s+-\s+.+)/g,
    '<div class="flex items-start mb-1 ml-1"><span class="text-primary-500 mr-1.5">•</span><span class="flex-1"><span class="font-medium">$1</span></span></div>'
  );
  
  return formatted;
}
