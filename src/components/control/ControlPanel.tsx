
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/ui/page-layout';

const ControlPanel = () => {
  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Control Panel</h1>
          <p className="text-muted-foreground">System configuration and settings</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Control Panel functionality will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ControlPanel;
