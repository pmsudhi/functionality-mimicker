
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

const CapacityViewHeader = () => {
  return (
    <div className="p-2 border-b">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Capacity Planning</h3>
        <div className="flex items-center space-x-2">
          <Select defaultValue="2023">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CapacityViewHeader;
