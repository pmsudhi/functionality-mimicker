
import React, { useState } from 'react';
import { PageLayout } from '@/components/ui/page-layout';
import { StaffingHeader } from './components/StaffingHeader';
import { StaffingMetricCards } from './components/StaffingMetricCards';
import { StaffingTabs } from './components/StaffingTabs';

const StaffingStructure = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <StaffingHeader 
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedOutlet={selectedOutlet}
          setSelectedOutlet={setSelectedOutlet}
        />
        
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
