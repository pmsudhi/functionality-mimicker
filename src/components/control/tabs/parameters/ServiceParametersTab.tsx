
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ServiceParametersTab = () => {
  const [coversPerWaiter, setCoversPerWaiter] = useState(16);
  const [runnerToWaiterRatio, setRunnerToWaiterRatio] = useState(50);
  const [kitchenStations, setKitchenStations] = useState(4);
  const [staffPerStation, setStaffPerStation] = useState(1.5);
  
  // Calculated values
  const waitersNeeded = Math.ceil(100 / coversPerWaiter);
  const runnersNeeded = Math.ceil(waitersNeeded * (runnerToWaiterRatio / 100));
  const kitchenStaffNeeded = kitchenStations * staffPerStation;
  const totalFOHStaff = waitersNeeded + runnersNeeded + 2; // +2 for host and manager
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Covers per Waiter</Label>
          <Select 
            value={coversPerWaiter.toString()} 
            onValueChange={(value) => setCoversPerWaiter(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select covers per waiter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 covers (Premium Dining)</SelectItem>
              <SelectItem value="16">16 covers (Standard Service)</SelectItem>
              <SelectItem value="20">20 covers (Fast Casual+)</SelectItem>
              <SelectItem value="24">24 covers (Fast Casual)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Runner to Waiter Ratio (%)</Label>
          <Select 
            value={runnerToWaiterRatio.toString()} 
            onValueChange={(value) => setRunnerToWaiterRatio(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select runner to waiter ratio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25% (1 runner per 4 waiters)</SelectItem>
              <SelectItem value="50">50% (1:2 Ratio)</SelectItem>
              <SelectItem value="75">75% (3 runners per 4 waiters)</SelectItem>
              <SelectItem value="100">100% (1 runner per waiter)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Kitchen Stations</Label>
            <Input 
              value={kitchenStations}
              onChange={e => setKitchenStations(Number(e.target.value) || 0)}
              className="w-20 text-right"
            />
          </div>
          <Slider 
            value={[kitchenStations]} 
            min={2} 
            max={12} 
            step={1}
            onValueChange={(value) => setKitchenStations(value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Service Style</Label>
          <Select defaultValue="casual-dining">
            <SelectTrigger>
              <SelectValue placeholder="Select service style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fast-casual">Fast Casual</SelectItem>
              <SelectItem value="casual-dining">Casual Dining</SelectItem>
              <SelectItem value="premium-dining">Premium Dining</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Waiters Needed (for 100 covers)</Label>
          <Input
            value={waitersNeeded}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as 100 covers ÷ {coversPerWaiter} covers per waiter
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Runners Needed</Label>
          <Input
            value={runnersNeeded}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {waitersNeeded} waiters × {runnerToWaiterRatio}% (rounded up)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Kitchen Staff Needed</Label>
          <Input
            value={kitchenStaffNeeded.toFixed(1)}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Calculated as {kitchenStations} stations × {staffPerStation} staff per station
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Total FOH Staff</Label>
          <Input
            value={totalFOHStaff}
            readOnly
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Waiters ({waitersNeeded}) + Runners ({runnersNeeded}) + Host (1) + Manager (1)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceParametersTab;
