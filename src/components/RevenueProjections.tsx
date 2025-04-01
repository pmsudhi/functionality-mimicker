
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RevenueProjections = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Revenue Projections</h2>
      </div>
      
      <Tabs defaultValue="quarterly">
        <TabsList>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
          <TabsTrigger value="scenario">By Scenario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quarterly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Quarterly revenue chart</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => (
              <Card key={quarter}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{quarter} 2023</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(1200000 + (index * 250000)).toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">
                    {index % 2 === 0 ? "+" : "-"}{5 + (index * 2)}% from last year
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="annual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Annual Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Annual revenue chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scenario" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Scenario revenue chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueProjections;
