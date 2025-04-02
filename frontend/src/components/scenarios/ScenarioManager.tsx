
import React, { useState } from 'react';
import { BriefcaseBusiness, ArrowLeft, FileIcon, LightbulbIcon } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { ConsistentTabs } from '@/components/ui/consistent-tabs';
import SavedScenariosTab from './tabs/SavedScenariosTab';
import WhatIfAnalysisTab from './tabs/WhatIfAnalysisTab';

const ScenarioManager = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const location = useLocation();
  
  // Check if we came from the dashboard
  const showBackButton = location.state && location.state.from === "dashboard";

  const tabs = [
    {
      value: 'saved',
      label: 'Saved Scenarios',
      icon: FileIcon,
      content: <SavedScenariosTab />
    },
    {
      value: 'what-if',
      label: 'What-If Analysis',
      icon: LightbulbIcon,
      content: <WhatIfAnalysisTab />
    }
  ];

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
        
        <ConsistentTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="outline"
        />
      </div>
    </PageLayout>
  );
};

export default ScenarioManager;
