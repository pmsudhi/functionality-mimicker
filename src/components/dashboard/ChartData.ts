
// Sample data for charts and metrics
export const staffDistribution = [
  { name: "Kitchen Staff", value: 40, color: "#22c55e" },
  { name: "Service Staff", value: 29, color: "#3b82f6" },
  { name: "Management", value: 11, color: "#8b5cf6" },
  { name: "Cleaning", value: 13, color: "#a855f7" },
  { name: "Security", value: 7, color: "#ec4899" }
];

export const laborCostTrend = [
  { month: "Jan", revenue: 100000, laborCost: 28000, laborPercentage: 28 },
  { month: "Feb", revenue: 110000, laborCost: 29500, laborPercentage: 26.8 },
  { month: "Mar", revenue: 115000, laborCost: 30000, laborPercentage: 26.1 },
  { month: "Apr", revenue: 120000, laborCost: 31000, laborPercentage: 25.8 },
  { month: "May", revenue: 125000, laborCost: 32500, laborPercentage: 26 },
  { month: "Jun", revenue: 135000, laborCost: 33000, laborPercentage: 24.4 },
  { month: "Jul", revenue: 130000, laborCost: 32000, laborPercentage: 24.6 },
  { month: "Aug", revenue: 125000, laborCost: 31000, laborPercentage: 24.8 },
  { month: "Sep", revenue: 120000, laborCost: 30000, laborPercentage: 25 },
  { month: "Oct", revenue: 125000, laborCost: 31000, laborPercentage: 24.8 },
  { month: "Nov", revenue: 130000, laborCost: 32000, laborPercentage: 24.6 },
  { month: "Dec", revenue: 140000, laborCost: 35000, laborPercentage: 25 }
];

export const revenueTrend = [
  { month: "Jan", actual: 2400000, projected: 2350000 },
  { month: "Feb", actual: 2450000, projected: 2400000 },
  { month: "Mar", actual: 2500000, projected: 2450000 },
  { month: "Apr", actual: 2550000, projected: 2500000 },
  { month: "May", actual: 2600000, projected: 2550000 },
  { month: "Jun", actual: 2700000, projected: 2600000 },
  { month: "Jul", actual: 2650000, projected: 2700000 },
  { month: "Aug", actual: 2600000, projected: 2650000 },
  { month: "Sep", actual: 2550000, projected: 2600000 },
  { month: "Oct", actual: 2600000, projected: 2550000 },
  { month: "Nov", actual: 2650000, projected: 2600000 },
  { month: "Dec", actual: 2800000, projected: 2700000 }
];

export const revenueByOutlet = [
  { name: "Mall of Dhahran", value: 25, color: "#10b981" },
  { name: "Riyadh Park", value: 22, color: "#3b82f6" },
  { name: "Jeddah Corniche", value: 20, color: "#8b5cf6" },
  { name: "Al Nakheel Mall", value: 17, color: "#6366f1" },
  { name: "Red Sea Mall", value: 16, color: "#ec4899" }
];

export const laborCostByPosition = [
  { position: "Servers", cost: 120000, color: "#10b981" },
  { position: "Chefs", cost: 90000, color: "#3b82f6" },
  { position: "Line Cooks", cost: 100000, color: "#8b5cf6" },
  { position: "Managers", cost: 70000, color: "#6366f1" },
  { position: "Hosts", cost: 50000, color: "#ec4899" },
  { position: "Bartenders", cost: 40000, color: "#f59e0b" },
  { position: "Dishwashers", cost: 60000, color: "#ef4444" },
  { position: "Others", cost: 70000, color: "#64748b" }
];

export const benchmarkData = [
  { metric: "Covers per Labor Hour", current: 4.7, industry: 5.5 },
  { metric: "Revenue per Labor Hour", current: 600, industry: 650 },
  { metric: "Labor Utilization", current: 80, industry: 85 },
  { metric: "Turnover Time", current: 75, industry: 65 },
  { metric: "Staff Retention", current: 70, industry: 75 },
  { metric: "Customer Satisfaction", current: 88, industry: 90 }
];

export const radarData = [
  { subject: 'Covers per Labor Hour', A: 4.7, B: 5.5, fullMark: 7 },
  { subject: 'Revenue per Labor Hour', A: 600, B: 650, fullMark: 800 },
  { subject: 'Labor Utilization', A: 80, B: 85, fullMark: 100 },
  { subject: 'Turnover Time', A: 75, B: 65, fullMark: 100 },
  { subject: 'Staff Retention', A: 70, B: 75, fullMark: 100 },
  { subject: 'Customer Satisfaction', A: 88, B: 90, fullMark: 100 },
];

export const outletComparison = [
  { name: "Mall of Dhahran", covers: 4.7 },
  { name: "Riyadh Park", covers: 4.5 },
  { name: "Al Nakheel Mall", covers: 4.3 },
  { name: "Red Sea Mall", covers: 4.1 }
];

export const staffBreakdown = {
  foh: [
    { position: "Servers", count: 42, color: "#10b981" },
    { position: "Hosts/Hostesses", count: 12, color: "#3b82f6" },
    { position: "Bartenders", count: 8, color: "#8b5cf6" },
    { position: "Cashiers", count: 10, color: "#6366f1" },
    { position: "Managers", count: 8, color: "#ec4899" }
  ],
  boh: [
    { position: "Chefs", count: 18, color: "#f59e0b" },
    { position: "Line Cooks", count: 36, color: "#ef4444" },
    { position: "Prep Cooks", count: 24, color: "#64748b" },
    { position: "Dishwashers", count: 20, color: "#14b8a6" },
    { position: "Kitchen Managers", count: 10, color: "#5eead4" }
  ]
};

export const monthlyLaborCostData = [
  { month: "Jan", laborCost: 215000, target: 200000 },
  { month: "Feb", laborCost: 225000, target: 205000 },
  { month: "Mar", laborCost: 230000, target: 210000 },
  { month: "Apr", laborCost: 240000, target: 215000 },
  { month: "May", laborCost: 245000, target: 220000 },
  { month: "Jun", laborCost: 250000, target: 225000 },
  { month: "Jul", laborCost: 255000, target: 230000 },
  { month: "Aug", laborCost: 245000, target: 235000 },
  { month: "Sep", laborCost: 235000, target: 230000 },
  { month: "Oct", laborCost: 240000, target: 220000 },
  { month: "Nov", laborCost: 248000, target: 225000 },
  { month: "Dec", laborCost: 260000, target: 240000 }
];

export const efficiencyScoresByOutlet = [
  { name: "Mall of Dhahran", score: 87 },
  { name: "Riyadh Park", score: 82 },
  { name: "Jeddah Corniche", score: 79 },
  { name: "Al Nakheel Mall", score: 75 },
  { name: "Red Sea Mall", score: 81 }
];
