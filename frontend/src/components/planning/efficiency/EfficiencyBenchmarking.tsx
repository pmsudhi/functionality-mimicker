
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EfficiencyBenchmarkingProps {
  scenario: any;
}

const EfficiencyBenchmarking = ({ scenario }: EfficiencyBenchmarkingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Efficiency Benchmarking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md mb-4">
          <p className="text-muted-foreground">Efficiency benchmarking chart</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Industry Benchmarks</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Revenue per Labor Hour</span>
                <span className="font-medium">550</span>
              </div>
              <div className="flex justify-between">
                <span>Covers per Labor Hour</span>
                <span className="font-medium">3.5</span>
              </div>
              <div className="flex justify-between">
                <span>Staff Utilization Rate</span>
                <span className="font-medium">82%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Your Metrics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Revenue per Labor Hour</span>
                <span className="font-medium">{scenario?.calculations.revenuePerLaborHour.toFixed(2) || "--"}</span>
              </div>
              <div className="flex justify-between">
                <span>Covers per Labor Hour</span>
                <span className="font-medium">{scenario?.calculations.coversPerLaborHour.toFixed(2) || "--"}</span>
              </div>
              <div className="flex justify-between">
                <span>Staff Utilization Rate</span>
                <span className="font-medium">
                  {scenario?.efficiencyParameters.staffUtilizationRate
                    ? (scenario.efficiencyParameters.staffUtilizationRate * 100).toFixed(0)
                    : "--"}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Improvement Potential</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Revenue per Labor Hour</span>
                <span className={`font-medium ${(scenario?.calculations.revenuePerLaborHour || 0) < 550 ? "text-red-500" : "text-green-500"}`}>
                  {(scenario?.calculations.revenuePerLaborHour || 0) < 550
                    ? `+${(550 - (scenario?.calculations.revenuePerLaborHour || 0)).toFixed(2)}`
                    : "On Target"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Covers per Labor Hour</span>
                <span className={`font-medium ${(scenario?.calculations.coversPerLaborHour || 0) < 3.5 ? "text-red-500" : "text-green-500"}`}>
                  {(scenario?.calculations.coversPerLaborHour || 0) < 3.5
                    ? `+${(3.5 - (scenario?.calculations.coversPerLaborHour || 0)).toFixed(2)}`
                    : "On Target"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Staff Utilization Rate</span>
                <span className={`font-medium ${(scenario?.efficiencyParameters.staffUtilizationRate || 0) < 0.82 ? "text-red-500" : "text-green-500"}`}>
                  {(scenario?.efficiencyParameters.staffUtilizationRate || 0) < 0.82
                    ? `+${((0.82 - (scenario?.efficiencyParameters.staffUtilizationRate || 0)) * 100).toFixed(0)}%`
                    : "On Target"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EfficiencyBenchmarking;
