
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageLayout } from '@/components/ui/page-layout';
import SavedScenariosTab from './tabs/SavedScenariosTab';
import WhatIfAnalysisTab from './tabs/WhatIfAnalysisTab';
import { BriefcaseBusiness, FileText, Lightbulb } from 'lucide-react';

const ScenarioManager = () => {
  const [activeTab, setActiveTab] = useState('saved');

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Scenarios</h1>
              <p className="text-muted-foreground">Create, compare, and manage staffing scenarios</p>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/40 mb-6 p-1">
            <TabsTrigger value="saved" className="data-[state=active]:bg-background rounded-md flex items-center gap-2 px-4">
              <FileText className="h-4 w-4" />
              Saved Scenarios
            </TabsTrigger>
            <TabsTrigger value="what-if" className="data-[state=active]:bg-background rounded-md flex items-center gap-2 px-4">
              <Lightbulb className="h-4 w-4" />
              What-If Analysis
            </TabsTrigger>
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
