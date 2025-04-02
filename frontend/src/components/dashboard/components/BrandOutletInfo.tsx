
import React from "react";
import { LineChart } from "lucide-react";
import { mockBrands } from "@/services/mockData";

interface BrandOutletInfoProps {
  brandId: string | null;
  outletName: string | null;
}

export const BrandOutletInfo = ({ brandId, outletName }: BrandOutletInfoProps) => {
  const brandName = brandId 
    ? mockBrands.find(b => b.id === brandId)?.name || "Dashboard" 
    : "Dashboard";

  return (
    <div className="flex items-center space-x-4">
      <div className="bg-primary/10 p-2 rounded-md">
        <LineChart className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {brandName} Performance Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          {outletName || "All Outlets"} Performance Metrics
        </p>
      </div>
    </div>
  );
};
