
import { MetricCard } from "@/components/ui/metric-card";
import { Users, DollarSign, TrendingUp, Clock } from "lucide-react";

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Staff"
        value="247"
        icon={<Users className="h-5 w-5" />}
        trend={{ value: "+2.5% from last month", positive: true }}
        description="Across all outlets"
      />

      <MetricCard
        title="Labor Cost"
        value="24.3%"
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: "-0.8% from last month", positive: true }}
        description="% of Revenue"
      />

      <MetricCard
        title="Covers per Labor Hour"
        value="4.7"
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{ value: "+0.3 from last month", positive: true }}
        description="Efficiency metric"
      />

      <MetricCard
        title="Revenue per sqm"
        value="SAR 4,250"
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: "+5.2% from last month", positive: true }}
        description="Space efficiency"
      />
    </div>
  );
};
