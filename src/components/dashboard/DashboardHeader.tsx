
import React from "react";
import { 
  Users, 
  Clock, 
  DollarSign, 
  LineChart 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockOutlets, mockBrands } from "@/services/mockData";

interface DashboardHeaderProps {
  selectedOutlet: string;
  setSelectedOutlet: (value: string) => void;
}

export const DashboardHeader = ({ 
  selectedOutlet, 
  setSelectedOutlet 
}: DashboardHeaderProps) => {
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  const currentBrand = currentOutlet 
    ? mockBrands.find(b => b.id === currentOutlet.brandId) 
    : null;

  return (
    <div className="flex justify-between items-center bg-muted/10 rounded-lg p-4 border border-border/20">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-2 rounded-md">
          <LineChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {currentBrand?.name || "Dashboard"} Performance Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentOutlet?.name || "All Outlets"} Performance Metrics
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
          <SelectTrigger className="w-[200px]">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select Outlet" />
          </SelectTrigger>
          <SelectContent>
            {mockOutlets.map(outlet => (
              <SelectItem key={outlet.id} value={outlet.id}>
                {outlet.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className="text-sm">Last Updated: Now</span>
        </div>
      </div>
    </div>
  );
};
