
import React from "react";
import { mockBrands, mockOutlets } from "@/services/mockData";
import { useBrandOutlet } from "@/context/BrandOutletContext";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, className, icon, children }: PageHeaderProps) {
  const { selectedBrandId, selectedOutletId } = useBrandOutlet();
  
  const currentBrand = selectedBrandId 
    ? mockBrands.find(b => b.id === selectedBrandId)
    : null;
    
  const currentOutlet = selectedOutletId 
    ? mockOutlets.find(o => o.id === selectedOutletId)
    : null;
    
  const brandName = currentBrand?.name || "";
  const outletName = currentOutlet?.name || "";
  
  // Determine the description text based on the provided description or default format
  const headerDescription = description || 
    (brandName && outletName 
      ? `${brandName} - ${outletName} ${title}` 
      : brandName 
        ? `${brandName} ${title}`
        : `All Outlets ${title}`);
  
  return (
    <div className={cn(
      "bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-4 mb-6",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="bg-primary/10 p-2 rounded-md">{icon}</div>}
          <div>
            <h1 className="text-2xl font-bold">
              {brandName ? `${brandName} ${title}` : title}
            </h1>
            <p className="text-muted-foreground">
              {headerDescription}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
