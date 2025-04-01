
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Parameter } from './types';
import ParameterSlider from './components/ParameterSlider';
import ParameterBlockHeader from './components/ParameterBlockHeader';
import AddParameterButton from './components/AddParameterButton';
import { getColorClasses } from './utils/colorUtils';

interface ParameterBlockProps {
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  number: number;
  title: string;
  parameters: Parameter[];
  onDelete: () => void;
}

const ParameterBlock = ({ color, number, title, parameters: initialParameters, onDelete }: ParameterBlockProps) => {
  const [parameters, setParameters] = useState<Parameter[]>(initialParameters);
  const colorClasses = getColorClasses(color);

  const handleParameterChange = (index: number, updatedParameter: Parameter) => {
    const updatedParameters = [...parameters];
    updatedParameters[index] = updatedParameter;
    setParameters(updatedParameters);
  };

  const handleAddParameter = () => {
    toast.info('Add parameter functionality coming soon', {
      position: 'bottom-right'
    });
  };

  const handleDeleteBlock = () => {
    toast.info(`Removed ${title} block`, {
      position: 'bottom-right'
    });
    onDelete();
  };

  return (
    <Card className={`border ${colorClasses.border} ${colorClasses.bg} shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <ParameterBlockHeader 
        title={title}
        number={number}
        parametersCount={parameters.length}
        colorClasses={colorClasses}
        onDelete={handleDeleteBlock}
      />
      <CardContent className="space-y-4">
        {parameters.map((param, index) => (
          <ParameterSlider
            key={index}
            parameter={param}
            onChange={(updatedParameter) => handleParameterChange(index, updatedParameter)}
          />
        ))}
        
        <AddParameterButton onClick={handleAddParameter} />
      </CardContent>
    </Card>
  );
};

export default ParameterBlock;
