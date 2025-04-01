
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FileText, FileSpreadsheet, Printer } from "lucide-react";

// Sample data for staffing structure
const staffDistributionData = [
  { name: "Kitchen Staff", value: 40, color: "#22c55e" },
  { name: "Service Staff", value: 29, color: "#3b82f6" },
  { name: "Management", value: 11, color: "#8b5cf6" },
  { name: "Cleaning", value: 13, color: "#a855f7" },
  { name: "Security", value: 7, color: "#ec4899" }
];

const costAnalysisData = [
  { department: "FOH Management", cost: 150000, percentage: 14.3 },
  { department: "FOH Service", cost: 350000, percentage: 33.5 },
  { department: "BOH Management", cost: 175000, percentage: 16.7 },
  { department: "BOH Kitchen", cost: 320000, percentage: 31.5 },
  { department: "BOH Support", cost: 42000, percentage: 4.0 }
];

const staffPositionsData = {
  foh: [
    { position: "Restaurant Manager", count: 5, salary: 12000, cost: 60000 },
    { position: "Assistant Manager", count: 10, salary: 9000, cost: 90000 },
    { position: "Host/Hostess", count: 12, salary: 4500, cost: 54000 },
    { position: "Waiter/Waitress", count: 42, salary: 4000, cost: 168000 },
    { position: "Runner", count: 15, salary: 3500, cost: 52500 },
    { position: "Bartender", count: 8, salary: 5000, cost: 40000 },
    { position: "Cashier", count: 9, salary: 4000, cost: 36000 }
  ],
  boh: [
    { position: "Executive Chef", count: 5, salary: 15000, cost: 75000 },
    { position: "Sous Chef", count: 10, salary: 10000, cost: 100000 },
    { position: "Line Cook", count: 20, salary: 6000, cost: 120000 },
    { position: "Prep Cook", count: 15, salary: 4500, cost: 67500 },
    { position: "Kitchen Helper", count: 8, salary: 3500, cost: 28000 },
    { position: "Dishwasher", count: 20, salary: 3000, cost: 60000 },
    { position: "Kitchen Manager", count: 10, salary: 9000, cost: 90000 }
  ]
};

const COLORS = ["#22c55e", "#3b82f6", "#8b5cf6", "#a855f7", "#ec4899"];

const StaffingStructure = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedBrand, setSelectedBrand] = useState("all-brands");
  const [selectedOutlet, setSelectedOutlet] = useState("all-outlets");
  
  const totalFOH = staffPositionsData.foh.reduce((sum, staff) => sum + staff.count, 0);
  const totalBOH = staffPositionsData.boh.reduce((sum, staff) => sum + staff.count, 0);
  const totalStaff = totalFOH + totalBOH;
  const fohBohRatio = (totalFOH / totalBOH).toFixed(2);
  
  const totalLaborCost = [
    ...staffPositionsData.foh.map(staff => staff.cost),
    ...staffPositionsData.boh.map(staff => staff.cost)
  ].reduce((sum, cost) => sum + cost, 0);
  
  const averageCostPerEmployee = Math.round(totalLaborCost / totalStaff);
  
  const handleExport = (type: string) => {
    console.log(`Exporting as ${type}`);
  };
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staffing Structure</h1>
        <div className="flex gap-4">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-brands">All Brands</SelectItem>
              <SelectItem value="white-robata">White Robata</SelectItem>
              <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
              <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select outlet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-outlets">All Outlets</SelectItem>
              <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
              <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
              <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              Across all outlets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              FOH/BOH Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fohBohRatio}</div>
            <p className="text-xs text-muted-foreground">
              {totalFOH} FOH / {totalBOH} BOH
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Labor Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {(totalLaborCost / 1000).toFixed(2)}k</div>
            <p className="text-xs text-muted-foreground">
              Average SAR {averageCostPerEmployee.toLocaleString()} per employee
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Staff Distribution by Department</CardTitle>
              <CardDescription>Breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={staffDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {staffDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Department Summary</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Staff Count</TableHead>
                        <TableHead>% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffDistributionData.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                              {dept.name}
                            </div>
                          </TableCell>
                          <TableCell>{Math.round(totalStaff * dept.value / 100)}</TableCell>
                          <TableCell>{dept.value}%</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold">
                        <TableCell>Total</TableCell>
                        <TableCell>{totalStaff}</TableCell>
                        <TableCell>100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Staff Breakdown by Position</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-2">Front of House (FOH)</h4>
                    <div className="space-y-2">
                      {staffPositionsData.foh.map((position) => (
                        <div key={position.position} className="flex justify-between">
                          <span>{position.position}</span>
                          <span className="font-medium">{position.count}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total FOH</span>
                        <span>{totalFOH}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Back of House (BOH)</h4>
                    <div className="space-y-2">
                      {staffPositionsData.boh.map((position) => (
                        <div key={position.position} className="flex justify-between">
                          <span>{position.position}</span>
                          <span className="font-medium">{position.count}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total BOH</span>
                        <span>{totalBOH}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="positions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Position Breakdown</CardTitle>
                <CardDescription>Detailed staff positions and costs</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleExport("pdf")}>
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleExport("print")}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Front of House (FOH)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                        <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffPositionsData.foh.map((position) => (
                        <TableRow key={position.position}>
                          <TableCell>{position.position}</TableCell>
                          <TableCell className="text-right">{position.count}</TableCell>
                          <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold">
                        <TableCell>Total FOH</TableCell>
                        <TableCell className="text-right">{totalFOH}</TableCell>
                        <TableCell className="text-right">{Math.round(staffPositionsData.foh.reduce((sum, staff) => sum + staff.cost, 0) / totalFOH).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{staffPositionsData.foh.reduce((sum, staff) => sum + staff.cost, 0).toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Back of House (BOH)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Avg. Salary (SAR)</TableHead>
                        <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffPositionsData.boh.map((position) => (
                        <TableRow key={position.position}>
                          <TableCell>{position.position}</TableCell>
                          <TableCell className="text-right">{position.count}</TableCell>
                          <TableCell className="text-right">{position.salary.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{position.cost.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold">
                        <TableCell>Total BOH</TableCell>
                        <TableCell className="text-right">{totalBOH}</TableCell>
                        <TableCell className="text-right">{Math.round(staffPositionsData.boh.reduce((sum, staff) => sum + staff.cost, 0) / totalBOH).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{staffPositionsData.boh.reduce((sum, staff) => sum + staff.cost, 0).toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost-analysis">
          <Card>
            <CardHeader>
              <CardTitle>Labor Cost Analysis</CardTitle>
              <CardDescription>Cost breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costAnalysisData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" name="Monthly Cost (SAR)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Summary</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Monthly Cost (SAR)</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costAnalysisData.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell>{dept.department}</TableCell>
                        <TableCell className="text-right">{dept.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{dept.percentage}%</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {costAnalysisData.reduce((sum, dept) => sum + dept.cost, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffingStructure;
