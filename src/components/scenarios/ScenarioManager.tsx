
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageLayout } from '@/components/ui/page-layout';
import SavedScenariosTab from './tabs/SavedScenariosTab';
import WhatIfAnalysisTab from './tabs/WhatIfAnalysisTab';

const ScenarioManager = () => {
  const [activeTab, setActiveTab] = useState('saved');

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Scenarios</h1>
          <p className="text-muted-foreground">Create, compare, and manage staffing scenarios</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/40 mb-6">
            <TabsTrigger value="saved">Saved Scenarios</TabsTrigger>
            <TabsTrigger value="what-if">What-If Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="space-y-6">
            <SavedScenariosTab />
          </TabsContent>
          
          <TabsContent value="what-if" className="space-y-6">
            <WhatIfAnalysisTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ScenarioManager;
