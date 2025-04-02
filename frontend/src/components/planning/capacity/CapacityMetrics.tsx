
import { useState } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, BarChart3 } from "lucide-react";
import { DepartmentCapacity } from "./types";

interface CapacityMetricsProps {
  departments: DepartmentCapacity[];
}

const CapacityMetrics = ({ departments }: CapacityMetricsProps) => {
  const [attritionRate, setAttritionRate] = useState([8]);
  
  const totalCurrentHeadcount = departments.reduce((sum, dept) => sum + dept.currentHeadcount, 0);
  const totalNetChange = departments.reduce((sum, dept) => sum + dept.netChange, 0);
  
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Current Headcount"
        value={totalCurrentHeadcount}
        icon={<Users className="h-4 w-4" />}
      />
      
      <MetricCard
        title="Planned Growth"
        value={`+${totalNetChange}`}
        icon={<TrendingUp className="h-4 w-4" />}
        footer={
          <Badge variant="outline" className="mt-1">
            {((totalNetChange / totalCurrentHeadcount) * 100).toFixed(1)}% increase
          </Badge>
        }
      />
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
        <div className="p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Attrition Rate</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold">{attritionRate}%</div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <Slider
            value={attritionRate}
            onValueChange={setAttritionRate}
            max={20}
            step={0.5}
            className="slider-track"
          />
        </div>
      </div>
    </div>
  );
};

export default CapacityMetrics;
