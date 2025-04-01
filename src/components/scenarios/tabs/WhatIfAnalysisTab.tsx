
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

// We'll create a simplified version for now and update it later
const WhatIfAnalysisTab = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>What-If Analysis</CardTitle>
        </div>
        <CardDescription>
          Adjust parameters to see how changes would impact your staffing and financial metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p>Control panel for adjusting parameters will be displayed here</p>
          </div>
          <div>
            <p>Results panel showing impact of changes will be displayed here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatIfAnalysisTab;
