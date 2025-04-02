
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
import { useBrandOutlet } from "@/context/BrandOutletContext";

export const OutletSelector = () => {
  const { selectedBrandId, selectedOutletId, setSelectedOutletId } = useBrandOutlet();
  const availableOutlets = mockOutlets.filter(o => o.brandId === selectedBrandId);

  return (
    <Select value={selectedOutletId} onValueChange={setSelectedOutletId}>
      <SelectTrigger className="w-[200px]">
        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="Select Outlet" />
      </SelectTrigger>
      <SelectContent>
        {availableOutlets.map(outlet => (
          <SelectItem key={outlet.id} value={outlet.id}>
            {outlet.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
