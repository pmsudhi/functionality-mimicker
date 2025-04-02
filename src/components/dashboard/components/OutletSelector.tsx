
import React from "react";
import { Users } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockOutlets } from "@/services/mockData";

interface OutletSelectorProps {
  selectedOutlet: string;
  setSelectedOutlet: (value: string) => void;
}

export const OutletSelector = ({ 
  selectedOutlet, 
  setSelectedOutlet 
}: OutletSelectorProps) => {
  return (
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
  );
};
