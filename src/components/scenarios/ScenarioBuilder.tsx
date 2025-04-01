
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScenarioBuilder = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scenario Builder</h1>
        <p className="text-muted-foreground">Create and test staffing scenarios</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Scenario Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the Scenario Builder component.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioBuilder;
