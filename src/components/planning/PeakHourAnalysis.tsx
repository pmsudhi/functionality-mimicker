
import React from 'react';
import PeakHourAnalysisContent from '../control/peak-hour-analysis/PeakHourAnalysisContent';

const PeakHourAnalysis = () => {
  return (
    <div className="h-full p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Peak Hour Analysis</h2>
      <p className="text-muted-foreground mb-6">
        Analyze staffing requirements during peak hours to optimize operations and service levels.
      </p>
      <div>
        <PeakHourAnalysisContent />
      </div>
    </div>
  );
};

export default PeakHourAnalysis;
