
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/ui/page-layout";
import { 
  Users, Calendar, BarChart3, Clock, 
  PlusCircle, Filter, MoreHorizontal,
  TrendingUp, DollarSign, BriefcaseBusiness,
  LineChart, PieChart, BarChartHorizontal, Share2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScenarioBuilder } from "./ScenarioBuilder";
import { StaffingModeler } from "./StaffingModeler";
import { FinancialImpact } from "./FinancialImpact";
import { ScenarioComparison } from "./ScenarioComparison";
import { PeakHourAnalysis } from "./PeakHourAnalysis";
import { EfficiencyMetrics } from "./EfficiencyMetrics";
import { RevenueProjections } from "./RevenueProjections";

const PlanningBoard = () => {
  const [planningView, setPlanningView] = useState("scenarios");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("q3-2023");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const { toast } = useToast();
  
  // Animated counter effect for metrics
  const [countValues, setCountValues] = useState({
    staff: 386,
    laborCost: 26.4,
    efficiency: 3.8
  });
  
  const handleCreateScenario = () => {
    setPlanningView("scenarios");
    toast({
      title: "New Scenario",
      description: "Create a new workforce planning scenario",
    });
  };
  
  return (
    <PageLayout>
      <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-background to-muted/30">
        {/* Header with advanced filters */}
        <div className="border-b bg-background/95 backdrop-blur-sm p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <BriefcaseBusiness className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">F&B Manpower Planning</h2>
                <p className="text-sm text-muted-foreground">Optimize your workforce efficiency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                <SelectTrigger className="w-[140px] border-dashed">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q3-2023">Q3 2023</SelectItem>
                  <SelectItem value="q4-2023">Q4 2023</SelectItem>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-[140px] border-dashed">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="white-robata">White Robata</SelectItem>
                  <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
                  <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
                  <SelectItem value="nomad">Nomad</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Planning Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast({ title: "Export Data", description: "Exporting data to Excel" })}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Print Report", description: "Preparing report for print" })}>
                    Print Report
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Configure planning parameters" })}>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={handleCreateScenario} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <PlusCircle className="h-4 w-4" />
                New Scenario
              </Button>
            </div>
          </div>
        </div>
        
        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
                <span>Current Staff</span>
                <Users className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">{countValues.staff}</div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Badge className="mr-2 bg-green-500/20 text-green-700 hover:bg-green-500/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Optimized
                  </Badge>
                  <span>Across 7 outlets</span>
                </div>
                <div className="h-1 w-full bg-muted mt-3 group-hover:bg-muted/60 transition-colors">
                  <div className="h-full bg-primary rounded-r-full group-hover:bg-primary/80 transition-colors" style={{ width: '65%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
                <span>Labor Cost Percentage</span>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">{countValues.laborCost}%</div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Badge className="mr-2 bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Moderate
                  </Badge>
                  <span>Industry avg: 25-30%</span>
                </div>
                <div className="h-1 w-full bg-muted mt-3 group-hover:bg-muted/60 transition-colors">
                  <div className="h-full bg-primary rounded-r-full group-hover:bg-primary/80 transition-colors" style={{ width: `${(countValues.laborCost/30)*100}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
                <span>Efficiency Rating</span>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">{countValues.efficiency}</div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Badge className="mr-2 bg-blue-500/20 text-blue-700 hover:bg-blue-500/20">
                    <Clock className="h-3 w-3 mr-1" />
                    Covers per Labor Hour
                  </Badge>
                  <span>Target: 4.0</span>
                </div>
                <div className="h-1 w-full bg-muted mt-3 group-hover:bg-muted/60 transition-colors">
                  <div className="h-full bg-primary rounded-r-full group-hover:bg-primary/80 transition-colors" style={{ width: `${(countValues.efficiency/5)*100}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Area with Tabs */}
        <div className="flex-1 overflow-hidden border rounded-md m-4 bg-background/95 backdrop-blur-sm shadow-sm">
          <Tabs 
            defaultValue="scenarios" 
            value={planningView}
            onValueChange={setPlanningView}
            className="h-full flex flex-col"
          >
            <div className="border-b px-4 bg-muted/20">
              <TabsList className="h-12 bg-transparent w-auto flex overflow-x-auto no-scrollbar">
                <TabsTrigger value="scenarios" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <PieChart className="h-4 w-4 mr-2" />
                    <span>Scenarios</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="staffing" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Staffing Model</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Financial Impact</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="comparison" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <BarChartHorizontal className="h-4 w-4 mr-2" />
                    <span>Scenario Comparison</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="peak" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Peak Hour Analysis</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="efficiency" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Efficiency Metrics</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="revenue" className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4">
                  <div className="flex items-center">
                    <LineChart className="h-4 w-4 mr-2" />
                    <span>Revenue Projections</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="scenarios" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <ScenarioBuilder />
              </TabsContent>
              <TabsContent value="staffing" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <StaffingModeler />
              </TabsContent>
              <TabsContent value="financial" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <FinancialImpact />
              </TabsContent>
              <TabsContent value="comparison" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <ScenarioComparison />
              </TabsContent>
              <TabsContent value="peak" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <PeakHourAnalysis />
              </TabsContent>
              <TabsContent value="efficiency" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <EfficiencyMetrics />
              </TabsContent>
              <TabsContent value="revenue" className="h-full m-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                <RevenueProjections />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default PlanningBoard;
