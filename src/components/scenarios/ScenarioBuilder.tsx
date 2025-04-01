
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScenarioBuilderTab from '../control/tabs/ScenarioBuilderTab';

const ScenarioBuilder = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scenario Builder</h1>
        <p className="text-muted-foreground">Create and test staffing scenarios</p>
      </div>
      
      <ScenarioBuilderTab />
    </div>
  );
};

export default ScenarioBuilder;
