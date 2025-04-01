
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockOutlets, mockBrands } from "@/services/mockData";
import { Scenario } from "@/types/modelTypes";

interface ScenarioTableProps {
  scenarios: Scenario[];
}

const ScenarioTable = ({ scenarios }: ScenarioTableProps) => {
  return (
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
        {scenarios.map(scenario => {
          const outlet = mockOutlets.find(o => o.id === scenario.outletId);
          const brand = outlet ? mockBrands.find(b => b.id === outlet.brandId) : null;
          const createdDate = new Date(scenario.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '-');
          
          return (
            <TableRow key={scenario.id}>
              <TableCell className="pr-0">
                <Checkbox id={`select-${scenario.id}`} />
              </TableCell>
              <TableCell className="font-medium">{scenario.name}</TableCell>
              <TableCell>{brand?.name || "Unknown"}</TableCell>
              <TableCell>{outlet?.name || "Unknown"}</TableCell>
              <TableCell className="text-right">
                {scenario.calculations.totalStaff ? Math.ceil(scenario.calculations.totalStaff) : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                {scenario.calculations.laborCost ? Number(scenario.calculations.laborCost).toLocaleString() : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                {scenario.calculations.laborPercentage 
                  ? `${scenario.calculations.laborPercentage.toFixed(1)}%` 
                  : "N/A"}
              </TableCell>
              <TableCell>{createdDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="mr-2">Load</Button>
                <Button variant="outline" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ScenarioTable;
