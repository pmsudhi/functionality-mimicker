
import React, { useState } from 'react';
import { PageLayout } from '@/components/ui/page-layout';
import { FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StaffingOverviewTab } from './tabs/StaffingOverviewTab';
import { PositionsTab } from './tabs/PositionsTab';
import { CostAnalysisTab } from './tabs/CostAnalysisTab';
import { StaffingMetricCards } from './components/StaffingMetricCards';

const StaffingStructure = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Staffing Structure</h1>
            <p className="text-muted-foreground">Detailed breakdown of staff positions and costs</p>
          </div>
          
          <div className="flex gap-3 self-start">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-brands">All Brands</SelectItem>
                <SelectItem value="white-robata">White Robata</SelectItem>
                <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
                <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Outlets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-outlets">All Outlets</SelectItem>
                <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
                <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
                <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <StaffingMetricCards />
        
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
      </div>
    </PageLayout>
  );
};

export default StaffingStructure;
