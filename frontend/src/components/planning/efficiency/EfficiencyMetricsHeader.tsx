
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockScenarios, mockOutlets } from "@/services/mockData";
import { useBrandOutlet } from "@/context/BrandOutletContext";

interface EfficiencyMetricsHeaderProps {
  selectedScenario: string;
  setSelectedScenario: (value: string) => void;
}

const EfficiencyMetricsHeader = ({ 
  selectedScenario, 
  setSelectedScenario 
}: EfficiencyMetricsHeaderProps) => {
  const { selectedBrandId, selectedOutletId } = useBrandOutlet();
  
  // Filter scenarios based on the selected brand and outlet
  const filteredScenarios = mockScenarios.filter(scenario => 
    (!selectedBrandId || scenario.outletId === selectedOutletId)
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Efficiency Metrics</h2>
      <Select defaultValue={selectedScenario} onValueChange={setSelectedScenario}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a scenario" />
        </SelectTrigger>
        <SelectContent>
          {filteredScenarios.map(scenario => {
            const outlet = mockOutlets.find(o => o.id === scenario.outletId);
            return (
              <SelectItem key={scenario.id} value={scenario.id}>
                {scenario.name} ({outlet?.name})
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EfficiencyMetricsHeader;
