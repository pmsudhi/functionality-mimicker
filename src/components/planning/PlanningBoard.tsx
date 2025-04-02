
import React, { useState } from 'react';
import { LayoutPanelLeft } from 'lucide-react';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConsistentTabs } from '@/components/ui/consistent-tabs';
import { PlanningHeader, PlanningMetricCards } from './components';
import { getPlanningTabs } from './config/planningTabs';

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
