
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatComparison } from "@/components/ui/stat-comparison";
import { ScenarioComparison } from "@/types/extraTypes";

interface ComparisonCardProps {
  comparison: ScenarioComparison;
}

const ComparisonCard = ({ comparison }: ComparisonCardProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Scenario Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Baseline: {comparison.scenario1.name}</h3>
            <div className="space-y-2 text-sm">
              <StatComparison 
                label="Staff Count"
                value1={Math.ceil(comparison.scenario1.totalStaff)}
                value2=""
              />
              <StatComparison 
                label="Labor Cost"
                value1={comparison.scenario1.laborCost.toLocaleString()}
                value2=""
              />
              <StatComparison 
                label="Labor %"
                value1={`${comparison.scenario1.laborPercentage.toFixed(1)}%`}
                value2=""
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Comparison: {comparison.scenario2.name}</h3>
            <div className="space-y-2 text-sm">
              <StatComparison 
                label="Staff Count"
                value1={Math.ceil(comparison.scenario2.totalStaff)}
                value2=""
              />
              <StatComparison 
                label="Labor Cost"
                value1={comparison.scenario2.laborCost.toLocaleString()}
                value2=""
              />
              <StatComparison 
                label="Labor %"
                value1={`${comparison.scenario2.laborPercentage.toFixed(1)}%`}
                value2=""
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Difference</h3>
            <div className="space-y-2 text-sm">
              <StatComparison 
                label="Staff Count"
                value1=""
                value2=""
                difference={comparison.staffDiff}
                positiveIsBetter={false}
              />
              <StatComparison 
                label="Labor Cost"
                value1=""
                value2=""
                difference={comparison.costDiff}
                positiveIsBetter={false}
              />
              <StatComparison 
                label="Labor %"
                value1=""
                value2=""
                difference={comparison.laborPercentageDiff}
                positiveIsBetter={false}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Key Observations</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {comparison.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonCard;
