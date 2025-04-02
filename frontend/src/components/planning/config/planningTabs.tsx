
import { 
  LayoutPanelLeft, PieChart, Users, DollarSign, 
  BarChartHorizontal, TrendingUp, BarChart3, LineChart,
  LucideIcon 
} from 'lucide-react';
import { ReactNode } from 'react';
import {
  GanttView,
  TeamView,
  CapacityView,
  EfficiencyMetrics,
  ScenarioBuilder,
  ScenarioComparison,
  FinancialImpact,
  PeakHourAnalysis,
  RevenueProjections
} from '../components';

export interface PlanningTab {
  value: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
}

export const getPlanningTabs = (): PlanningTab[] => {
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
