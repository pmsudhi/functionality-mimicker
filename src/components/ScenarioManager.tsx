
import { useState } from "react";
import { mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { compareScenarios } from "@/services/calculationService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScenarioFilters from "@/components/scenarios/filters/ScenarioFilters";
import SavedScenariosTab from "@/components/scenarios/tabs/SavedScenariosTab";
import WhatIfAnalysisTab from "@/components/scenarios/tabs/WhatIfAnalysisTab";
import { useBrandOutletFilter } from "@/hooks/useBrandOutletFilter";

const ScenarioManager = () => {
  const {
    selectedBrandId,
    selectedOutletId,
    availableBrands,
    availableOutlets,
    handleBrandChange,
    handleOutletChange
  } = useBrandOutletFilter();
  
  const [activeTab, setActiveTab] = useState("saved");
  const [baseScenario, setBaseScenario] = useState<string>(mockScenarios[0]?.id || "");
  
  // State for What-If analysis sliders
  const [staffingLevel, setStaffingLevel] = useState(100);
  const [averageWage, setAverageWage] = useState(100);
  const [operatingHours, setOperatingHours] = useState(100);
  const [serviceEfficiency, setServiceEfficiency] = useState(100);
  const [customerVolume, setCustomerVolume] = useState(100);
  const [averageCheck, setAverageCheck] = useState(100);
  
  // Filter scenarios based on selections
  const filteredScenarios = mockScenarios.filter(scenario => {
    const outlet = mockOutlets.find(o => o.id === scenario.outletId);
    if (!outlet) return false;
    
    if (selectedOutletId && outlet.id !== selectedOutletId) return false;
    if (selectedBrandId && outlet.brandId !== selectedBrandId) return false;
    
    return true;
  });
  
  // Calculate comparisons for each scenario against the best performing one
  const getComparisonData = () => {
    if (filteredScenarios.length <= 1) return null;
    
    // Find the scenario with the lowest labor percentage as the baseline
    const sortedByEfficiency = [...filteredScenarios].sort(
      (a, b) => a.calculations.laborPercentage - b.calculations.laborPercentage
    );
    
    const baselineScenario = sortedByEfficiency[0];
    const comparisonScenario = sortedByEfficiency[1];
    
    // Do a safe comparison that handles potentially undefined values
    try {
      return compareScenarios(baselineScenario, comparisonScenario);
    } catch (error) {
      console.error("Error comparing scenarios:", error);
      return null;
    }
  };
  
  const selectedBaseScenario = mockScenarios.find(s => s.id === baseScenario);
  const comparison = getComparisonData();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Scenarios</h1>
        <p className="text-muted-foreground">Create, compare, and manage staffing scenarios</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="saved" className="py-3">Saved Scenarios</TabsTrigger>
          <TabsTrigger value="what-if" className="py-3">What-If Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="mt-0">
          <ScenarioFilters
            selectedBrandId={selectedBrandId}
            selectedOutletId={selectedOutletId}
            availableBrands={availableBrands}
            availableOutlets={availableOutlets}
            handleBrandChange={handleBrandChange}
            handleOutletChange={handleOutletChange}
          />
          
          <SavedScenariosTab 
            filteredScenarios={filteredScenarios}
            comparison={comparison}
          />
        </TabsContent>
        
        <TabsContent value="what-if" className="mt-0">
          <WhatIfAnalysisTab
            baseScenario={baseScenario}
            setBaseScenario={setBaseScenario}
            staffingLevel={staffingLevel}
            setStaffingLevel={setStaffingLevel}
            averageWage={averageWage}
            setAverageWage={setAverageWage}
            operatingHours={operatingHours}
            setOperatingHours={setOperatingHours}
            serviceEfficiency={serviceEfficiency}
            setServiceEfficiency={setServiceEfficiency}
            customerVolume={customerVolume}
            setCustomerVolume={setCustomerVolume}
            averageCheck={averageCheck}
            setAverageCheck={setAverageCheck}
            selectedBaseScenario={selectedBaseScenario}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioManager;
