
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Brand, Outlet } from "@/types/extraTypes";

interface ScenarioFiltersProps {
  selectedBrandId: string | null;
  selectedOutletId: string | null;
  availableBrands: Brand[];
  availableOutlets: Outlet[];
  handleBrandChange: (value: string) => void;
  handleOutletChange: (value: string) => void;
  onCreateNew?: () => void;
}

const ScenarioFilters = ({
  selectedBrandId,
  selectedOutletId,
  availableBrands,
  availableOutlets,
  handleBrandChange,
  handleOutletChange,
  onCreateNew
}: ScenarioFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Select value={selectedBrandId ? selectedBrandId : "all"} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {availableBrands.map(brand => (
              <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedOutletId ? selectedOutletId : "all"} onValueChange={handleOutletChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Outlets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outlets</SelectItem>
            {availableOutlets.map(outlet => (
              <SelectItem key={outlet.id} value={outlet.id}>{outlet.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={onCreateNew} className="ml-auto">
        <Plus className="mr-2 h-4 w-4" />
        Create New Scenario
      </Button>
    </div>
  );
};

export default ScenarioFilters;
