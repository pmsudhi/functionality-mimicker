
import React from 'react';
import { 
  LayoutPanelLeft, PieChart, Users, DollarSign, 
  BarChartHorizontal, TrendingUp, BarChart3, LineChart 
} from 'lucide-react';

// Import existing components
import GanttView from '../GanttView';
import TeamView from '../TeamView';
import CapacityView from '../CapacityView';
import EfficiencyMetrics from '../EfficiencyMetrics';
import ScenarioBuilder from '../ScenarioBuilder';
import ScenarioComparison from '../ScenarioComparison';
import FinancialImpact from '../FinancialImpact';
import PeakHourAnalysis from '../PeakHourAnalysis';
import RevenueProjections from '../RevenueProjections';

export const getPlanningTabs = () => {
  return [
    {
      value: 'gantt',
      label: 'Gantt View',
      icon: LayoutPanelLeft,
      content: <GanttView />
    },
    {
      value: 'team',
      label: 'Team View',
      icon: Users,
      content: <TeamView />
    },
    {
      value: 'capacity',
      label: 'Capacity',
      icon: PieChart,
      content: <CapacityView />
    },
    {
      value: 'efficiency',
      label: 'Efficiency',
      icon: BarChart3,
      content: <EfficiencyMetrics />
    },
    {
      value: 'scenario',
      label: 'Scenario',
      icon: PieChart,
      content: <ScenarioBuilder />
    },
    {
      value: 'comparison',
      label: 'Comparison',
      icon: BarChartHorizontal,
      content: <ScenarioComparison />
    },
    {
      value: 'financial',
      label: 'Financial',
      icon: DollarSign,
      content: <FinancialImpact />
    },
    {
      value: 'peak',
      label: 'Peak Hours',
      icon: TrendingUp,
      content: <PeakHourAnalysis />
    },
    {
      value: 'revenue',
      label: 'Revenue',
      icon: LineChart,
      content: <RevenueProjections />
    }
  ];
};
