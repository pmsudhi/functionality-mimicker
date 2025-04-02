
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Filter, 
  MoreHorizontal, 
  PlusCircle,
  Share2, 
  BriefcaseBusiness
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PlanningHeader = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("q3-2023");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const { toast } = useToast();
  
  const handleCreateScenario = () => {
    toast({
      title: "New Scenario",
      description: "Create a new workforce planning scenario",
    });
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur-sm p-4 z-10 mt-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-md">
            <BriefcaseBusiness className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">F&B Manpower Planning</h2>
            <p className="text-sm text-muted-foreground">Optimize your workforce efficiency</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
            <SelectTrigger className="w-[140px] border-dashed">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q3-2023">Q3 2023</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q2-2024">Q2 2024</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[140px] border-dashed">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="white-robata">White Robata</SelectItem>
              <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
              <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
              <SelectItem value="nomad">Nomad</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Planning Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: "Export Data", description: "Exporting data to Excel" })}>
                <Share2 className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Print Report", description: "Preparing report for print" })}>
                Print Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Configure planning parameters" })}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={handleCreateScenario} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="h-4 w-4" />
            New Scenario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanningHeader;
