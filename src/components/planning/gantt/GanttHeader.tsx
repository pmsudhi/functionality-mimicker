
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface GanttHeaderProps {
  currentRange: { start: number; end: number };
  onRangeChange: (range: { start: number; end: number }) => void;
}

export const GanttHeader = ({ currentRange, onRangeChange }: GanttHeaderProps) => {
  return (
    <div className="p-2 border-b flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Resource
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onRangeChange({ 
            start: Math.max(0, currentRange.start - 4), 
            end: Math.max(4, currentRange.end - 4)
          })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">Weeks {currentRange.start + 1}-{currentRange.end}</span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onRangeChange({ 
            start: Math.min(8, currentRange.start + 4), 
            end: Math.min(16, currentRange.end + 4)
          })}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GanttHeader;
