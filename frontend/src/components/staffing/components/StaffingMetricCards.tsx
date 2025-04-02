
import React from 'react';
import { Users, Building2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const StaffingMetricCards = () => {
  // Mock data - in a real app, this would come from props or a data fetching hook
  const staffData = {
    totalStaff: 175,
    fohCount: 101,
    bohCount: 74,
    fohBohRatio: 1.36,
    totalLaborCost: 9470000,
    avgCostPerEmployee: 54110
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staff
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffData.totalStaff}</div>
          <p className="text-xs text-muted-foreground">
            Across all outlets
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-500/10">
              <Building2 className="h-4 w-4 text-green-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              FOH/BOH Ratio
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{staffData.fohBohRatio}</div>
          <p className="text-xs text-muted-foreground">
            {staffData.fohCount} FOH / {staffData.bohCount} BOH
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-500/10">
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Labor Cost
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">SAR {(staffData.totalLaborCost / 1000).toLocaleString()},000</div>
          <p className="text-xs text-muted-foreground">
            Average SAR {staffData.avgCostPerEmployee.toLocaleString()} per employee
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
