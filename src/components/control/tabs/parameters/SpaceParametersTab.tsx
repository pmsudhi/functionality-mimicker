import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpIcon } from '@/components/ui/help-icon';
import { CALCULATION_RULES } from '@/constants/calculationRules';

const SpaceParametersTab = () => {
  const [totalArea, setTotalArea] = useState(300);
  const [fohPercentage, setFohPercentage] = useState(65);
  const [areaPerCover, setAreaPerCover] = useState(1.86);
  const [externalSeating, setExternalSeating] = useState(20);
  
  // Calculated values
  const fohArea = totalArea * (fohPercentage / 100);
  const internalCapacity = Math.floor(fohArea / areaPerCover);
  const totalCapacity = internalCapacity + externalSeating;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Space Parameters</h3>
        <HelpIcon content={CALCULATION_RULES.space.rules} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Total Restaurant Area (sqm)</Label>
            <HelpIcon content="Total floor area of the restaurant including all spaces." />
          </div>
          <Input
            type="number"
            value={totalArea}
            onChange={(e) => setTotalArea(Number(e.target.value))}
            min={100}
            max={1000}
            step={10}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>FOH Percentage</Label>
            <HelpIcon content="Percentage of total area allocated to Front of House (dining area)." />
          </div>
          <Slider
            value={[fohPercentage]}
            onValueChange={(value) => setFohPercentage(value[0])}
            min={50}
            max={80}
            step={5}
          />
          <div className="text-sm text-muted-foreground">
            {fohPercentage}% of total area
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Area per Cover (sqm)</Label>
            <HelpIcon content="Space required per seat based on service style and comfort requirements." />
          </div>
          <Select value={areaPerCover.toString()} onValueChange={(value) => setAreaPerCover(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select area per cover" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5 sqm (Fast Casual)</SelectItem>
              <SelectItem value="1.67">1.67 sqm (Fast Casual)</SelectItem>
              <SelectItem value="1.86">1.86 sqm (Casual Dining)</SelectItem>
              <SelectItem value="2.05">2.05 sqm (Premium Dining)</SelectItem>
              <SelectItem value="2.32">2.32 sqm (Premium Dining)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>External Seating Capacity</Label>
            <HelpIcon content="Number of seats available in outdoor or patio areas." />
          </div>
          <Input
            type="number"
            value={externalSeating}
            onChange={(e) => setExternalSeating(Number(e.target.value))}
            min={0}
            max={100}
            step={5}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>FOH Area (sqm)</Label>
          <Input
            value={fohArea.toFixed(1)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {totalArea} sqm × {fohPercentage}%
          </p>
        </div>

        <div className="space-y-2">
          <Label>Internal Seating Capacity</Label>
          <Input
            value={internalCapacity}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {fohArea.toFixed(1)} sqm ÷ {areaPerCover} sqm per cover
          </p>
        </div>

        <div className="space-y-2">
          <Label>Total Seating Capacity</Label>
          <Input
            value={totalCapacity}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Internal ({internalCapacity}) + External ({externalSeating})
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpaceParametersTab;
