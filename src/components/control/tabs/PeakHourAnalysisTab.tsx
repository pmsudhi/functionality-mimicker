
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import PeakHourDescription from '../peak-hour-analysis/PeakHourDescription';
import PeakHourAnalysisContent from '../peak-hour-analysis/PeakHourAnalysisContent';

const PeakHourAnalysisTab = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Peak Hour Analysis</CardTitle>
        <CardDescription>
          Analyze staffing requirements during peak hours of operation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PeakHourDescription />
        <PeakHourAnalysisContent />
      </CardContent>
    </Card>
  );
};

export default PeakHourAnalysisTab;
