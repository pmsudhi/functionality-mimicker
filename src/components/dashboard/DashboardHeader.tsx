
import React from "react";
import { mockOutlets } from "@/services/mockData";
import { BrandOutletInfo } from "./components/BrandOutletInfo";
import { LastUpdatedIndicator } from "./components/LastUpdatedIndicator";
import { useBrandOutlet } from "@/context/BrandOutletContext";

export const DashboardHeader = () => {
  const { selectedBrandId, selectedOutletId } = useBrandOutlet();
  const currentOutlet = mockOutlets.find(o => o.id === selectedOutletId);
  
  return (
    <div className="flex justify-between items-center bg-muted/10 rounded-lg p-4 border border-border/20">
      <BrandOutletInfo 
        brandId={selectedBrandId}
        outletName={currentOutlet?.name || null}
      />

      <div className="flex items-center space-x-4">
        <LastUpdatedIndicator />
      </div>
    </div>
  );
};
