
import { useState, useRef } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceAllocation, Week } from "./gantt/types";
import { GanttHeader } from "./gantt/GanttHeader";
import { GanttTableHeader } from "./gantt/GanttTableHeader";
import { ResourceRow } from "./gantt/ResourceRow";

// Mock data for the Gantt chart
const resourceData: ResourceAllocation[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Frontend Developer",
    department: "Engineering",
    utilization: 85,
    avatar: "",
    allocations: [
      { id: 101, project: "Website Redesign", startWeek: 1, endWeek: 4, utilization: 100 },
      { id: 102, project: "Mobile App", startWeek: 6, endWeek: 12, utilization: 75 },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UX Designer",
    department: "Design",
    utilization: 90,
    avatar: "",
    allocations: [
      { id: 103, project: "Website Redesign", startWeek: 2, endWeek: 5, utilization: 100 },
      { id: 104, project: "Brand Refresh", startWeek: 7, endWeek: 10, utilization: 50 },
    ],
  },
  {
    id: 3,
    name: "Michael Davis",
    role: "Backend Developer",
    department: "Engineering",
    utilization: 70,
    avatar: "",
    allocations: [
      { id: 105, project: "API Development", startWeek: 1, endWeek: 8, utilization: 75 },
    ],
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Product Manager",
    department: "Product",
    utilization: 95,
    avatar: "",
    allocations: [
      { id: 106, project: "Website Redesign", startWeek: 1, endWeek: 6, utilization: 50 },
      { id: 107, project: "Mobile App", startWeek: 7, endWeek: 12, utilization: 75 },
    ],
  },
  {
    id: 5,
    name: "James Brown",
    role: "DevOps Engineer",
    department: "Engineering",
    utilization: 80,
    avatar: "",
    allocations: [
      { id: 108, project: "Cloud Migration", startWeek: 3, endWeek: 9, utilization: 100 },
    ],
  },
];

// Generate weeks for the chart
const weeks: Week[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i * 7);
  return {
    week: i + 1,
    label: `W${i + 1}`,
    month: date.toLocaleString('default', { month: 'short' }),
  };
});

const GanttView = () => {
  const [resources, setResources] = useState(resourceData);
  const [draggingItem, setDraggingItem] = useState<any>(null);
  const [currentRange, setCurrentRange] = useState({ start: 0, end: 12 });
  const tableRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (resourceId: number, allocationId: number) => {
    const resource = resources.find(r => r.id === resourceId);
    const allocation = resource?.allocations.find(a => a.id === allocationId);
    
    if (allocation) {
      setDraggingItem({
        resourceId,
        allocationId,
        startWeek: allocation.startWeek,
        endWeek: allocation.endWeek,
      });
    }
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDrop = (resourceId: number, week: number) => {
    if (!draggingItem) return;
    
    const duration = draggingItem.endWeek - draggingItem.startWeek;
    const newStartWeek = week;
    const newEndWeek = week + duration;
    
    setResources(resources.map(resource => {
      if (resource.id === draggingItem.resourceId) {
        return {
          ...resource,
          allocations: resource.allocations.map(allocation => {
            if (allocation.id === draggingItem.allocationId) {
              return {
                ...allocation,
                startWeek: newStartWeek,
                endWeek: newEndWeek,
              };
            }
            return allocation;
          }),
        };
      }
      return resource;
    }));
    
    setDraggingItem(null);
  };

  return (
    <div className="h-full flex flex-col">
      <GanttHeader 
        currentRange={currentRange} 
        onRangeChange={setCurrentRange} 
      />
      
      <ScrollArea className="flex-1" ref={tableRef}>
        <div className="min-w-[800px]">
          <Table>
            <GanttTableHeader 
              weeks={weeks} 
              currentRange={currentRange} 
            />
            <TableBody>
              {resources.map(resource => (
                <ResourceRow
                  key={resource.id}
                  resource={resource}
                  weeks={weeks}
                  currentRange={currentRange}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GanttView;
