
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StaffingHeaderProps {
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedOutlet: string;
  setSelectedOutlet: (value: string) => void;
}

export const StaffingHeader: React.FC<StaffingHeaderProps> = ({
  selectedBrand,
  setSelectedBrand,
  selectedOutlet,
  setSelectedOutlet
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Staffing Structure</h1>
        <p className="text-muted-foreground">Detailed breakdown of staff positions and costs</p>
      </div>
      
      <div className="flex gap-3 self-start">
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-brands">All Brands</SelectItem>
            <SelectItem value="white-robata">White Robata</SelectItem>
            <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
            <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Outlets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-outlets">All Outlets</SelectItem>
            <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
            <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
            <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
