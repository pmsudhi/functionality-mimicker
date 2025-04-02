
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const LastUpdatedIndicator = () => {
  const [time, setTime] = useState(new Date());

  // Update the time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the time for display
  const formattedTime = time.toLocaleTimeString([], {
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
