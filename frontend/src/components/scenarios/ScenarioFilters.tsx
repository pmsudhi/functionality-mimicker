
import { useBrandOutlet } from "@/context/BrandOutletContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockBrands, mockOutlets } from "@/services/mockData";

interface ScenarioFiltersProps {
  onCreateNew?: () => void;
}

const ScenarioFilters = ({ onCreateNew }: ScenarioFiltersProps) => {
  const { selectedBrandId, selectedOutletId, setSelectedBrandId, setSelectedOutletId } = useBrandOutlet();
  
  // Filter available outlets based on selected brand
  const availableOutlets = mockOutlets.filter(o => 
    !selectedBrandId || o.brandId === selectedBrandId
  );

  // Handle brand change
  const handleBrandChange = (value: string) => {
    const newBrandId = value === "all" ? "" : value;
    setSelectedBrandId(newBrandId);
    
    // Reset outlet selection if current outlet doesn't belong to the selected brand
    if (newBrandId && selectedOutletId) {
      const outletBelongsToBrand = mockOutlets.some(
        o => o.id === selectedOutletId && o.brandId === newBrandId
      );
      
      if (!outletBelongsToBrand) {
        setSelectedOutletId('');
      }
    }
  };

  // Handle outlet change
  const handleOutletChange = (value: string) => {
    setSelectedOutletId(value === "all" ? "" : value);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <Select value={selectedBrandId || "all"} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {mockBrands.map(brand => (
              <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedOutletId || "all"} onValueChange={handleOutletChange}>
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
      
      <Button onClick={onCreateNew}>Create New Scenario</Button>
    </div>
  );
};

export default ScenarioFilters;
