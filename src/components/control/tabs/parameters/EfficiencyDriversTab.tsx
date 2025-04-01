import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpIcon } from '@/components/ui/help-icon';
import { CALCULATION_RULES } from '@/constants/calculationRules';

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
  
  const combinedEfficiency = Math.round(
    (staffUtilizationRate + technologyImpact + crossTrainingBenefits + (seasonalityFactor === 'moderate' ? 15 : seasonalityFactor === 'high' ? 25 : seasonalityFactor === 'extreme' ? 35 : 0)) / 4
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Efficiency Drivers</h3>
        <HelpIcon content={CALCULATION_RULES.efficiency.rules} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Staff Utilization Rate (%)</Label>
              <HelpIcon content="Percentage of time staff are productively engaged" />
            </div>
            <div className="flex justify-between">
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
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Technology Impact (%)</Label>
              <HelpIcon content="Labor reduction from POS, kitchen display systems, etc." />
            </div>
            <div className="flex justify-between">
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
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Cross-Training Benefits (%)</Label>
              <HelpIcon content="Labor savings from multi-skilled staff" />
            </div>
            <div className="flex justify-between">
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

      <div className="space-y-2">
        <Label>Combined Efficiency Factor</Label>
        <div className="text-2xl font-bold text-primary">
          {combinedEfficiency}%
        </div>
        <p className="text-xs text-muted-foreground">
          Average of all efficiency metrics
        </p>
      </div>
    </div>
  );
};

export default EfficiencyDriversTab;
