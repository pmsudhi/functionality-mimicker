
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import ScenarioTable from '../saved/ScenarioTable';
import { mockScenarios } from '@/services/mockData';
import { ScenarioComparison } from '@/types/extraTypes';

const SavedScenariosTab = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [comparison, setComparison] = useState<ScenarioComparison | null>(null);

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Saved Scenarios</CardTitle>
        </div>
        <CardDescription>
          Select scenarios to compare or manage individual scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScenarioTable scenarios={mockScenarios} />
      </CardContent>
    </Card>
  );
};

export default SavedScenariosTab;
