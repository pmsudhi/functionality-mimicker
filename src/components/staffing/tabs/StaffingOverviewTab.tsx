
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck } from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import ChartTooltip from '@/components/ui/chart-tooltip';

export const StaffingOverviewTab = () => {
  // Mock data - in a real app, this would come from props or a data fetching hook
  const staffDistributionData = [
    { name: "FOH Management", value: 16.0, color: "#8b5cf6", count: 28 },
    { name: "FOH Service", value: 36.0, color: "#3b82f6", count: 63 },
    { name: "BOH Management", value: 8.6, color: "#10b981", count: 15 },
    { name: "BOH Kitchen", value: 24.6, color: "#f59e0b", count: 43 },
    { name: "BOH Support", value: 9.1, color: "#ef4444", count: 16 }
  ];

  const totalStaff = 175;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg">Staff Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Breakdown by department</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%">
              <PieChart>
                <Pie
                  data={staffDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={55}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                  paddingAngle={2}
                >
                  {staffDistributionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="transparent"
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<ChartTooltip 
                    labelFormatter={() => "Staff Distribution"} 
                    valueFormatter={(value) => `${value}%`}
                  />} 
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                  iconType="circle"
                  iconSize={10}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <Badge variant="outline" className="mb-4 font-medium bg-primary/5">
              <BadgeCheck className="h-3.5 w-3.5 mr-1 text-primary" />
              Department Summary
            </Badge>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Staff Count</TableHead>
                  <TableHead>% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffDistributionData.map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                        {dept.name}
                      </div>
                    </TableCell>
                    <TableCell>{dept.count}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-medium">{dept.value}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell>{totalStaff}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="font-medium">100%</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
