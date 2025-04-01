
import React from 'react';
import PeakHourAnalysisContent from '../control/peak-hour-analysis/PeakHourAnalysisContent';

const PeakHourAnalysis = () => {
  return (
    <div className="h-full p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Peak Hour Analysis</h2>
      <p className="text-muted-foreground">
        This is a placeholder for the Peak Hour Analysis component in the planning section.
      </p>
      <div className="mt-6">
        <PeakHourAnalysisContent />
      </div>
    </div>
  );
};

export default PeakHourAnalysis;
