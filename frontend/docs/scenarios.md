# Scenarios API Integration

This document outlines the API integration requirements for the Scenarios management component.

## Overview

The Scenarios component allows users to create, view, edit, and compare different planning scenarios. It includes features for scenario management, comparison, and analysis.

## API Endpoints

### 1. List Scenarios

```typescript
GET /api/v1/scenarios
Query Parameters:
- page: number
- size: number
- sort_by: string
- sort_order: 'asc' | 'desc'
- status: 'draft' | 'active' | 'archived'
- type: 'staffing' | 'financial' | 'peak-hours'
```

**Response**:
```typescript
interface ScenarioList {
  items: Scenario[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

interface Scenario {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  parameters: ScenarioParameters;
  metrics: ScenarioMetrics;
}
```

### 2. Get Scenario Details

```typescript
GET /api/v1/scenarios/{scenario_id}
```

**Response**:
```typescript
interface ScenarioDetails extends Scenario {
  history: ScenarioHistory[];
  comparisons: ScenarioComparison[];
  notes: string;
  tags: string[];
}
```

### 3. Create Scenario

```typescript
POST /api/v1/scenarios
```

**Request**:
```typescript
interface ScenarioCreate {
  name: string;
  type: string;
  parameters: ScenarioParameters;
  notes?: string;
  tags?: string[];
}
```

### 4. Update Scenario

```typescript
PUT /api/v1/scenarios/{scenario_id}
```

**Request**:
```typescript
interface ScenarioUpdate {
  name?: string;
  parameters?: ScenarioParameters;
  notes?: string;
  tags?: string[];
  status?: string;
}
```

### 5. Delete Scenario

```typescript
DELETE /api/v1/scenarios/{scenario_id}
```

### 6. Compare Scenarios

```typescript
POST /api/v1/scenarios/compare
```

**Request**:
```typescript
interface ScenarioComparisonRequest {
  base_scenario_id: string;
  comparison_scenario_id: string;
  metrics: string[];
}
```

**Response**:
```typescript
interface ScenarioComparison {
  base_scenario: Scenario;
  comparison_scenario: Scenario;
  differences: {
    metric: string;
    base_value: number;
    comparison_value: number;
    difference: number;
    percentage_change: number;
  }[];
  summary: {
    total_difference: number;
    improvement_areas: string[];
    risk_areas: string[];
  };
}
```

## Component Integration

### 1. Scenario List

```typescript
// Example usage
const ScenarioList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    status: 'active',
    type: 'all'
  });

  const { data, isLoading } = useQuery(
    ['scenarios', filters],
    () => fetch(`/api/v1/scenarios?${new URLSearchParams(filters)}`)
  );

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <Table>
        {data?.items.map(scenario => (
          <ScenarioRow key={scenario.id} scenario={scenario} />
        ))}
      </Table>
      <Pagination
        current={data?.page}
        total={data?.total_pages}
        onChange={page => setFilters(prev => ({ ...prev, page }))}
      />
    </div>
  );
};
```

### 2. Scenario Details

```typescript
// Example usage
const ScenarioDetails = ({ scenarioId }: { scenarioId: string }) => {
  const { data, isLoading } = useQuery(
    ['scenario', scenarioId],
    () => fetch(`/api/v1/scenarios/${scenarioId}`)
  );

  return (
    <div>
      <ScenarioHeader scenario={data} />
      <Tabs>
        <TabsList>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="parameters">
          <ScenarioParameters parameters={data?.parameters} />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </div>
  );
};
```

### 3. Scenario Comparison

```typescript
// Example usage
const ScenarioComparison = () => {
  const [selectedScenarios, setSelectedScenarios] = useState({
    base: '',
    comparison: ''
  });

  const { data, isLoading } = useQuery(
    ['scenario-comparison', selectedScenarios],
    () => fetch('/api/v1/scenarios/compare', {
      method: 'POST',
      body: JSON.stringify(selectedScenarios)
    }),
    { enabled: !!selectedScenarios.base && !!selectedScenarios.comparison }
  );

  return (
    <div>
      <ScenarioSelector
        baseScenario={selectedScenarios.base}
        comparisonScenario={selectedScenarios.comparison}
        onChange={setSelectedScenarios}
      />
      {data && (
        <ComparisonResults
          differences={data.differences}
          summary={data.summary}
        />
      )}
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

1. Cache scenario list for 1 minute
2. Cache scenario details for 5 minutes
3. Cache comparison results for 2 minutes
4. Implement proper cache invalidation

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