
import { useState, useMemo } from "react";
import { mockScenarios, mockOutlets, mockBrands } from "@/services/mockData";
import { ExtendedScenario } from "@/types/extraTypes";

interface ScenarioSelectionOptions {
  defaultScenarioId?: string;
  outletId?: string | null;
  brandId?: string | null;
}

interface ScenarioSelectionResult {
  selectedScenarioId: string;
  setSelectedScenarioId: (id: string) => void;
  selectedScenario: ExtendedScenario | undefined;
  availableScenarios: ExtendedScenario[];
  scenarioOutlet: typeof mockOutlets[0] | undefined;
  scenarioBrand: typeof mockBrands[0] | undefined;
}

export function useScenarioSelection({
  defaultScenarioId,
  outletId = null,
  brandId = null,
}: ScenarioSelectionOptions = {}): ScenarioSelectionResult {
  // Initialize with default or first available scenario
  const initialId = defaultScenarioId || 
    (mockScenarios.length > 0 ? mockScenarios[0].id : "");

  const [selectedScenarioId, setSelectedScenarioId] = useState(initialId);

  // Filter scenarios based on outlet and brand if provided
  const availableScenarios = useMemo(() => {
    return mockScenarios.filter(scenario => {
      const scenarioOutlet = mockOutlets.find(o => o.id === scenario.outletId);
      
      if (!scenarioOutlet) return false;
      
      if (outletId && scenarioOutlet.id !== outletId) return false;
      if (brandId && scenarioOutlet.brandId !== brandId) return false;
      
      return true;
    });
  }, [outletId, brandId]);

  // Get the selected scenario
  const selectedScenario = useMemo(() => {
    return mockScenarios.find(s => s.id === selectedScenarioId);
  }, [selectedScenarioId]);

  // Get outlet and brand for the selected scenario
  const scenarioOutlet = useMemo(() => {
    if (!selectedScenario) return undefined;
    return mockOutlets.find(o => o.id === selectedScenario.outletId);
  }, [selectedScenario]);

  const scenarioBrand = useMemo(() => {
    if (!scenarioOutlet) return undefined;
    return mockBrands.find(b => b.id === scenarioOutlet.brandId);
  }, [scenarioOutlet]);

  return {
    selectedScenarioId,
    setSelectedScenarioId,
    selectedScenario,
    availableScenarios,
    scenarioOutlet,
    scenarioBrand,
  };
}
