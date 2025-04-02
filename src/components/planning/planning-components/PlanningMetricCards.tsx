
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, DollarSign, BarChart3, TrendingUp, Clock } from 'lucide-react';

const PlanningMetricCards = () => {
  // Animated counter effect for metrics
  const [countValues, setCountValues] = useState({
    staff: 0,
    laborCost: 0,
    efficiency: 0
  });
  
  useEffect(() => {
    // Animate the counter from 0 to target value
    const targetValues = {
      staff: 386,
      laborCost: 26.4,
      efficiency: 3.8
    };
    
    const duration = 1500; // ms
    const interval = 20;
    const steps = duration / interval;
    
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCountValues({
        staff: Math.floor(progress * targetValues.staff),
        laborCost: parseFloat((progress * targetValues.laborCost).toFixed(1)),
        efficiency: parseFloat((progress * targetValues.efficiency).toFixed(1))
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCountValues(targetValues);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
            <span>Current Staff</span>
            <Users className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold">{countValues.staff}</div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Badge className="mr-2 bg-green-500/20 text-green-700 hover:bg-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                Optimized
              </Badge>
              <span>Across 7 outlets</span>
            </div>
            <div className="h-1 w-full bg-muted mt-3 group-hover:bg-muted/60 transition-colors">
              <div className="h-full bg-primary rounded-r-full group-hover:bg-primary/80 transition-colors" style={{ width: '65%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
            <span>Labor Cost Percentage</span>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold">{countValues.laborCost}%</div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Badge className="mr-2 bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                Moderate
              </Badge>
              <span>Industry avg: 25-30%</span>
            </div>
            <Progress value={countValues.laborCost} className="h-1 mt-3" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-muted/40 bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
            <span>Efficiency Rating</span>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-3xl font-bold">{countValues.efficiency}</div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Badge className="mr-2 bg-blue-500/20 text-blue-700 hover:bg-blue-500/20">
                <Clock className="h-3 w-3 mr-1" />
                Covers per Labor Hour
              </Badge>
              <span>Target: 4.0</span>
            </div>
            <div className="h-1 w-full bg-muted mt-3 group-hover:bg-muted/60 transition-colors">
              <div className="h-full bg-primary rounded-r-full group-hover:bg-primary/80 transition-colors" style={{ width: `${(countValues.efficiency/5)*100}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanningMetricCards;
