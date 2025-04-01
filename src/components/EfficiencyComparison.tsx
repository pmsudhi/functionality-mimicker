
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EfficiencyComparison = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Efficiency Comparison</h2>
      </div>
      
      <Tabs defaultValue="department">
        <TabsList>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="role">By Role</TabsTrigger>
          <TabsTrigger value="scenario">By Scenario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="department" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Department efficiency chart</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-4 mt-6">
            {["Operations", "Sales", "Marketing", "IT", "HR"].map((dept, index) => (
              <Card key={dept}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dept}</span>
                    <div className="flex items-center gap-4">
                      <div className="bg-muted h-2 w-40 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${70 + (index * 5)}%` }}
                        />
                      </div>
                      <span className="w-12 text-right">{70 + (index * 5)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="role" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Role efficiency chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scenario" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Scenario efficiency chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EfficiencyComparison;
