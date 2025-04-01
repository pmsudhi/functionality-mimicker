
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScenarioTable from "@/components/scenarios/saved/ScenarioTable";
import ComparisonCard from "@/components/scenarios/comparison/ComparisonCard";
import { Save } from "lucide-react";

// We'll create a simplified version for now and update it later
const SavedScenariosTab = () => {
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
          <p>Scenario table content will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedScenariosTab;
