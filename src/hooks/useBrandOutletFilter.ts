
import { useState, useMemo } from "react";
import { mockOutlets, mockBrands } from "@/services/mockData";

interface UseBrandOutletFilterResult {
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  selectedOutletId: string | null;
  setSelectedOutletId: (id: string | null) => void;
  availableBrands: typeof mockBrands;
  availableOutlets: typeof mockOutlets;
  handleBrandChange: (value: string) => void;
  handleOutletChange: (value: string) => void;
}

export function useBrandOutletFilter(): UseBrandOutletFilterResult {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedOutletId, setSelectedOutletId] = useState<string | null>(null);

  // Get available brands
  const availableBrands = useMemo(() => {
    return Array.from(new Set(mockOutlets.map(o => o.brandId)))
      .map(brandId => mockBrands.find(b => b.id === brandId))
      .filter(brand => brand !== undefined) as typeof mockBrands;
  }, []);

  // Get available outlets filtered by selected brand
  const availableOutlets = useMemo(() => {
    return selectedBrandId 
      ? mockOutlets.filter(o => o.brandId === selectedBrandId)
      : mockOutlets;
  }, [selectedBrandId]);

  // Handler for brand change
  const handleBrandChange = (value: string) => {
    const newBrandId = value === "all" ? null : value;
    setSelectedBrandId(newBrandId);
    
    // Reset outlet selection if current outlet doesn't belong to the selected brand
    if (newBrandId) {
      const currentOutletBelongsToBrand = availableOutlets.some(
        o => o.id === selectedOutletId && o.brandId === newBrandId
      );
      
      if (!currentOutletBelongsToBrand) {
        setSelectedOutletId(null);
      }
    }
  };

  // Handler for outlet change
  const handleOutletChange = (value: string) => {
    setSelectedOutletId(value === "all" ? null : value);
  };

  return {
    selectedBrandId,
    setSelectedBrandId,
    selectedOutletId,
    setSelectedOutletId,
    availableBrands,
    availableOutlets,
    handleBrandChange,
    handleOutletChange,
  };
}
