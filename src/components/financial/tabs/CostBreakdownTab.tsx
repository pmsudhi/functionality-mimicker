
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
} from "recharts";

const laborCostByDepartment = [
  { department: "FOH Management", cost: 28000, percentage: 15.9 },
  { department: "FOH Service", cost: 63000, percentage: 33.5 },
  { department: "BOH Management", cost: 15000, percentage: 16.7 },
  { department: "BOH Kitchen", cost: 43500, percentage: 31.5 },
  { department: "BOH Support", cost: 16000, percentage: 4.0 },
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
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="cost" 
                name="Monthly Cost (SAR)" 
                fill="#3b82f6"
                stroke="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Monthly Cost (SAR)</TableHead>
              <TableHead>% of Total Labor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laborCostByDepartment.map((dept) => (
              <TableRow key={dept.department}>
                <TableCell>{dept.department}</TableCell>
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
