
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';

const EfficiencyMetrics = () => {
  return (
    <SectionContainer 
      title="Efficiency Metrics"
      icon={BarChart}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <CardTitle>Labor Efficiency by Department</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Labor efficiency chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <CardTitle>Efficiency Trends</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Efficiency trends chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Staff Utilization</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Staff utilization chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <CardTitle>Position Efficiency Comparison</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Position efficiency chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
};

export default EfficiencyMetrics;
