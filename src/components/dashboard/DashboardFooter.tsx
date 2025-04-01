
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const DashboardFooter = () => {
  return (
    <div className="px-6 pb-6 flex gap-4 justify-center">
      <Link to="/control-panel">
        <Button>
          Adjust Parameters
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      <Link to="/scenarios">
        <Button variant="outline">
          Manage Scenarios
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};
