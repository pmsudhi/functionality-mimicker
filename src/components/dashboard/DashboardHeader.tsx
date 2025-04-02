
import React from "react";
import { mockOutlets } from "@/services/mockData";
import { BrandOutletInfo } from "./components/BrandOutletInfo";
import { OutletSelector } from "./components/OutletSelector";
import { LastUpdatedIndicator } from "./components/LastUpdatedIndicator";

interface DashboardHeaderProps {
  selectedOutlet: string;
  setSelectedOutlet: (value: string) => void;
}

export const DashboardHeader = ({ 
  selectedOutlet, 
  setSelectedOutlet 
}: DashboardHeaderProps) => {
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutlet);
  
  return (
    <div className="flex justify-between items-center bg-muted/10 rounded-lg p-4 border border-border/20">
      <BrandOutletInfo 
        brandId={currentOutlet?.brandId || null}
        outletName={currentOutlet?.name || null}
      />

      <div className="flex items-center space-x-4">
        <OutletSelector 
          selectedOutlet={selectedOutlet}
          setSelectedOutlet={setSelectedOutlet}
        />
        <LastUpdatedIndicator />
      </div>
    </div>
  );
};
