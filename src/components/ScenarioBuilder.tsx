
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";

const ScenarioBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Scenario Builder</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Scenario
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Base Scenario</CardTitle>
            <CardDescription>Current operational model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Created:</span>
                <span>May 5, 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Employees:</span>
                <span>386</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Departments:</span>
                <span>12</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expansion Plan</CardTitle>
            <CardDescription>Market growth forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Created:</span>
                <span>June 12, 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Employees:</span>
                <span>452</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Departments:</span>
                <span>14</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
