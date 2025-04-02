
import React from "react";
import { mockOutlets } from "@/services/mockData";
import { LineChart } from "lucide-react";
import { LastUpdatedIndicator } from "./components/LastUpdatedIndicator";
import { PageHeader } from "@/components/ui/page-header";
import { useBrandOutlet } from "@/context/BrandOutletContext";

export const DashboardHeader = () => {
  return (
    <PageHeader
      title="Performance Overview"
      icon={<LineChart className="h-6 w-6 text-primary" />}
    >
      <LastUpdatedIndicator />
    </PageHeader>
  );
};
