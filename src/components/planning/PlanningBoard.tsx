
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { PlanningSquare } from 'lucide-react';

// Import existing components - assuming these are already in the codebase
import GanttView from './GanttView';
import TeamView from './TeamView';
import CapacityView from './CapacityView';
import EfficiencyMetrics from './EfficiencyMetrics';
import ScenarioBuilder from './ScenarioBuilder';
import ScenarioComparison from './ScenarioComparison';
import FinancialImpact from './FinancialImpact';
import PeakHourAnalysis from './PeakHourAnalysis';
import RevenueProjections from './RevenueProjections';

const PlanningBoard = () => {
  const [activeTab, setActiveTab] = useState('gantt');

  return (
    <PageLayout>
      <PageHeader
        title="Planning Board"
        description="Plan and visualize your staffing strategies"
        icon={<PlanningSquare className="h-6 w-6 text-primary" />}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 w-full h-12">
          <TabsTrigger value="gantt">Gantt View</TabsTrigger>
          <TabsTrigger value="team">Team View</TabsTrigger>
          <TabsTrigger value="capacity">Capacity</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="scenario">Scenario</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="peak">Peak Hours</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gantt">
          <GanttView />
        </TabsContent>
        
        <TabsContent value="team">
          <TeamView />
        </TabsContent>
        
        <TabsContent value="capacity">
          <CapacityView />
        </TabsContent>
        
        <TabsContent value="efficiency">
          <EfficiencyMetrics />
        </TabsContent>
        
        <TabsContent value="scenario">
          <ScenarioBuilder />
        </TabsContent>
        
        <TabsContent value="comparison">
          <ScenarioComparison />
        </TabsContent>
        
        <TabsContent value="financial">
          <FinancialImpact />
        </TabsContent>
        
        <TabsContent value="peak">
          <PeakHourAnalysis />
        </TabsContent>
        
        <TabsContent value="revenue">
          <RevenueProjections />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default PlanningBoard;
