
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Plus, FileText } from "lucide-react";

// Mock data for scenarios
const mockScenarios = [
  { id: 1, name: "Summer 2023 Baseline", date: "2023-06-15", staffCount: 45, laborCost: "28.5%" },
  { id: 2, name: "Winter Holiday Rush", date: "2023-11-01", staffCount: 52, laborCost: "32.1%" },
  { id: 3, name: "Reduced Operations", date: "2023-08-10", staffCount: 38, laborCost: "24.2%" },
];

const SavedScenariosTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-primary" />
              <CardTitle>Saved Scenarios</CardTitle>
            </div>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              New Scenario
            </Button>
          </div>
          <CardDescription>
            Select scenarios to compare or manage individual scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Created</th>
                  <th className="text-left p-3 font-medium">Staff</th>
                  <th className="text-left p-3 font-medium">Labor %</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockScenarios.map((scenario) => (
                  <tr key={scenario.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {scenario.name}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{scenario.date}</td>
                    <td className="p-3">{scenario.staffCount}</td>
                    <td className="p-3">{scenario.laborCost}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedScenariosTab;
