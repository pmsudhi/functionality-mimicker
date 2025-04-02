
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pAndLData = [
  { item: "Revenue", amount: 25000000, percentage: 100.0 },
  { item: "Cost of Goods Sold (COGS)", amount: 7500000, percentage: 30.0 },
  { item: "Gross Profit", amount: 17500000, percentage: 70.0 },
  { item: "Operating Expenses", amount: 0, percentage: 0, isHeader: true },
  { item: "Labor Cost", amount: 6000000, percentage: 24.0 },
  { item: "Rent", amount: 2000000, percentage: 8.0 },
  { item: "Utilities", amount: 750000, percentage: 3.0 },
  { item: "Marketing", amount: 500000, percentage: 2.0 },
  { item: "Other Expenses", amount: 1250000, percentage: 5.0 },
  { item: "Total Operating Expenses", amount: 10500000, percentage: 42.0 },
  { item: "Operating Profit", amount: 7000000, percentage: 28.0 },
  { item: "Taxes", amount: 1400000, percentage: 5.6 },
  { item: "Net Profit", amount: 5600000, percentage: 22.4, highlight: true },
];

interface PLIntegrationTabProps {
  selectedTimeFrame: string;
  setSelectedTimeFrame: (value: string) => void;
}

const PLIntegrationTab = ({ selectedTimeFrame, setSelectedTimeFrame }: PLIntegrationTabProps) => {
  const { toast } = useToast();

  const handleExport = (type: string) => {
    toast({
      title: `Exported as ${type.toUpperCase()}`,
      description: "Your financial report has been exported."
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Profit & Loss Integration</CardTitle>
            <CardDescription>Financial impact of staff adjustments on P&L</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" onClick={() => handleExport("pdf")}>
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleExport("excel")}>
              <FileSpreadsheet className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount (SAR)</TableHead>
              <TableHead className="text-right">% of Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pAndLData.map((item, index) => (
              <TableRow 
                key={index} 
                className={`
                  ${item.isHeader ? 'font-bold bg-muted' : ''}
                  ${item.highlight ? 'bg-green-50 font-bold' : ''}
                `}
              >
                <TableCell>{item.item}</TableCell>
                <TableCell className="text-right">
                  {item.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {item.percentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PLIntegrationTab;
