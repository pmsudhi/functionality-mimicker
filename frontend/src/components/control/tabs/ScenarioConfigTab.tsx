
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const ScenarioConfigTab = () => {
  const [ramadanAdjustment, setRamadanAdjustment] = useState(false);
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Scenario Configuration</CardTitle>
        <CardDescription>Define your scenario parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="scenario-name">Scenario Name</Label>
          <Input id="scenario-name" placeholder="New Scenario" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select defaultValue="">
            <SelectTrigger id="brand">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand-1">Brand 1</SelectItem>
              <SelectItem value="brand-2">Brand 2</SelectItem>
              <SelectItem value="brand-3">Brand 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="outlet">Outlet</Label>
          <Select defaultValue="">
            <SelectTrigger id="outlet">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outlet-1">Outlet 1</SelectItem>
              <SelectItem value="outlet-2">Outlet 2</SelectItem>
              <SelectItem value="outlet-3">Outlet 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select defaultValue="sar">
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sar">SAR (Saudi Riyal)</SelectItem>
              <SelectItem value="usd">USD (US Dollar)</SelectItem>
              <SelectItem value="aed">AED (Emirati Dirham)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 pt-4">
          <Switch 
            id="ramadan-adjustment" 
            checked={ramadanAdjustment}
            onCheckedChange={setRamadanAdjustment}
          />
          <Label htmlFor="ramadan-adjustment">Apply Ramadan Adjustment (50% capacity)</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioConfigTab;
