
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatSAR } from "./utils";

interface MetricCardsProps {
  totalBaseline: number;
  laborPercentage: number;
  seatingCapacity: number;
}

const MetricCards = ({ totalBaseline, laborPercentage, seatingCapacity }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Annual Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatSAR(totalBaseline)}</div>
          <p className="text-xs text-muted-foreground">
            Based on 12-month projection
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Annual Labor Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatSAR(totalBaseline * (laborPercentage / 100))}</div>
          <p className="text-xs text-muted-foreground">
            Total staff cost for 12 months
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Labor % of Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{laborPercentage}%</div>
          <p className="text-xs text-muted-foreground">
            Industry benchmark: 25-30%
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Cost per Seat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">SAR {Math.round((totalBaseline * (laborPercentage / 100) / 12) / seatingCapacity).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Based on {seatingCapacity} seats
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;
