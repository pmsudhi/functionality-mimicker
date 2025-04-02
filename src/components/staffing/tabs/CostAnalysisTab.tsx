
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgePercent } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LabelList,
  Tooltip,
  Cell
} from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import ChartTooltip from '@/components/ui/chart-tooltip';

export const CostAnalysisTab = () => {
  // Mock data - in a real app, this would come from props or a data fetching hook
  const costAnalysisData = [
    { department: "FOH Management", cost: 1500000, percentage: 14.3 },
    { department: "FOH Service", cost: 3500000, percentage: 33.5 },
    { department: "BOH Management", cost: 1750000, percentage: 16.7 },
    { department: "BOH Kitchen", cost: 3290000, percentage: 31.5 },
    { department: "BOH Support", cost: 420000, percentage: 4.0 }
  ];
  
  const totalCost = costAnalysisData.reduce((sum, dept) => sum + dept.cost, 0);

  // Define consistent colors for each department
  const departmentColors = {
    "FOH Management": "#8b5cf6", // purple
    "FOH Service": "#3b82f6",    // blue
    "BOH Management": "#10b981", // green
    "BOH Kitchen": "#f59e0b",    // amber
    "BOH Support": "#ef4444"     // red
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg">Labor Cost Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Cost breakdown by department</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Monthly Cost by Department</h3>
            <p className="text-sm text-muted-foreground">Breakdown of monthly labor costs across different departments</p>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costAnalysisData}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                barSize={80}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e5e7eb" 
                  opacity={0.4} 
                />
                <XAxis 
                  dataKey="department" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${(value / 1000).toLocaleString()}k`}
                  domain={[0, 3600000]}
                  ticks={[0, 900000, 1800000, 2700000, 3600000]}
                  tickCount={5}
                  label={{ 
                    value: '', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 }
                  }}
                />
                <Tooltip 
                  content={<ChartTooltip 
                    labelFormatter={(label) => `${label}`} 
                    valueFormatter={(value) => {
                      if (typeof value === 'number') {
                        return value.toLocaleString('en-US', { 
                          style: 'currency', 
                          currency: 'SAR', 
                          maximumFractionDigits: 0 
                        });
                      }
                      return String(value);
                    }}
                  />}
                />
                <Bar 
                  dataKey="cost" 
                  name="Monthly Cost" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                >
                  {costAnalysisData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={departmentColors[entry.department as keyof typeof departmentColors] || "#3b82f6"} 
                    />
                  ))}
                  <LabelList 
                    dataKey="percentage" 
                    position="top"
                    content={(props: any) => {
                      const { x, y, width, value } = props;
                      return (
                        <g>
                          <text
                            x={x + width / 2}
                            y={y - 15}
                            fill="#6b7280"
                            textAnchor="middle"
                            fontWeight="500"
                            fontSize={13}
                          >
                            {`${value}%`}
                          </text>
                        </g>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <Badge variant="outline" className="mb-4 font-medium bg-primary/5">
            <BadgePercent className="h-3.5 w-3.5 mr-1 text-primary" />
            Cost Summary
          </Badge>
          
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costAnalysisData.map((dept) => (
                  <TableRow key={dept.department}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: departmentColors[dept.department as keyof typeof departmentColors] || "#3b82f6" }}
                        ></div>
                        {dept.department}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{dept.cost.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{dept.percentage}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/20">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{totalCost.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge>100%</Badge>
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
