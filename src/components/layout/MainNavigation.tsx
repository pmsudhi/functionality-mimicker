
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sliders, 
  Users, 
  FileText, 
  Calculator,
  BarChart4,
  Settings
} from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Control Panel', path: '/control-panel', icon: <Sliders className="h-5 w-5" /> },
    { name: 'Staffing Structure', path: '/staffing', icon: <Users className="h-5 w-5" /> },
    { name: 'Scenarios', path: '/scenarios', icon: <FileText className="h-5 w-5" /> },
    { name: 'Financial Impact', path: '/financial', icon: <Calculator className="h-5 w-5" /> },
  ];

  return (
    <nav className="w-full border-b bg-background shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center">
          <div className="flex items-center mr-8">
            <Link to="/" className="flex items-center">
              <BarChart4 className="h-6 w-6 mr-2 text-primary" />
              <span className="text-xl font-bold">F&B Manpower</span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors
                        ${currentPath === item.path
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/60 hover:text-foreground hover:bg-accent'
                        }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md">
                White Robata - Mall of Dhahran
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>White Robata - Mall of Dhahran</DropdownMenuItem>
                <DropdownMenuItem>Burger Joint - Al Khobar</DropdownMenuItem>
                <DropdownMenuItem>Pizza Palace - Riyadh</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button className="ml-2 p-2 rounded-md hover:bg-accent/50">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex md:hidden overflow-x-auto border-t">
        <div className="flex w-full">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 inline-flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors
                ${currentPath === item.path
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
