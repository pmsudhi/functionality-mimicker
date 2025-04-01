
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, Calendar, BarChart3, Clock, 
  PlusCircle, GripHorizontal, Filter 
} from "lucide-react";
import ScenarioBuilder from "@/components/planning/ScenarioBuilder";
import StaffingModeler from "@/components/planning/StaffingModeler";
import FinancialImpact from "@/components/planning/FinancialImpact";
import ScenarioComparison from "@/components/planning/ScenarioComparison";
import PeakHourAnalysis from "@/components/planning/PeakHourAnalysis";
import EfficiencyMetrics from "@/components/planning/EfficiencyMetrics";
import RevenueProjections from "@/components/planning/RevenueProjections";

const PlanningBoard = () => {
  const [planningView, setPlanningView] = useState("scenarios");
  
  return (
    <div className="h-full flex flex-col overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">F&B Manpower Planning</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Q3 2023
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            All Brands
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Scenario
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">386</div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 7 outlets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Labor Cost Percentage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">26.4%</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <Progress value={26.4} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Efficiency Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3.8</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="text-xs">
                Covers per Labor Hour
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-hidden border rounded-md">
        <Tabs 
          defaultValue="scenarios" 
          value={planningView}
          onValueChange={setPlanningView}
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="bg-transparent w-auto">
              <TabsTrigger value="scenarios" className="data-[state=active]:bg-transparent">
                Scenarios
              </TabsTrigger>
              <TabsTrigger value="staffing" className="data-[state=active]:bg-transparent">
                Staffing Model
              </TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-transparent">
                Financial Impact
              </TabsTrigger>
              <TabsTrigger value="comparison" className="data-[state=active]:bg-transparent">
                Scenario Comparison
              </TabsTrigger>
              <TabsTrigger value="peak" className="data-[state=active]:bg-transparent">
                Peak Hour Analysis
              </TabsTrigger>
              <TabsTrigger value="efficiency" className="data-[state=active]:bg-transparent">
                Efficiency Metrics
              </TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-transparent">
                Revenue Projections
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="scenarios" className="h-full m-0">
              <ScenarioBuilder />
            </TabsContent>
            <TabsContent value="staffing" className="h-full m-0">
              <StaffingModeler />
            </TabsContent>
            <TabsContent value="financial" className="h-full m-0">
              <FinancialImpact />
            </TabsContent>
            <TabsContent value="comparison" className="h-full m-0">
              <ScenarioComparison />
            </TabsContent>
            <TabsContent value="peak" className="h-full m-0">
              <PeakHourAnalysis />
            </TabsContent>
            <TabsContent value="efficiency" className="h-full m-0">
              <EfficiencyMetrics />
            </TabsContent>
            <TabsContent value="revenue" className="h-full m-0">
              <RevenueProjections />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PlanningBoard;
