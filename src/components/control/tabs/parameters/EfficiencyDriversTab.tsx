
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EfficiencyDriversTab = () => {
  const [staffUtilizationRate, setStaffUtilizationRate] = useState(85);
  const [technologyImpact, setTechnologyImpact] = useState(10);
  const [crossTrainingBenefits, setCrossTrainingBenefits] = useState(15);
  const [seasonalityFactor, setSeasonalityFactor] = useState('moderate');
  
  // Calculated values
  const effectiveStaffUtilization = staffUtilizationRate / 100;
  const technologyLaborSavings = technologyImpact / 100;
  const crossTrainingLaborSavings = crossTrainingBenefits / 100;
  const totalEfficiencyFactor = 0.75; // Simplified calculation
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Staff Utilization Rate (%)</Label>
            <Input 
              value={staffUtilizationRate}
              onChange={e => setStaffUtilizationRate(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[staffUtilizationRate]} 
            min={50} 
            max={100} 
            step={5}
            onValueChange={(value) => setStaffUtilizationRate(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Percentage of time staff are productively engaged
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Technology Impact (%)</Label>
            <Input 
              value={technologyImpact}
              onChange={e => setTechnologyImpact(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[technologyImpact]} 
            min={0} 
            max={30} 
            step={1}
            onValueChange={(value) => setTechnologyImpact(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Labor reduction from POS, kitchen display systems, etc.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Cross-Training Benefits (%)</Label>
            <Input 
              value={crossTrainingBenefits}
              onChange={e => setCrossTrainingBenefits(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[crossTrainingBenefits]} 
            min={0} 
            max={30} 
            step={1}
            onValueChange={(value) => setCrossTrainingBenefits(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Labor savings from multi-skilled staff
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Seasonality Factor</Label>
          <Select 
            value={seasonalityFactor} 
            onValueChange={setSeasonalityFactor}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select seasonality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (5% variation)</SelectItem>
              <SelectItem value="moderate">Moderate (15% variation)</SelectItem>
              <SelectItem value="high">High (25% variation)</SelectItem>
              <SelectItem value="extreme">Extreme (35% variation)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Effective Staff Utilization</Label>
          <Input
            value={effectiveStaffUtilization.toFixed(2)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            {staffUtilizationRate}% expressed as a decimal
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Technology Labor Savings</Label>
          <Input
            value={technologyLaborSavings.toFixed(2)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            {technologyImpact}% expressed as a decimal
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Cross-Training Labor Savings</Label>
          <Input
            value={crossTrainingLaborSavings.toFixed(2)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            {crossTrainingBenefits}% expressed as a decimal
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Total Efficiency Factor</Label>
          <Input
            value={totalEfficiencyFactor.toFixed(2)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Combined impact of all efficiency drivers
          </p>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyDriversTab;
