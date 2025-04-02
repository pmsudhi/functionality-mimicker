
import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  title,
  description,
  icon: Icon,
  children,
  className
}: SectionContainerProps) {
  return (
    <div className={cn("h-full p-6 overflow-auto", className)}>
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      
      {children}
    </div>
  );
}
