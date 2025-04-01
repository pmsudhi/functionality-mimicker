
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const PIIntegration = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Performance Indicator Integration</h2>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configure
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "CRM System", status: "Connected", lastSync: "2 hours ago" },
                { name: "ERP System", status: "Connected", lastSync: "1 day ago" },
                { name: "HRIS", status: "Connected", lastSync: "3 hours ago" }
              ].map((system) => (
                <div key={system.name} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{system.name}</p>
                    <p className="text-sm text-muted-foreground">Last sync: {system.lastSync}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm">{system.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sales per Employee", value: "$125,842", trend: "up" },
                { name: "Average Handling Time", value: "14.2 minutes", trend: "down" },
                { name: "Customer Satisfaction", value: "92%", trend: "up" }
              ].map((kpi) => (
                <div key={kpi.name} className="flex items-center justify-between border-b pb-3">
                  <span>{kpi.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{kpi.value}</span>
                    <span className={`text-xs ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {kpi.trend === "up" ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">Performance correlation chart</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PIIntegration;
