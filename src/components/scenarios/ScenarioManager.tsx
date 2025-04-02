
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageLayout } from '@/components/ui/page-layout';
import SavedScenariosTab from './tabs/SavedScenariosTab';
import WhatIfAnalysisTab from './tabs/WhatIfAnalysisTab';
import { BriefcaseBusiness, ArrowLeft, FileIcon, LightbulbIcon } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';

const ScenarioManager = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const location = useLocation();
  
  // Check if we came from the dashboard
  const showBackButton = location.state && location.state.from === "dashboard";

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="Scenarios"
          description="Create, compare, and manage staffing scenarios"
          icon={<BriefcaseBusiness className="h-6 w-6 text-primary" />}
        >
          {showBackButton && (
            <Link to="/">
              <Button variant="outline" size="icon" className="hover:bg-background/80 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </PageHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/40 mb-6 p-1 border border-border/20 rounded-md">
            <TabsTrigger value="saved" className="data-[state=active]:bg-background rounded-md flex items-center gap-2 px-4">
              <FileIcon className="h-4 w-4" />
              Saved Scenarios
            </TabsTrigger>
            <TabsTrigger value="what-if" className="data-[state=active]:bg-background rounded-md flex items-center gap-2 px-4">
              <LightbulbIcon className="h-4 w-4" />
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
