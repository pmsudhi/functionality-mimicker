
import React from 'react';
import { FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StaffingOverviewTab } from '../tabs/StaffingOverviewTab';
import { PositionsTab } from '../tabs/PositionsTab';
import { CostAnalysisTab } from '../tabs/CostAnalysisTab';

interface StaffingTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  handleExport: (format: string) => void;
}

export const StaffingTabs: React.FC<StaffingTabsProps> = ({
  selectedTab,
  setSelectedTab,
  handleExport
}) => {
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-6">
      <TabsList className="bg-muted/40 grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="positions">Positions</TabsTrigger>
        <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <StaffingOverviewTab />
      </TabsContent>
      
      <TabsContent value="positions" className="space-y-6">
        <div className="flex justify-end mb-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('print')}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
        <PositionsTab />
      </TabsContent>
      
      <TabsContent value="cost-analysis" className="space-y-6">
        <CostAnalysisTab />
      </TabsContent>
    </Tabs>
  );
};
