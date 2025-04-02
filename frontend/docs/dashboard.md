# Dashboard API Integration

This document outlines the API integration requirements for the Dashboard component.

## Overview

The Dashboard displays key performance metrics, recent scenarios, and quick access to various planning tools. It requires data from multiple endpoints to populate different sections.

## API Endpoints

### 1. Performance Overview

```typescript
GET /api/v1/dashboard/performance
```

**Response**:
```typescript
interface PerformanceMetrics {
  revenue: {
    current: number;
    target: number;
    trend: number;
  };
  staffing: {
    current: number;
    optimal: number;
    efficiency: number;
  };
  occupancy: {
    current: number;
    peak: number;
    average: number;
  };
  profitability: {
    current: number;
    target: number;
    margin: number;
  };
}
```

### 2. Recent Scenarios

```typescript
GET /api/v1/scenarios/recent
Query Parameters:
- limit: number (default: 5)
```

**Response**:
```typescript
interface RecentScenario {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'active' | 'archived';
  metrics: {
    revenue: number;
    staffing: number;
    efficiency: number;
  };
}
```

### 3. Quick Actions

```typescript
POST /api/v1/scenarios/quick-create
```

**Request**:
```typescript
interface QuickScenarioCreate {
  name: string;
  type: 'staffing' | 'financial' | 'peak-hours';
  parameters: {
    // Type-specific parameters
  };
}
```

### 4. Brand/Outlet Selection

```typescript
GET /api/v1/brands
GET /api/v1/outlets?brand_id={brandId}
```

## Component Integration

### 1. Performance Cards

```typescript
// Example usage
const PerformanceCards = () => {
  const { data, isLoading, error } = useQuery('performance', 
    () => fetch('/api/v1/dashboard/performance')
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        title="Revenue"
        value={data.revenue.current}
        target={data.revenue.target}
        trend={data.revenue.trend}
      />
      {/* Other metric cards */}
    </div>
  );
};
```

### 2. Recent Scenarios List

```typescript
// Example usage
const RecentScenarios = () => {
  const { data, isLoading } = useQuery('recent-scenarios',
    () => fetch('/api/v1/scenarios/recent?limit=5')
  );

  return (
    <Table>
      {data?.map(scenario => (
        <TableRow key={scenario.id}>
          <TableCell>{scenario.name}</TableCell>
          <TableCell>{formatDate(scenario.created_at)}</TableCell>
          <TableCell>{scenario.status}</TableCell>
          <TableCell>
            <MetricBadge value={scenario.metrics.efficiency} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};
```

### 3. Quick Actions

```typescript
// Example usage
const QuickActions = () => {
  const createScenario = useMutation(
    (data: QuickScenarioCreate) => 
      fetch('/api/v1/scenarios/quick-create', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  );

  const handleQuickCreate = (type: string) => {
    createScenario.mutate({
      name: `Quick ${type} Scenario`,
      type,
      parameters: getDefaultParameters(type)
    });
  };

  return (
    <div className="flex gap-4">
      <Button onClick={() => handleQuickCreate('staffing')}>
        New Staffing Plan
      </Button>
      {/* Other quick action buttons */}
    </div>
  );
};
```

## Error Handling

1. Implement proper error boundaries
2. Show appropriate error messages
3. Provide retry mechanisms
4. Handle network errors gracefully

## Loading States

1. Show loading skeletons
2. Implement progressive loading
3. Handle partial data loading
4. Show appropriate loading indicators

## Caching Strategy

1. Cache performance metrics for 5 minutes
2. Cache recent scenarios for 1 minute
3. Implement stale-while-revalidate pattern
4. Use proper cache invalidation

## Best Practices

1. Implement proper TypeScript interfaces
2. Use proper error handling
3. Implement proper loading states
4. Use proper data fetching patterns
5. Implement proper caching
6. Follow proper security practices
7. Implement proper retry mechanisms
8. Use proper error boundaries
9. Implement proper data validation
10. Follow proper UI/UX practices 