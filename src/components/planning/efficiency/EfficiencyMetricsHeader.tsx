
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockScenarios, mockOutlets } from "@/services/mockData";

interface EfficiencyMetricsHeaderProps {
  selectedScenario: string;
  setSelectedScenario: (value: string) => void;
}

const EfficiencyMetricsHeader = ({ 
  selectedScenario, 
  setSelectedScenario 
}: EfficiencyMetricsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Efficiency Metrics</h2>
      <Select defaultValue={selectedScenario} onValueChange={setSelectedScenario}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a scenario" />
        </SelectTrigger>
        <SelectContent>
          {mockScenarios.map(scenario => {
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
