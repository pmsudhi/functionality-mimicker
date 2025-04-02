
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockOutlets, mockBrands } from '@/services/mockData';

interface BrandOutletContextType {
  selectedBrandId: string;
  selectedOutletId: string;
  setSelectedBrandId: (brandId: string) => void;
  setSelectedOutletId: (outletId: string) => void;
}

const BrandOutletContext = createContext<BrandOutletContextType | undefined>(undefined);

export const BrandOutletProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with the first brand and its first outlet
  const [selectedBrandId, setSelectedBrandId] = useState<string>(mockBrands[0]?.id || '');
  const [selectedOutletId, setSelectedOutletId] = useState<string>('');

  // Update the selected outlet when the brand changes
  useEffect(() => {
    const brandOutlets = mockOutlets.filter(o => o.brandId === selectedBrandId);
    if (brandOutlets.length > 0) {
      // If current outlet doesn't belong to the selected brand, change it
      const currentOutletBelongsToBrand = brandOutlets.some(o => o.id === selectedOutletId);
      if (!currentOutletBelongsToBrand) {
        setSelectedOutletId(brandOutlets[0].id);
      }
    }
  }, [selectedBrandId, selectedOutletId]);

  // Initialize selected outlet on component mount
  useEffect(() => {
    if (selectedBrandId && !selectedOutletId) {
      const brandOutlets = mockOutlets.filter(o => o.brandId === selectedBrandId);
      if (brandOutlets.length > 0) {
        setSelectedOutletId(brandOutlets[0].id);
      }
    }
  }, [selectedBrandId, selectedOutletId]);

  return (
    <BrandOutletContext.Provider value={{
      selectedBrandId,
      selectedOutletId,
      setSelectedBrandId,
      setSelectedOutletId
    }}>
      {children}
    </BrandOutletContext.Provider>
  );
};

export const useBrandOutlet = () => {
  const context = useContext(BrandOutletContext);
  
  if (context === undefined) {
    throw new Error('useBrandOutlet must be used within a BrandOutletProvider');
  }
  
  return context;
};
