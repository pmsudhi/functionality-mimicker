
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { Users } from 'lucide-react';
import { StaffingOverviewTab } from './tabs/StaffingOverviewTab';
import { PositionsTab } from './tabs/PositionsTab';
import { CostAnalysisTab } from './tabs/CostAnalysisTab';
import { StaffingMetricCards } from './components/StaffingMetricCards';

const StaffingStructure = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageLayout>
      <PageHeader
        title="Staffing Structure"
        description="Organize and optimize your workforce"
        icon={<Users className="h-6 w-6 text-primary" />}
      />
      
      <StaffingMetricCards />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview">Staffing Overview</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <StaffingOverviewTab />
        </TabsContent>
        
        <TabsContent value="positions" className="mt-6">
          <PositionsTab />
        </TabsContent>
        
        <TabsContent value="cost" className="mt-6">
          <CostAnalysisTab />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default StaffingStructure;
