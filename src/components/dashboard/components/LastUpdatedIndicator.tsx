
import React from "react";
import { Clock } from "lucide-react";

export const LastUpdatedIndicator = () => {
  // Get current time for the "Last Updated" display
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span className="text-sm">Last Updated: {formattedTime}</span>
    </div>
  );
};
