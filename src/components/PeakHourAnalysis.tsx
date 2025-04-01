
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample data for peak hour analysis
const heatmapData = {
  hours: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
  totalStaff: [0, 0, 3, 5, 8, 10, 15, 20, 25, 28, 24, 18, 12, 8, 4, 0]
};

const positionBreakdownData = {
  positions: [
    "Restaurant Manager", 
    "Assistant Manager", 
    "Host/Hostess", 
    "Waiter/Waitress", 
    "Runner", 
    "Bartender",
    "Executive Chef", 
    "Sous Chef", 
    "Line Cook", 
    "Prep Cook", 
    "Dishwasher"
  ],
  hours: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
  data: [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], // Restaurant Manager
    [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0], // Assistant Manager
    [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0], // Host/Hostess
    [0, 0, 0, 1, 2, 3, 5, 6, 8, 8, 7, 6, 4, 2, 1, 0], // Waiter/Waitress
    [0, 0, 0, 0, 1, 1, 2, 3, 4, 4, 3, 2, 1, 1, 0, 0], // Runner
    [0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0], // Bartender
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Executive Chef
    [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0], // Sous Chef
    [0, 0, 0, 0, 1, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0, 0], // Line Cook
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Prep Cook
    [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0]  // Dishwasher
  ]
};

// Helper function to get cell background color based on staff count
const getCellColor = (count: number) => {
  if (count === 0) return "bg-gray-100";
  if (count <= 5) return "bg-green-100";
  if (count <= 10) return "bg-green-200";
  if (count <= 15) return "bg-yellow-100";
  if (count <= 20) return "bg-yellow-200";
  if (count <= 25) return "bg-orange-100";
  return "bg-orange-200";
};

const PeakHourAnalysis = () => {
  const [selectedDay, setSelectedDay] = useState("friday");
  const [selectedView, setSelectedView] = useState("heatmap");
  
  const totalForHour = (hourIndex: number) => {
    return positionBreakdownData.data.reduce((sum, position) => sum + position[hourIndex], 0);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Peak Hour Staffing Analysis</h1>
          <p className="text-muted-foreground">Analyze and optimize staffing levels throughout the day</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
              <SelectItem value="sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heatmap">Heatmap View</SelectItem>
              <SelectItem value="position">Position Breakdown</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-black text-white hover:bg-gray-800">
            Optimize Staffing
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {selectedView === "heatmap" 
              ? `Staffing Heatmap - ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}` 
              : `Position Breakdown - ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}`}
          </CardTitle>
          <CardDescription>
            {selectedView === "heatmap" 
              ? "Visual representation of staffing needs throughout the day" 
              : "Detailed staffing by position throughout the day"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedView === "heatmap" ? (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hour</TableHead>
                      {heatmapData.hours.map((hour) => (
                        <TableHead key={hour} className="text-center">{hour}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Total Staff</TableCell>
                      {heatmapData.totalStaff.map((count, index) => (
                        <TableCell key={index} className={`text-center ${getCellColor(count)}`}>
                          {count}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="text-sm">Legend:</div>
                <Badge variant="outline" className="bg-gray-100">0</Badge>
                <Badge variant="outline" className="bg-green-100">1-5</Badge>
                <Badge variant="outline" className="bg-green-200">6-10</Badge>
                <Badge variant="outline" className="bg-yellow-100">11-15</Badge>
                <Badge variant="outline" className="bg-yellow-200">16-20</Badge>
                <Badge variant="outline" className="bg-orange-100">21-25</Badge>
                <Badge variant="outline" className="bg-orange-200">26+</Badge>
                
                <div className="ml-auto text-sm text-muted-foreground">
                  Peak staffing: {Math.max(...heatmapData.totalStaff)} staff at {heatmapData.hours[heatmapData.totalStaff.indexOf(Math.max(...heatmapData.totalStaff))]}
                </div>
              </div>
            </>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    {positionBreakdownData.hours.map((hour) => (
                      <TableHead key={hour} className="text-center">{hour}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positionBreakdownData.positions.map((position, posIndex) => (
                    <TableRow key={position}>
                      <TableCell className="font-medium">{position}</TableCell>
                      {positionBreakdownData.data[posIndex].map((count, hourIndex) => (
                        <TableCell key={hourIndex} className={`text-center ${getCellColor(count)}`}>
                          {count}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total</TableCell>
                    {positionBreakdownData.hours.map((_, hourIndex) => (
                      <TableCell key={hourIndex} className={`text-center ${getCellColor(totalForHour(hourIndex))}`}>
                        {totalForHour(hourIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeakHourAnalysis;
