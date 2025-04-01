
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface FilterPanelProps {
  activeTab: string;
}

const FilterPanel = ({ activeTab }: FilterPanelProps) => {
  const [utilization, setUtilization] = useState([75]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  });

  const renderPlanningFilters = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Resources</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Search..." className="pl-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange as any}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Utilization Target (%)</Label>
          <Slider
            value={utilization}
            onValueChange={setUtilization}
            max={100}
            step={1}
            className="slider-track"
          />
          <div className="text-center text-sm">{utilization}%</div>
        </div>

        <div className="space-y-3">
          <Label>Department</Label>
          <div className="space-y-2">
            {["Engineering", "Design", "Product", "Marketing"].map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox id={`dept-${dept}`} />
                <label htmlFor={`dept-${dept}`} className="text-sm font-medium">
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Location</Label>
          <div className="space-y-2">
            {["New York", "San Francisco", "London", "Remote"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={`location-${location}`} />
                <label htmlFor={`location-${location}`} className="text-sm font-medium">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">
        <Filter className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </>
  );

  const renderAllocationFilters = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-search">Search Projects</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="project-search" placeholder="Search projects..." className="pl-8" />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Project Status</Label>
          <div className="space-y-2">
            {["Active", "Planned", "Completed", "On Hold"].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox id={`status-${status}`} />
                <label htmlFor={`status-${status}`} className="text-sm font-medium">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Resource Type</Label>
          <div className="space-y-2">
            {["Full-time", "Contractor", "Part-time"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`type-${type}`} />
                <label htmlFor={`type-${type}`} className="text-sm font-medium">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">
        <Filter className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </>
  );

  const renderSkillsFilters = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill-search">Search Skills</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="skill-search" placeholder="Search skills..." className="pl-8" />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Skill Category</Label>
          <div className="space-y-2">
            {["Technical", "Soft Skills", "Domain Knowledge", "Certifications"].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category-${category}`} />
                <label htmlFor={`category-${category}`} className="text-sm font-medium">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Slider
            defaultValue={[3]}
            max={10}
            step={1}
            className="slider-track"
          />
          <div className="flex justify-between text-xs">
            <span>Junior</span>
            <span>Mid</span>
            <span>Senior</span>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">
        <Filter className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </>
  );

  const renderAnalyticsFilters = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Time Period</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange as any}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-3">
          <Label>Group By</Label>
          <div className="space-y-2">
            {["Department", "Project", "Skill", "Location"].map((group) => (
              <div key={group} className="flex items-center space-x-2">
                <Checkbox id={`group-${group}`} />
                <label htmlFor={`group-${group}`} className="text-sm font-medium">
                  {group}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Metrics</Label>
          <div className="space-y-2">
            {["Utilization", "Cost", "Capacity", "Headcount"].map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Checkbox id={`metric-${metric}`} />
                <label htmlFor={`metric-${metric}`} className="text-sm font-medium">
                  {metric}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">
        <Filter className="mr-2 h-4 w-4" />
        Apply Filters
      </Button>
    </>
  );

  return (
    <div className="h-full overflow-auto p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {activeTab === "planning" && renderPlanningFilters()}
        {activeTab === "allocation" && renderAllocationFilters()}
        {activeTab === "skills" && renderSkillsFilters()}
        {activeTab === "analytics" && renderAnalyticsFilters()}
      </div>
    </div>
  );
};

export default FilterPanel;
