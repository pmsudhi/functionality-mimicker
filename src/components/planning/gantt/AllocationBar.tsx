
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Allocation } from "./types";

interface AllocationBarProps {
  allocation: Allocation;
  spanWeeks: number;
  resourceId: number;
  onDragStart: (resourceId: number, allocationId: number) => void;
  onDragEnd: () => void;
}

export const AllocationBar = ({ 
  allocation, 
  spanWeeks, 
  resourceId,
  onDragStart,
  onDragEnd 
}: AllocationBarProps) => {
  // Determine color based on utilization
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 75) return 'bg-blue-500';
    if (utilization >= 50) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  return (
    <div
      className={`absolute top-2 h-10 ${getUtilizationColor(allocation.utilization)} text-white rounded-md p-1 overflow-hidden text-xs cursor-grab`}
      style={{
        left: '4px',
        width: `calc(${spanWeeks * 100}% - 8px)`,
        zIndex: 5,
      }}
      draggable
      onDragStart={() => onDragStart(resourceId, allocation.id)}
      onDragEnd={onDragEnd}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="truncate">
              {allocation.project}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <div className="font-bold">{allocation.project}</div>
              <div>Utilization: {allocation.utilization}%</div>
              <div>Weeks: {allocation.startWeek}-{allocation.endWeek}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AllocationBar;
