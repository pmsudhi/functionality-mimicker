
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for peak hour analysis
const heatmapData = {
  hours: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
  totalStaff: [0, 0, 3, 5, 8, 10, 15, 20, 25, 28, 24, 18, 12, 8, 4, 0]
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
          
          <Button className="bg-black text-white hover:bg-gray-800">
            Optimize Staffing
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Staffing Heatmap - {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
          </CardTitle>
          <CardDescription>
            Visual representation of staffing needs throughout the day
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PeakHourAnalysis;
