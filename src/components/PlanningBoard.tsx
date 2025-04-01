
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, Calendar, BarChart3, Clock, 
  PlusCircle, DragHorizontal, Filter 
} from "lucide-react";
import GanttView from "@/components/planning/GanttView";
import TeamView from "@/components/planning/TeamView";
import CapacityView from "@/components/planning/CapacityView";

const PlanningBoard = () => {
  const [planningView, setPlanningView] = useState("gantt");
  
  return (
    <div className="h-full flex flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manpower Planning</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Q3 2023
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            All Departments
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Resource
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Headcount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">146</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">78%</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Capacity Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">23 FTE</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center mt-1">
              <Badge variant="destructive" className="text-xs">
                Needs Attention
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-hidden border rounded-md">
        <Tabs 
          defaultValue="gantt" 
          value={planningView}
          onValueChange={setPlanningView}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="bg-transparent w-auto">
              <TabsTrigger value="gantt" className="data-[state=active]:bg-transparent">
                Gantt View
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-transparent">
                Team View
              </TabsTrigger>
              <TabsTrigger value="capacity" className="data-[state=active]:bg-transparent">
                Capacity Planning
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="gantt" className="h-full m-0">
              <GanttView />
            </TabsContent>
            <TabsContent value="team" className="h-full m-0">
              <TeamView />
            </TabsContent>
            <TabsContent value="capacity" className="h-full m-0">
              <CapacityView />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanningBoard;
