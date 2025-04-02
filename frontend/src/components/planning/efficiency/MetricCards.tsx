
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, TrendingUp, Users } from "lucide-react";

interface MetricCardsProps {
  scenario: any;
}

const MetricCards = ({ scenario }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Revenue per Labor Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {scenario?.calculations.revenuePerLaborHour.toFixed(2) || "--"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {scenario?.calculations.revenuePerLaborHour || 0 > 550 ? "Above" : "Below"} industry standard
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Covers per Labor Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {scenario?.calculations.coversPerLaborHour.toFixed(2) || "--"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {scenario?.calculations.coversPerLaborHour || 0 > 3.5 ? "Above" : "Below"} industry standard
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Staff Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {scenario?.efficiencyParameters.staffUtilizationRate
                ? (scenario.efficiencyParameters.staffUtilizationRate * 100).toFixed(0)
                : "--"}%
            </span>
          </div>
          <Progress 
            value={scenario?.efficiencyParameters.staffUtilizationRate
              ? (scenario.efficiencyParameters.staffUtilizationRate * 100)
              : 0} 
            className="h-2 mt-2" 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;
