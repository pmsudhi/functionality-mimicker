# Peak Hour Analysis API Integration

This document outlines the API integration requirements for the Peak Hour Analysis component.

## Overview

The Peak Hour Analysis component provides tools for analyzing and optimizing staffing during peak hours. It includes features for demand forecasting, staffing optimization, and efficiency analysis.

## API Endpoints

### 1. Peak Hour Analysis

```typescript
POST /api/v1/peak-hours/analyze
```

**Request**:
```typescript
interface PeakHourAnalysisRequest {
  scenario_id: string;
  parameters: {
    operating_hours: {
      start: string;
      end: string;
    };
    days: string[];
    seasonality: boolean;
    special_events: boolean;
    historical_data: boolean;
  };
}
```

**Response**:
```typescript
interface PeakHourAnalysis {
  peak_periods: {
    day: string;
    hour: string;
    demand: number;
    current_staffing: number;
    recommended_staffing: number;
    efficiency_score: number;
  }[];
  summary: {
    total_peak_hours: number;
    average_demand: number;
    staffing_gap: number;
    optimization_potential: number;
  };
}
```

### 2. Demand Forecasting

```typescript
POST /api/v1/peak-hours/forecast
```

**Request**:
```typescript
interface DemandForecastRequest {
  scenario_id: string;
  parameters: {
    time_frame: 'daily' | 'weekly' | 'monthly';
    include_weather: boolean;
    include_events: boolean;
    include_seasonality: boolean;
  };
}
```

**Response**:
```typescript
interface DemandForecast {
  forecasts: {
    period: string;
    predicted_demand: number;
    confidence_interval: {
      lower: number;
      upper: number;
    };
    factors: {
      name: string;
      impact: number;
    }[];
  }[];
  metrics: {
    accuracy: number;
    mean_absolute_error: number;
    root_mean_squared_error: number;
  };
}
```

### 3. Staffing Optimization

```typescript
POST /api/v1/peak-hours/optimize
```

**Request**:
```typescript
interface StaffingOptimizationRequest {
  scenario_id: string;
  parameters: {
    constraints: {
      min_staff: number;
      max_staff: number;
      break_time: number;
      shift_length: number;
    };
    preferences: {
      preferred_shifts: string[];
      skill_requirements: {
        role: string;
        min_count: number;
      }[];
    };
  };
}
```

**Response**:
```typescript
interface StaffingOptimization {
  schedule: {
    day: string;
    hour: string;
    staff: {
      role: string;
      count: number;
      efficiency: number;
    }[];
  }[];
  metrics: {
    coverage_score: number;
    efficiency_score: number;
    cost_score: number;
    overall_score: number;
  };
}
```

### 4. Efficiency Analysis

```typescript
GET /api/v1/peak-hours/efficiency/{scenario_id}
```

**Response**:
```typescript
interface EfficiencyAnalysis {
  current_efficiency: {
    overall: number;
    by_role: {
      role: string;
      score: number;
      factors: {
        name: string;
        impact: number;
      }[];
    }[];
  };
  optimization_opportunities: {
    area: string;
    current_score: number;
    potential_score: number;
    recommendations: string[];
  }[];
}
```

## Component Integration

### 1. Peak Hour Analysis

```typescript
// Example usage
const PeakHourAnalysis = () => {
  const [parameters, setParameters] = useState({
    operating_hours: {
      start: '09:00',
      end: '22:00'
    },
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    seasonality: true,
    special_events: true,
    historical_data: true
  });

  const { data, isLoading } = useQuery(
    ['peak-hours-analysis', parameters],
    () => fetch('/api/v1/peak-hours/analyze', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters
      })
    })
  );

  return (
    <div>
      <ParameterControls
        parameters={parameters}
        onChange={setParameters}
      />
      <PeakHourChart data={data?.peak_periods} />
      <AnalysisSummary summary={data?.summary} />
    </div>
  );
};
```

### 2. Demand Forecasting

```typescript
// Example usage
const DemandForecasting = () => {
  const [parameters, setParameters] = useState({
    time_frame: 'daily',
    include_weather: true,
    include_events: true,
    include_seasonality: true
  });

  const { data, isLoading } = useQuery(
    ['demand-forecast', parameters],
    () => fetch('/api/v1/peak-hours/forecast', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters
      })
    })
  );

  return (
    <div>
      <ForecastControls
        parameters={parameters}
        onChange={setParameters}
      />
      <ForecastChart data={data?.forecasts} />
      <ForecastMetrics metrics={data?.metrics} />
    </div>
  );
};
```

### 3. Staffing Optimization

```typescript
// Example usage
const StaffingOptimization = () => {
  const [parameters, setParameters] = useState({
    constraints: {
      min_staff: 5,
      max_staff: 20,
      break_time: 30,
      shift_length: 8
    },
    preferences: {
      preferred_shifts: ['Morning', 'Evening'],
      skill_requirements: [
        { role: 'Server', min_count: 3 },
        { role: 'Kitchen', min_count: 2 }
      ]
    }
  });

  const { data, isLoading } = useQuery(
    ['staffing-optimization', parameters],
    () => fetch('/api/v1/peak-hours/optimize', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters
      })
    })
  );

  return (
    <div>
      <OptimizationControls
        parameters={parameters}
        onChange={setParameters}
      />
      <ScheduleGrid data={data?.schedule} />
      <OptimizationMetrics metrics={data?.metrics} />
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

1. Cache peak hour analysis for 5 minutes
2. Cache demand forecasts for 15 minutes
3. Cache staffing optimization for 5 minutes
4. Cache efficiency analysis for 10 minutes

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