
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockOutlets, mockBrands } from "@/services/mockData";
import { Scenario } from "@/types/modelTypes";
import { Download, Trash2 } from 'lucide-react';

interface ScenarioTableProps {
  scenarios: Scenario[];
}

const ScenarioTable = ({ scenarios }: ScenarioTableProps) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Outlet</TableHead>
            <TableHead className="text-right">Total Staff</TableHead>
            <TableHead className="text-right">Labor Cost (SAR)</TableHead>
            <TableHead className="text-right">Labor %</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Current Operation */}
          <TableRow>
            <TableCell className="pr-0">
              <Checkbox id="select-current-operation" />
            </TableCell>
            <TableCell className="font-medium">Current Operation</TableCell>
            <TableCell>Burger Boutique</TableCell>
            <TableCell>Mall of Dhahran</TableCell>
            <TableCell className="text-right">33</TableCell>
            <TableCell className="text-right">1,65,500</TableCell>
            <TableCell className="text-right">24.5%</TableCell>
            <TableCell>2023-10-15</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                <Download className="h-4 w-4 mr-1" />
                Load
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
          
          {/* Optimized Staffing */}
          <TableRow>
            <TableCell className="pr-0">
              <Checkbox id="select-optimized-staffing" />
            </TableCell>
            <TableCell className="font-medium">Optimized Staffing</TableCell>
            <TableCell>Burger Boutique</TableCell>
            <TableCell>Mall of Dhahran</TableCell>
            <TableCell className="text-right">29</TableCell>
            <TableCell className="text-right">1,48,000</TableCell>
            <TableCell className="text-right">22.1%</TableCell>
            <TableCell>2023-10-16</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                <Download className="h-4 w-4 mr-1" />
                Load
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
          
          {/* Ramadan Schedule */}
          <TableRow>
            <TableCell className="pr-0">
              <Checkbox id="select-ramadan-schedule" />
            </TableCell>
            <TableCell className="font-medium">Ramadan Schedule</TableCell>
            <TableCell>Burger Boutique</TableCell>
            <TableCell>Mall of Dhahran</TableCell>
            <TableCell className="text-right">25</TableCell>
            <TableCell className="text-right">1,27,500</TableCell>
            <TableCell className="text-right">25.5%</TableCell>
            <TableCell>2023-10-17</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                <Download className="h-4 w-4 mr-1" />
                Load
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
          
          {/* New Menu Launch */}
          <TableRow>
            <TableCell className="pr-0">
              <Checkbox id="select-new-menu-launch" />
            </TableCell>
            <TableCell className="font-medium">New Menu Launch</TableCell>
            <TableCell>Burger Boutique</TableCell>
            <TableCell>Mall of Dhahran</TableCell>
            <TableCell className="text-right">35</TableCell>
            <TableCell className="text-right">1,78,500</TableCell>
            <TableCell className="text-right">26.2%</TableCell>
            <TableCell>2023-10-18</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                <Download className="h-4 w-4 mr-1" />
                Load
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ScenarioTable;
