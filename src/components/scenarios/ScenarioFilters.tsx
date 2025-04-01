
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Brand, Outlet } from "@/types/extraTypes";

interface ScenarioFiltersProps {
  selectedBrandId: string | null;
  selectedOutletId: string | null;
  availableBrands: Brand[];
  availableOutlets: Outlet[];
  handleBrandChange: (value: string) => void;
  handleOutletChange: (value: string) => void;
}

const ScenarioFilters = ({
  selectedBrandId,
  selectedOutletId,
  availableBrands,
  availableOutlets,
  handleBrandChange,
  handleOutletChange
}: ScenarioFiltersProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
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
      
      <Button>Create New Scenario</Button>
    </div>
  );
};

export default ScenarioFilters;
