
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScenarioTable from "@/components/scenarios/saved/ScenarioTable";
import ComparisonCard from "@/components/scenarios/comparison/ComparisonCard";
import { ScenarioComparison } from "@/types/extraTypes";
import { Scenario } from "@/types/modelTypes";
import { Save } from "lucide-react";

interface SavedScenariosTabProps {
  filteredScenarios: Scenario[];
  comparison: ScenarioComparison | null;
}

const SavedScenariosTab = ({ filteredScenarios, comparison }: SavedScenariosTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Save className="h-5 w-5 text-primary" />
            <CardTitle>Saved Scenarios</CardTitle>
          </div>
          <CardDescription>
            Select scenarios to compare or manage individual scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <ScenarioTable scenarios={filteredScenarios} />
        </CardContent>
      </Card>
      
      {comparison && <ComparisonCard comparison={comparison} />}
    </div>
  );
};

export default SavedScenariosTab;
