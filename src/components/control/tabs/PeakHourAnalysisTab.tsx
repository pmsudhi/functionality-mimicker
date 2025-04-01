
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import PeakHourAnalysisContent from '../peak-hour-analysis/PeakHourAnalysisContent';

const PeakHourAnalysisTab = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Peak Hour Staffing Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-6">
          <PeakHourAnalysisContent />
        </div>
      </CardContent>
    </Card>
  );
};

export default PeakHourAnalysisTab;
