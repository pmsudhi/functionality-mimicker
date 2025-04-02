
import React, { useState } from 'react';
import { PageLayout } from '@/components/ui/page-layout';
import { StaffingHeader } from './components/StaffingHeader';
import { StaffingMetricCards } from './components/StaffingMetricCards';
import { StaffingTabs } from './components/StaffingTabs';
import { useBrandOutlet } from '@/context/BrandOutletContext';

const StaffingStructure = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { selectedBrandId, selectedOutletId } = useBrandOutlet();

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <StaffingHeader />
        
        <StaffingMetricCards />
        
        <StaffingTabs 
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab} 
          handleExport={(format) => console.log(`Exporting as ${format}`)} 
        />
      </div>
    </PageLayout>
  );
};

export default StaffingStructure;
