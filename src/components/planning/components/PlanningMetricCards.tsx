import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Users, BarChart3, DollarSign } from "lucide-react";

const PlanningMetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-none shadow-md hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">325</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4" />
              23%
            </span>{" "}
            increase from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Labor Utilization</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78%</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-red-500 dark:text-red-400">
              <ArrowDownLeft className="h-4 w-4" />
              5%
            </span>{" "}
            decrease from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Labor Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,000</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4" />
              12%
            </span>{" "}
            increase from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md hover-lift">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue per Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,500</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-green-500 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4" />
              8%
            </span>{" "}
            increase from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanningMetricCards;
