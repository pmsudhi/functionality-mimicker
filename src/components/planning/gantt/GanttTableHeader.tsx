
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Week } from "./types";

interface GanttTableHeaderProps {
  weeks: Week[];
  currentRange: { start: number; end: number };
}

export const GanttTableHeader = ({ weeks, currentRange }: GanttTableHeaderProps) => {
  return (
    <TableHeader className="sticky top-0 bg-background z-10">
      <TableRow>
        <TableHead className="w-60">Resource</TableHead>
        {weeks.slice(currentRange.start, currentRange.end).map(week => (
          <TableHead key={week.week} className="w-24 text-center">
            <div>{week.label}</div>
            <div className="text-xs text-muted-foreground">{week.month}</div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default GanttTableHeader;
