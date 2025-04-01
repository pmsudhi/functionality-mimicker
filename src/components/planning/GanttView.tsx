
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, GripVertical, Plus } from "lucide-react";

// Mock data for the Gantt chart
const resourceData = [
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
const weeks = Array.from({ length: 12 }, (_, i) => {
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
      <div className="p-2 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Resource
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentRange({ 
            start: Math.max(0, currentRange.start - 4), 
            end: Math.max(4, currentRange.end - 4)
          })}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">Weeks {currentRange.start + 1}-{currentRange.end}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentRange({ 
            start: Math.min(8, currentRange.start + 4), 
            end: Math.min(16, currentRange.end + 4)
          })}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1" ref={tableRef}>
        <div className="min-w-[800px]">
          <Table>
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
            <TableBody>
              {resources.map(resource => (
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
                    <TableCell 
                      key={week.week} 
                      className="p-0 relative h-16"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(resource.id, week.week)}
                    >
                      {resource.allocations
                        .filter(allocation => 
                          allocation.startWeek <= week.week && allocation.endWeek >= week.week
                        )
                        .map(allocation => {
                          const isStart = allocation.startWeek === week.week;
                          const isEnd = allocation.endWeek === week.week;
                          const spanWeeks = allocation.endWeek - allocation.startWeek + 1;
                          
                          // Only render at the start week
                          if (!isStart) return null;
                          
                          return (
                            <div
                              key={allocation.id}
                              className={`absolute top-2 h-10 ${
                                allocation.utilization >= 75 ? 'bg-blue-500' :
                                allocation.utilization >= 50 ? 'bg-blue-400' : 'bg-blue-300'
                              } text-white rounded-md p-1 overflow-hidden text-xs cursor-grab`}
                              style={{
                                left: '4px',
                                width: `calc(${spanWeeks * 100}% - 8px)`,
                                zIndex: 5,
                              }}
                              draggable
                              onDragStart={() => handleDragStart(resource.id, allocation.id)}
                              onDragEnd={handleDragEnd}
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
                        })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GanttView;
