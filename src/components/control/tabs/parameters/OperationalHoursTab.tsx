import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpIcon } from '@/components/ui/help-icon';
import { CALCULATION_RULES } from '@/constants/calculationRules';

const OperationalHoursTab = () => {
  const [operatingDays, setOperatingDays] = useState(350);
  const [dailyHours, setDailyHours] = useState(12);
  const [peakHourFactor, setPeakHourFactor] = useState(1.5);
  const [weekendBoost, setWeekendBoost] = useState(false);
  const [peakHours, setPeakHours] = useState(4);
  const [serviceStyle, setServiceStyle] = useState('casual');
  const [ramadanAdjustment, setRamadanAdjustment] = useState(0);
  
  // Calculated values
  const totalAnnualHours = operatingDays * dailyHours;
  const peakHoursPerDay = 4;
  const peakHoursPerYear = peakHoursPerDay * operatingDays;
  const standardHoursPerYear = totalAnnualHours - peakHoursPerYear;
  const staffingRequirement = `${peakHourFactor}× standard staffing`;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Operational Hours</h3>
        <HelpIcon content={CALCULATION_RULES.operational.rules} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Operating Days per Month</Label>
            <HelpIcon content="Number of days the restaurant is open for business each month." />
          </div>
          <Input
            type="number"
            value={operatingDays}
            onChange={(e) => setOperatingDays(Number(e.target.value))}
            min={1}
            max={31}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Peak Hours per Day</Label>
            <HelpIcon content="Number of hours during which the restaurant operates at maximum capacity." />
          </div>
          <Input
            type="number"
            value={peakHours}
            onChange={(e) => setPeakHours(Number(e.target.value))}
            min={1}
            max={12}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Service Style</Label>
            <HelpIcon content="Type of service style which affects staffing requirements and operational efficiency." />
          </div>
          <Select value={serviceStyle} onValueChange={setServiceStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Select service style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fast-casual">Fast Casual</SelectItem>
              <SelectItem value="casual">Casual Dining</SelectItem>
              <SelectItem value="premium">Premium Dining</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Ramadan Adjustment (%)</Label>
            <HelpIcon content="Percentage adjustment to operating hours during Ramadan period." />
          </div>
          <Input
            type="number"
            value={ramadanAdjustment}
            onChange={(e) => setRamadanAdjustment(Number(e.target.value))}
            min={0}
            max={100}
            step={5}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Total Operating Hours</Label>
        <div className="text-2xl font-bold text-primary">
          {operatingDays * peakHours} hours
        </div>
        <p className="text-xs text-muted-foreground">
          {operatingDays} days × {peakHours} hours
        </p>
      </div>

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
    </div>
  );
};

export default OperationalHoursTab;
