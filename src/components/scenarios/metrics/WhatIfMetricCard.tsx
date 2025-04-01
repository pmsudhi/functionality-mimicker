
import { Card, CardContent } from "@/components/ui/card";

interface WhatIfMetricCardProps {
  title: string;
  value: string;
  change: string;
}

const WhatIfMetricCard = ({ title, value, change }: WhatIfMetricCardProps) => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

export default WhatIfMetricCard;
