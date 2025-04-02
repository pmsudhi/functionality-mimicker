
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { ConsistentTabs } from '@/components/ui/consistent-tabs';
import { StaffingOverviewTab } from './tabs/StaffingOverviewTab';
import { PositionsTab } from './tabs/PositionsTab';
import { CostAnalysisTab } from './tabs/CostAnalysisTab';
import { StaffingMetricCards } from './components/StaffingMetricCards';

const StaffingStructure = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      value: 'overview',
      label: 'Staffing Overview',
      content: <StaffingOverviewTab />
    },
    {
      value: 'positions',
      label: 'Positions',
      content: <PositionsTab />
    },
    {
      value: 'cost',
      label: 'Cost Analysis',
      content: <CostAnalysisTab />
    }
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Staffing Structure"
        description="Organize and optimize your workforce"
        icon={<Users className="h-6 w-6 text-primary" />}
      />
      
      <StaffingMetricCards />
      
      <ConsistentTabs 
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-6"
      />
    </PageLayout>
  );
};

export default StaffingStructure;
