import React, { useState } from 'react';
import { LayoutPanelLeft } from 'lucide-react';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConsistentTabs } from '@/components/ui/consistent-tabs';
import PlanningHeader from './planning-components/PlanningHeader';
import PlanningMetricCards from './planning-components/PlanningMetricCards';

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

// Import the tab definitions
import { getPlanningTabs } from './planning-components/planningTabs';

const PlanningBoard = () => {
  const [activeTab, setActiveTab] = useState('gantt');
  const tabs = getPlanningTabs();

  return (
    <PageLayout>
      <PageHeader
        title="Planning Board"
        description="Plan and visualize your staffing strategies"
        icon={<LayoutPanelLeft className="h-6 w-6 text-primary" />}
      />
      
      <PlanningHeader />
      <PlanningMetricCards />
      
      <div className="mt-6 overflow-hidden border rounded-lg bg-card">
        <ScrollArea className="w-full">
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
