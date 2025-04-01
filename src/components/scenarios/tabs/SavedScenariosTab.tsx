
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScenarioTable from "@/components/scenarios/saved/ScenarioTable";
import ComparisonCard from "@/components/scenarios/comparison/ComparisonCard";
import { ScenarioComparison } from "@/types/extraTypes";
import { Scenario } from "@/types/modelTypes";

interface SavedScenariosTabProps {
  filteredScenarios: Scenario[];
  comparison: ScenarioComparison | null;
}

const SavedScenariosTab = ({ filteredScenarios, comparison }: SavedScenariosTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Saved Scenarios</CardTitle>
          <p className="text-sm text-muted-foreground">Select scenarios to compare or manage individual scenarios</p>
        </CardHeader>
        <CardContent className="overflow-auto">
          <ScenarioTable scenarios={filteredScenarios} />
        </CardContent>
      </Card>
      
      {comparison && <ComparisonCard comparison={comparison} />}
    </>
  );
};

export default SavedScenariosTab;
