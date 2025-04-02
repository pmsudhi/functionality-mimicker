
import React, { useState } from 'react';
import { 
  LayoutPanelLeft, PieChart, Users, DollarSign, 
  BarChartHorizontal, TrendingUp, BarChart3, LineChart 
} from 'lucide-react';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConsistentTabs } from '@/components/ui/consistent-tabs';

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

  const tabs = [
    {
      value: 'gantt',
      label: 'Gantt View',
      icon: LayoutPanelLeft,
      content: <GanttView />
    },
    {
      value: 'team',
      label: 'Team View',
      icon: Users,
      content: <TeamView />
    },
    {
      value: 'capacity',
      label: 'Capacity',
      icon: PieChart,
      content: <CapacityView />
    },
    {
      value: 'efficiency',
      label: 'Efficiency',
      icon: BarChart3,
      content: <EfficiencyMetrics />
    },
    {
      value: 'scenario',
      label: 'Scenario',
      icon: PieChart,
      content: <ScenarioBuilder />
    },
    {
      value: 'comparison',
      label: 'Comparison',
      icon: BarChartHorizontal,
      content: <ScenarioComparison />
    },
    {
      value: 'financial',
      label: 'Financial',
      icon: DollarSign,
      content: <FinancialImpact />
    },
    {
      value: 'peak',
      label: 'Peak Hours',
      icon: TrendingUp,
      content: <PeakHourAnalysis />
    },
    {
      value: 'revenue',
      label: 'Revenue',
      icon: LineChart,
      content: <RevenueProjections />
    }
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Planning Board"
        description="Plan and visualize your staffing strategies"
        icon={<LayoutPanelLeft className="h-6 w-6 text-primary" />}
      />
      
      <div className="mt-6 overflow-hidden border rounded-lg bg-card">
        <ScrollArea orientation="horizontal" className="w-full">
          <ConsistentTabs
            tabs={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
            variant="underline"
          />
        </ScrollArea>
      </div>
    </PageLayout>
  );
};

export default PlanningBoard;
