
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function CardGrid({ 
  children, 
  className,
  columns = 4
}: CardGridProps) {
  const getColumnsClass = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className={cn(`grid gap-4 ${getColumnsClass()}`, className)}>
      {children}
    </div>
  );
}
