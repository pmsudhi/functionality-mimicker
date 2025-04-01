
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { staffDistribution, staffBreakdown } from "./ChartData";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Tooltip, 
  Legend, 
  Cell 
} from "recharts";
import { 
  BadgeCheck, 
  Users, 
  ChefHat, 
  Coffee 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const StaffingTab = () => {
  const totalFOH = staffBreakdown.foh.reduce((sum, staff) => sum + staff.count, 0);
  const totalBOH = staffBreakdown.boh.reduce((sum, staff) => sum + staff.count, 0);
  const totalStaff = totalFOH + totalBOH;

  // Custom tooltip formatter for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm p-2 border rounded-lg shadow-md">
          <p className="font-medium text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border border-border/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300">
      <CardHeader className="pb-2 border-b border-border/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold tracking-tight">Staff Distribution</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Breakdown of staff across departments</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[320px] flex flex-col">
            <Badge variant="outline" className="self-start mb-2 font-medium bg-primary/5">
              <BadgeCheck className="h-3.5 w-3.5 mr-1 text-primary" />
              Department Overview
            </Badge>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={staffDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    paddingAngle={2}
                  >
                    {staffDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="transparent"
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
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
          </div>
          
          <div className="flex flex-col">
            <Badge variant="outline" className="self-start mb-4 font-medium bg-primary/5">
              <BadgeCheck className="h-3.5 w-3.5 mr-1 text-primary" />
              Position Details
            </Badge>
            
            <h3 className="text-lg font-semibold mb-4 tracking-tight">Staff Breakdown by Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-md bg-blue-500/10">
                    <Coffee className="h-4 w-4 text-blue-500" />
                  </div>
                  <h4 className="font-semibold text-base">Front of House</h4>
                </div>
                <div className="space-y-2.5">
                  {staffBreakdown.foh.map((position) => (
                    <div key={position.position} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{position.position}</span>
                      <span className="font-medium text-sm bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-md">{position.count}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t border-border/40 pt-2 mt-3">
                    <span className="text-sm">Total FOH</span>
                    <span className="bg-blue-500/20 text-blue-700 px-2.5 py-0.5 rounded-md">{totalFOH}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-md bg-green-500/10">
                    <ChefHat className="h-4 w-4 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-base">Back of House</h4>
                </div>
                <div className="space-y-2.5">
                  {staffBreakdown.boh.map((position) => (
                    <div key={position.position} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{position.position}</span>
                      <span className="font-medium text-sm bg-green-500/10 text-green-600 px-2 py-0.5 rounded-md">{position.count}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t border-border/40 pt-2 mt-3">
                    <span className="text-sm">Total BOH</span>
                    <span className="bg-green-500/20 text-green-700 px-2.5 py-0.5 rounded-md">{totalBOH}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center p-3 bg-muted/30 rounded-lg border border-border/30">
              <span className="font-medium">Total Staff</span>
              <span className="font-bold text-lg">{totalStaff}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
