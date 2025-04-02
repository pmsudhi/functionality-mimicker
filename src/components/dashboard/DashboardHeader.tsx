
import React from "react";

interface DashboardHeaderProps {
  selectedOutlet: string;
  setSelectedOutlet: (value: string) => void;
}

export const DashboardHeader = ({ 
  selectedOutlet, 
  setSelectedOutlet 
}: DashboardHeaderProps) => {
  return (
    <div className="pt-8 pb-4">
      <h1 className="text-3xl font-bold tracking-tight"></h1>
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold"></h2>
      </div>
    </div>
  );
};
