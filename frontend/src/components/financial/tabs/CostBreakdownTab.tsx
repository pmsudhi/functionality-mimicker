
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import ChartTooltip from '@/components/ui/chart-tooltip';

const laborCostByDepartment = [
  { department: "FOH Management", cost: 28000, percentage: 15.9, color: "#8b5cf6" },
  { department: "FOH Service", cost: 63000, percentage: 33.5, color: "#3b82f6" },
  { department: "BOH Management", cost: 15000, percentage: 16.7, color: "#10b981" },
  { department: "BOH Kitchen", cost: 43500, percentage: 31.5, color: "#f59e0b" },
  { department: "BOH Support", cost: 16000, percentage: 4.0, color: "#ef4444" }
];

const CostBreakdownTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Cost Breakdown by Department</CardTitle>
        <CardDescription>Distribution of labor costs across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={laborCostByDepartment}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <XAxis 
                dataKey="department" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
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
              <Legend formatter={(value) => <span className="text-sm font-medium">{value}</span>} />
              <Bar 
                dataKey="cost" 
                name="Monthly Cost (SAR)" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                {laborCostByDepartment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Monthly Cost (SAR)</TableHead>
              <TableHead>% of Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laborCostByDepartment.map((dept) => (
              <TableRow key={dept.department}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                    {dept.department}
                  </div>
                </TableCell>
                <TableCell>{dept.cost.toLocaleString()}</TableCell>
                <TableCell>{dept.percentage}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell>
                {laborCostByDepartment
                  .reduce((sum, dept) => sum + dept.cost, 0)
                  .toLocaleString()}
              </TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownTab;
