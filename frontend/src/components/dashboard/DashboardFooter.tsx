
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Settings, Activity } from "lucide-react";

export const DashboardFooter = () => {
  return (
    <div className="px-6 pb-6">
      <div className="bg-muted/20 p-4 rounded-lg border border-border/40 shadow-sm">
        <h3 className="text-base font-medium mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/control-panel" state={{ from: "dashboard" }} className="action-button">
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-sm">
              <Settings className="h-4 w-4" />
              Adjust Parameters
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/scenarios" state={{ from: "dashboard" }} className="action-button">
            <Button variant="outline" className="gap-2 border-primary/20 shadow-sm">
              <Activity className="h-4 w-4" />
              Manage Scenarios
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
