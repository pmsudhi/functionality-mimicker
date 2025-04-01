
import React from 'react';
import ParameterBlock from './ParameterBlock';

const ParameterBlocksList = () => {
  // Space Configuration parameters
  const spaceParameters = [
    {
      label: 'Total Area (sqm)',
      value: 350,
      min: 100,
      max: 1000,
      step: 10
    },
    {
      label: 'FOH Percentage',
      value: 70,
      min: 40,
      max: 80,
      step: 5,
      unit: '%'
    },
    {
      label: 'Seating Capacity',
      value: 120,
      min: 50,
      max: 200,
      step: 10,
      disabled: true
    }
  ];

  // Service Parameters
  const serviceParameters = [
    {
      label: 'Covers per Waiter',
      value: 16,
      min: 12,
      max: 24,
      step: 4
    },
    {
      label: 'Runner Ratio',
      value: 2,
      min: 1,
      max: 4,
      step: 1
    },
    {
      label: 'Service Style',
      value: 0,
      min: 0,
      max: 0,
      step: 0
    }
  ];

  // Operational Hours parameters
  const operationalParameters = [
    {
      label: 'Operating Days per Week',
      value: 7,
      min: 5,
      max: 7,
      step: 1
    },
    {
      label: 'Daily Operating Hours',
      value: 12,
      min: 6,
      max: 24,
      step: 1
    },
    {
      label: 'Peak Hour Factor',
      value: 1.5,
      min: 1.0,
      max: 2.0,
      step: 0.1
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      <ParameterBlock 
        color="blue" 
        number={1} 
        title="Space Configuration" 
        parameters={spaceParameters} 
      />
      
      <ParameterBlock 
        color="green" 
        number={2} 
        title="Service Parameters" 
        parameters={serviceParameters} 
      />
      
      <ParameterBlock 
        color="yellow" 
        number={3} 
        title="Operational Hours" 
        parameters={operationalParameters} 
      />
    </div>
  );
};

export default ParameterBlocksList;
