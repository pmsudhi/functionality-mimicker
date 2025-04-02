
import React from "react";
import { Clock } from "lucide-react";

export const LastUpdatedIndicator = () => {
  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <Clock className="h-5 w-5" />
      <span className="text-sm">Last Updated: Now</span>
    </div>
  );
};
