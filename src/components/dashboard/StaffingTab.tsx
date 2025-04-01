
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { staffDistribution, staffBreakdown } from "./ChartData";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

export const StaffingTab = () => {
  const totalFOH = staffBreakdown.foh.reduce((sum, staff) => sum + staff.count, 0);
  const totalBOH = staffBreakdown.boh.reduce((sum, staff) => sum + staff.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Distribution by Department</CardTitle>
        <CardDescription>Breakdown of staff across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={staffDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {staffDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Staff Breakdown by Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-2">Front of House (FOH)</h4>
                <div className="space-y-2">
                  {staffBreakdown.foh.map((position) => (
                    <div key={position.position} className="flex justify-between">
                      <span>{position.position}</span>
                      <span className="font-medium">{position.count}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total FOH</span>
                    <span>{totalFOH}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Back of House (BOH)</h4>
                <div className="space-y-2">
                  {staffBreakdown.boh.map((position) => (
                    <div key={position.position} className="flex justify-between">
                      <span>{position.position}</span>
                      <span className="font-medium">{position.count}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total BOH</span>
                    <span>{totalBOH}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
