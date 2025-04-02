
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mockBrands, mockOutlets } from "@/services/mockData";

interface BrandOutletSelectorProps {
  selectedBrandId: string;
  selectedOutletId: string;
  onBrandChange: (brandId: string) => void;
  onOutletChange: (outletId: string) => void;
  className?: string;
  variant?: "default" | "compact";
}

export const BrandOutletSelector = ({
  selectedBrandId,
  selectedOutletId,
  onBrandChange,
  onOutletChange,
  className = "",
  variant = "default"
}: BrandOutletSelectorProps) => {
  // Find the selected brand and outlet
  const selectedBrand = mockBrands.find(b => b.id === selectedBrandId);
  const availableOutlets = mockOutlets.filter(o => o.brandId === selectedBrandId);
  const selectedOutlet = mockOutlets.find(o => o.id === selectedOutletId);

  // Handle brand change and automatically select the first outlet of that brand
  const handleBrandChange = (brandId: string) => {
    onBrandChange(brandId);
    
    // Find the first outlet of the selected brand
    const brandOutlets = mockOutlets.filter(o => o.brandId === brandId);
    if (brandOutlets.length > 0 && brandOutlets[0].id !== selectedOutletId) {
      onOutletChange(brandOutlets[0].id);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Brand Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {selectedBrand?.name || "Select Brand"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-background">
          {mockBrands.map(brand => (
            <DropdownMenuItem 
              key={brand.id} 
              onClick={() => handleBrandChange(brand.id)}
              className={selectedBrandId === brand.id ? "bg-primary/10" : ""}
            >
              {brand.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Outlet Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {selectedOutlet?.name || "Select Outlet"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-background">
          {availableOutlets.map(outlet => (
            <DropdownMenuItem 
              key={outlet.id} 
              onClick={() => onOutletChange(outlet.id)}
              className={selectedOutletId === outlet.id ? "bg-primary/10" : ""}
            >
              {outlet.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
