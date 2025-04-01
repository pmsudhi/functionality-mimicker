
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const OperationalHoursTab = () => {
  const [operatingDays, setOperatingDays] = useState(350);
  const [dailyHours, setDailyHours] = useState(12);
  const [peakHourFactor, setPeakHourFactor] = useState(1.5);
  const [weekendBoost, setWeekendBoost] = useState(false);
  
  // Calculated values
  const totalAnnualHours = operatingDays * dailyHours;
  const peakHoursPerDay = 4;
  const peakHoursPerYear = peakHoursPerDay * operatingDays;
  const standardHoursPerYear = totalAnnualHours - peakHoursPerYear;
  const staffingRequirement = `${peakHourFactor}× standard staffing`;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Operating Days per Year</Label>
            <Input 
              value={operatingDays}
              onChange={e => setOperatingDays(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[operatingDays]} 
            min={300} 
            max={365} 
            step={5}
            onValueChange={(value) => setOperatingDays(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Default is 350 days (accounts for Ramadan and other closures)
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Daily Operating Hours</Label>
            <Input 
              value={dailyHours}
              onChange={e => setDailyHours(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[dailyHours]} 
            min={6} 
            max={24} 
            step={1}
            onValueChange={(value) => setDailyHours(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Peak Hour Staffing Factor</Label>
            <Input 
              value={peakHourFactor.toFixed(1)}
              onChange={e => setPeakHourFactor(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[peakHourFactor * 10]} 
            min={10} 
            max={20} 
            step={1}
            onValueChange={(value) => setPeakHourFactor(value[0] / 10)}
          />
          <p className="text-xs text-muted-foreground">
            Multiplier for staff needed during peak hours
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="weekend-boost" 
            checked={weekendBoost}
            onCheckedChange={setWeekendBoost}
          />
          <Label htmlFor="weekend-boost">Apply Weekend Boost (25% more staff)</Label>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Total Annual Operating Hours</Label>
          <Input
            value={totalAnnualHours}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {operatingDays} days × {dailyHours} hours
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Standard Hours per Year</Label>
          <Input
            value={standardHoursPerYear}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Total hours minus peak hours
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Peak Hours per Year</Label>
          <Input
            value={peakHoursPerYear}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            {peakHoursPerDay} peak hours per day × {operatingDays} days
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Peak Hour Staffing Requirement</Label>
          <Input
            value={staffingRequirement}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            During peak hours, staffing is increased by this factor
          </p>
        </div>
      </div>
    </div>
  );
};

export default OperationalHoursTab;
