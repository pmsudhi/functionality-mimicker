
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Dashboard Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
