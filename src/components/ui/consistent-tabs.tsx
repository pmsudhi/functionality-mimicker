
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type TabItem = {
  value: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
};

interface ConsistentTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  tabsListClassName?: string;
  variant?: 'default' | 'outline' | 'underline';
}

export function ConsistentTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  tabsListClassName,
  variant = 'default'
}: ConsistentTabsProps) {
  // Set the first tab as default if none is provided
  const effectiveDefaultValue = defaultValue || (tabs.length > 0 ? tabs[0].value : '');
  
  // Apply different styles based on variant
  const getTabStyles = () => {
    switch(variant) {
      case 'outline':
        return "data-[state=active]:bg-background rounded-md flex items-center gap-2 px-4";
      case 'underline':
        return "data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-12 px-4";
      default:
        return "data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md";
    }
  };
  
  // Apply different list styles based on variant
  const getListStyles = () => {
    switch(variant) {
      case 'outline':
        return "bg-muted/40 mb-6 p-1 border border-border/20 rounded-md";
      case 'underline':
        return "bg-transparent mb-4";
      default:
        return "bg-muted/40 mb-6";
    }
  };

  return (
    <Tabs 
      defaultValue={effectiveDefaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList className={cn(getListStyles(), tabsListClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className={getTabStyles()}
          >
            {tab.icon && React.createElement(tab.icon, { className: "h-4 w-4 mr-2" })}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
