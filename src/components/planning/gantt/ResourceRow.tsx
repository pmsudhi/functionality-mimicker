
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { GripVertical } from "lucide-react";
import { ResourceAllocation, Week } from "./types";
import { AllocationBar } from "./AllocationBar";

interface ResourceRowProps {
  resource: ResourceAllocation;
  weeks: Week[];
  currentRange: { start: number; end: number };
  onDragStart: (resourceId: number, allocationId: number) => void;
  onDragEnd: () => void;
  onDrop: (resourceId: number, week: number) => void;
}

export const ResourceRow = ({ 
  resource, 
  weeks, 
  currentRange,
  onDragStart,
  onDragEnd,
  onDrop
}: ResourceRowProps) => {
  return (
    <TableRow key={resource.id}>
      <TableCell className="align-top font-medium">
        <div className="flex items-center space-x-2">
          <GripVertical className="h-4 w-4 text-muted-foreground drag-handle" />
          <Avatar className="h-6 w-6">
            <AvatarImage src={resource.avatar} alt={resource.name} />
            <AvatarFallback>{resource.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{resource.name}</div>
            <div className="text-xs text-muted-foreground">{resource.role}</div>
          </div>
        </div>
      </TableCell>

      {weeks.slice(currentRange.start, currentRange.end).map(week => (
        <AllocationCell 
          key={week.week}
          week={week}
          resource={resource}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
        />
      ))}
    </TableRow>
  );
};

interface AllocationCellProps {
  week: Week;
  resource: ResourceAllocation;
  onDragStart: (resourceId: number, allocationId: number) => void;
  onDragEnd: () => void;
  onDrop: (resourceId: number, week: number) => void;
}

const AllocationCell = ({ 
  week, 
  resource,
  onDragStart,
  onDragEnd,
  onDrop
}: AllocationCellProps) => {
  return (
    <TableCell 
      className="p-0 relative h-16"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(resource.id, week.week)}
    >
      {resource.allocations
        .filter(allocation => 
          allocation.startWeek <= week.week && allocation.endWeek >= week.week
        )
        .map(allocation => {
          const isStart = allocation.startWeek === week.week;
          const spanWeeks = allocation.endWeek - allocation.startWeek + 1;
          
          // Only render at the start week
          if (!isStart) return null;
          
          return (
            <AllocationBar 
              key={allocation.id}
              allocation={allocation}
              spanWeeks={spanWeeks}
              resourceId={resource.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
    </TableCell>
  );
};

export default ResourceRow;
