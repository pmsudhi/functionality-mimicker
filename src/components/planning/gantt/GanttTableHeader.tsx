
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Week } from "./types";
import { cn } from "@/lib/utils";

interface GanttTableHeaderProps {
  weeks: Week[];
  currentRange: { start: number; end: number };
}

export const GanttTableHeader = ({ weeks, currentRange }: GanttTableHeaderProps) => {
  // Helper function to determine if a week contains weekend days
  const isWeekendColumn = (weekNumber: number): boolean => {
    // For simplicity, let's assume odd-numbered weeks contain weekends
    // In a real application, you would use the actual date to determine this
    return weekNumber % 2 === 0;
  };

  return (
    <TableHeader className="sticky top-0 bg-background z-10">
      <TableRow>
        <TableHead className="w-60">Resource</TableHead>
        {weeks.slice(currentRange.start, currentRange.end).map(week => (
          <TableHead 
            key={week.week} 
            className={cn(
              "w-24 text-center",
              isWeekendColumn(week.week) ? "bg-secondary-100 dark:bg-secondary-800" : ""
            )}
          >
            <div>{week.label}</div>
            <div className="text-xs text-muted-foreground">{week.month}</div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default GanttTableHeader;
