
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SpaceParametersTab = () => {
  const [totalArea, setTotalArea] = useState(300);
  const [fohPercentage, setFohPercentage] = useState(65);
  const [areaPerCover, setAreaPerCover] = useState(1.67);
  const [externalSeating, setExternalSeating] = useState(20);
  
  // Calculated values
  const fohArea = Math.round(totalArea * (fohPercentage / 100));
  const bohArea = totalArea - fohArea;
  const internalSeatingCapacity = Math.floor(fohArea / areaPerCover);
  const totalSeatingCapacity = internalSeatingCapacity + externalSeating;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Total Restaurant Area (sqm)</Label>
            <Input 
              value={totalArea}
              onChange={e => setTotalArea(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[totalArea]} 
            min={100} 
            max={1000} 
            step={10}
            onValueChange={(value) => setTotalArea(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>FOH Area Percentage (%)</Label>
            <Input 
              value={fohPercentage}
              onChange={e => setFohPercentage(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[fohPercentage]} 
            min={40} 
            max={80} 
            step={5}
            onValueChange={(value) => setFohPercentage(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Area per Cover (sqm)</Label>
          <Select 
            value={areaPerCover.toString()} 
            onValueChange={(value) => setAreaPerCover(parseFloat(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select area per cover" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5 sqm (Fast Casual)</SelectItem>
              <SelectItem value="1.67">1.67 sqm (Standard)</SelectItem>
              <SelectItem value="1.86">1.86 sqm (Casual Dining)</SelectItem>
              <SelectItem value="2.05">2.05 sqm (Casual Dining+)</SelectItem>
              <SelectItem value="2.32">2.32 sqm (Premium Dining)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>External Seating Capacity</Label>
            <Input 
              value={externalSeating}
              onChange={e => setExternalSeating(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[externalSeating]} 
            min={0} 
            max={100} 
            step={5}
            onValueChange={(value) => setExternalSeating(value[0])}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>FOH Area (sqm)</Label>
          <Input
            value={fohArea}
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
            value={internalSeatingCapacity}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {fohArea} sqm ÷ {areaPerCover} sqm per cover
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Total Seating Capacity</Label>
          <Input
            value={totalSeatingCapacity}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Internal ({internalSeatingCapacity}) + External ({externalSeating})
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>BOH Area (sqm)</Label>
          <Input
            value={bohArea}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {totalArea} sqm × {100 - fohPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpaceParametersTab;
