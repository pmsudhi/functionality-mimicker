
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Coffee, ChefHat } from 'lucide-react';

export const PositionsTab = () => {
  // Mock data - in a real app, this would come from props or a data fetching hook
  const fohPositions = [
    { position: "Restaurant Manager", count: 5, salary: 12000, cost: 60000 },
    { position: "Assistant Manager", count: 10, salary: 9000, cost: 90000 },
    { position: "Host/Hostess", count: 12, salary: 4500, cost: 54000 },
    { position: "Waiter/Waitress", count: 42, salary: 4000, cost: 168000 },
    { position: "Runner", count: 15, salary: 3500, cost: 52500 },
    { position: "Bartender", count: 8, salary: 5000, cost: 40000 },
    { position: "Cashier", count: 9, salary: 4000, cost: 36000 }
  ];
  
  const bohPositions = [
    { position: "Executive Chef", count: 5, salary: 15000, cost: 75000 },
    { position: "Sous Chef", count: 10, salary: 10000, cost: 100000 },
    { position: "Line Cook", count: 20, salary: 6000, cost: 120000 },
    { position: "Prep Cook", count: 15, salary: 4500, cost: 67500 },
    { position: "Kitchen Helper", count: 12, salary: 3500, cost: 42000 },
    { position: "Dishwasher", count: 12, salary: 3500, cost: 42000 }
  ];
  
  const totalFOH = fohPositions.reduce((sum, position) => sum + position.count, 0);
  const totalBOH = bohPositions.reduce((sum, position) => sum + position.count, 0);
  const totalFOHCost = fohPositions.reduce((sum, position) => sum + position.cost, 0);
  const totalBOHCost = bohPositions.reduce((sum, position) => sum + position.cost, 0);
  const avgFOHSalary = Math.round(totalFOHCost / totalFOH);
  const avgBOHSalary = Math.round(totalBOHCost / totalBOH);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg">Position Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">Detailed staff positions and costs</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-md bg-blue-500/10">
                <Coffee className="h-4 w-4 text-blue-500" />
              </div>
              <h3 className="font-semibold">Front of House (FOH)</h3>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                    <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fohPositions.map((position) => (
                    <TableRow key={position.position}>
                      <TableCell className="font-medium">{position.position}</TableCell>
                      <TableCell className="text-right">{position.count}</TableCell>
                      <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">Total FOH</TableCell>
                    <TableCell className="text-right font-bold">{totalFOH}</TableCell>
                    <TableCell className="text-right font-bold">{avgFOHSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">{totalFOHCost.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-md bg-green-500/10">
                <ChefHat className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="font-semibold">Back of House (BOH)</h3>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                    <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bohPositions.map((position) => (
                    <TableRow key={position.position}>
                      <TableCell className="font-medium">{position.position}</TableCell>
                      <TableCell className="text-right">{position.count}</TableCell>
                      <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">Total BOH</TableCell>
                    <TableCell className="text-right font-bold">{totalBOH}</TableCell>
                    <TableCell className="text-right font-bold">{avgBOHSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">{totalBOHCost.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-lg border">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">Total Staff</span>
                <p className="text-lg font-bold">{totalFOH + totalBOH}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Total Monthly Cost</span>
                <p className="text-lg font-bold">SAR {(totalFOHCost + totalBOHCost).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Average Cost per Employee</span>
                <p className="text-lg font-bold">SAR {Math.round((totalFOHCost + totalBOHCost) / (totalFOH + totalBOH)).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
