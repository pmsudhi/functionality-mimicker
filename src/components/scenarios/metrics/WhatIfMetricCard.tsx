
import { Card, CardContent } from "@/components/ui/card";

interface WhatIfMetricCardProps {
  title: string;
  value: string;
  change?: string;
  isGreen?: boolean;
}

const WhatIfMetricCard = ({ title, value, change, isGreen = true }: WhatIfMetricCardProps) => (
  <Card className="bg-background">
    <CardContent className="pt-6 p-4">
      <div className="text-sm mb-2">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {change && <div className={`text-xs ${isGreen ? "text-green-500" : "text-red-500"}`}>{change}</div>}
    </CardContent>
  </Card>
);

export default WhatIfMetricCard;
