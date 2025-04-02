# Financial Analysis API Integration

This document outlines the API integration requirements for the Financial Analysis component.

## Overview

The Financial Analysis component provides tools for analyzing revenue projections, labor costs, profitability, and other financial metrics. It includes features for scenario-based financial analysis and comparison.

## API Endpoints

### 1. Revenue Projections

```typescript
POST /api/v1/financial/revenue-projections
```

**Request**:
```typescript
interface RevenueProjectionRequest {
  scenario_id: string;
  parameters: {
    average_check: number;
    seating_capacity: number;
    turnover_rate: number;
    occupancy_rate: number;
    include_seasonality: boolean;
    time_frame: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
}
```

**Response**:
```typescript
interface RevenueProjection {
  projections: {
    period: string;
    baseline: number;
    projected: number;
    growth: number;
  }[];
  summary: {
    total_baseline: number;
    total_projected: number;
    growth_rate: number;
    peak_period: string;
    low_period: string;
  };
}
```

### 2. Labor Cost Analysis

```typescript
POST /api/v1/financial/labor-costs
```

**Request**:
```typescript
interface LaborCostRequest {
  scenario_id: string;
  parameters: {
    staff_levels: {
      role: string;
      count: number;
      hourly_rate: number;
    }[];
    operating_hours: number;
    days_per_week: number;
    weeks_per_year: number;
  };
}
```

**Response**:
```typescript
interface LaborCostAnalysis {
  total_cost: number;
  cost_breakdown: {
    role: string;
    count: number;
    annual_cost: number;
    percentage: number;
  }[];
  metrics: {
    labor_cost_percentage: number;
    cost_per_cover: number;
    efficiency_score: number;
  };
}
```

### 3. Profit/Loss Analysis

```typescript
POST /api/v1/financial/profit-loss
```

**Request**:
```typescript
interface ProfitLossRequest {
  scenario_id: string;
  parameters: {
    revenue: number;
    labor_costs: number;
    other_costs: {
      category: string;
      amount: number;
    }[];
  };
}
```

**Response**:
```typescript
interface ProfitLossAnalysis {
  summary: {
    total_revenue: number;
    total_costs: number;
    net_profit: number;
    profit_margin: number;
  };
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  trends: {
    period: string;
    revenue: number;
    costs: number;
    profit: number;
  }[];
}
```

### 4. Financial Metrics

```typescript
GET /api/v1/financial/metrics/{scenario_id}
```

**Response**:
```typescript
interface FinancialMetrics {
  revenue_metrics: {
    average_check: number;
    covers_per_day: number;
    revenue_per_seat: number;
  };
  cost_metrics: {
    labor_cost_percentage: number;
    cost_per_cover: number;
    overhead_percentage: number;
  };
  profitability_metrics: {
    gross_profit_margin: number;
    net_profit_margin: number;
    return_on_investment: number;
  };
}
```

## Component Integration

### 1. Revenue Projections

```typescript
// Example usage
const RevenueProjections = () => {
  const [parameters, setParameters] = useState({
    average_check: 135,
    seating_capacity: 150,
    turnover_rate: 3.0,
    occupancy_rate: 73,
    include_seasonality: true,
    time_frame: 'monthly'
  });

  const { data, isLoading } = useQuery(
    ['revenue-projections', parameters],
    () => fetch('/api/v1/financial/revenue-projections', {
      method: 'POST',
      body: JSON.stringify({ scenario_id: currentScenario, parameters })
    })
  );

  return (
    <div>
      <ParameterControls
        parameters={parameters}
        onChange={setParameters}
      />
      <RevenueChart data={data?.projections} />
      <MetricsSummary summary={data?.summary} />
    </div>
  );
};
```

### 2. Labor Cost Analysis

```typescript
// Example usage
const LaborCostAnalysis = () => {
  const [staffLevels, setStaffLevels] = useState([
    { role: 'Server', count: 10, hourly_rate: 15 },
    { role: 'Kitchen', count: 8, hourly_rate: 18 }
  ]);

  const { data, isLoading } = useQuery(
    ['labor-costs', staffLevels],
    () => fetch('/api/v1/financial/labor-costs', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters: {
          staff_levels: staffLevels,
          operating_hours: 12,
          days_per_week: 7,
          weeks_per_year: 52
        }
      })
    })
  );

  return (
    <div>
      <StaffLevelControls
        staffLevels={staffLevels}
        onChange={setStaffLevels}
      />
      <CostBreakdown data={data?.cost_breakdown} />
      <EfficiencyMetrics metrics={data?.metrics} />
    </div>
  );
};
```

### 3. Profit/Loss Analysis

```typescript
// Example usage
const ProfitLossAnalysis = () => {
  const { data, isLoading } = useQuery(
    ['profit-loss', currentScenario],
    () => fetch(`/api/v1/financial/profit-loss`, {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters: {
          revenue: 1000000,
          labor_costs: 300000,
          other_costs: [
            { category: 'Rent', amount: 50000 },
            { category: 'Utilities', amount: 25000 }
          ]
        }
      })
    })
  );

  return (
    <div>
      <ProfitSummary summary={data?.summary} />
      <CostBreakdown data={data?.breakdown} />
      <TrendChart data={data?.trends} />
    </div>
  );
};
```

## Error Handling

1. Handle API errors with proper error messages
2. Implement retry mechanisms for failed requests
3. Show appropriate error states in UI
4. Handle validation errors

## Loading States

1. Show loading skeletons while data is being fetched
2. Implement progressive loading for large datasets
3. Show loading indicators for actions
4. Handle partial loading states

## Caching Strategy

1. Cache revenue projections for 5 minutes
2. Cache labor cost analysis for 5 minutes
3. Cache profit/loss analysis for 5 minutes
4. Cache financial metrics for 10 minutes

## Best Practices

1. Use TypeScript interfaces for type safety
2. Implement proper error handling
3. Use proper loading states
4. Implement proper data validation
5. Use proper caching strategies
6. Follow proper security practices
7. Implement proper retry mechanisms
8. Use proper error boundaries
9. Follow proper UI/UX practices
10. Implement proper data fetching patterns 