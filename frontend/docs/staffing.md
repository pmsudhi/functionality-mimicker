# Staffing API Integration

This document outlines the API integration requirements for the Staffing management component.

## Overview

The Staffing component allows users to manage staff positions, calculate staffing requirements, and optimize workforce allocation. It includes features for position management, staffing calculations, and cost analysis.

## API Endpoints

### 1. List Staff Positions

```typescript
GET /api/v1/staffing/positions
```

**Response**:
```typescript
interface StaffPosition {
  id: string;
  name: string;
  department: 'FOH' | 'BOH';
  qualifications: string[];
  base_salary_range: {
    min: number;
    max: number;
  };
  responsibilities: string[];
  created_at: string;
  updated_at: string;
}
```

### 2. Get Staffing Requirements

```typescript
GET /api/v1/staffing/requirements
Query Parameters:
- scenario_id: string
```

**Response**:
```typescript
interface StaffingRequirement {
  id: string;
  scenario_id: string;
  position_id: string;
  required_count: number;
  shift_types: string[];
  special_considerations: string[];
  created_at: string;
  updated_at: string;
}
```

### 3. Get Staffing Calculations

```typescript
GET /api/v1/staffing/calculations
Query Parameters:
- scenario_id: string
```

**Response**:
```typescript
interface StaffingCalculation {
  id: string;
  scenario_id: string;
  total_staff: number;
  foh_count: number;
  boh_count: number;
  foh_boh_ratio: number;
  total_cost: number;
  cost_per_staff: number;
  efficiency_ratio: number;
  created_at: string;
  updated_at: string;
}
```

### 4. Optimize Staffing

```typescript
POST /api/v1/staffing/optimize
```

**Request**:
```typescript
interface StaffingOptimizationRequest {
  scenario_id: string;
  optimization_params: {
    target_efficiency: number;
    budget_constraints: {
      max_budget: number;
      priority: 'cost' | 'efficiency' | 'balance';
    };
    skill_requirements: {
      position_id: string;
      min_count: number;
    }[];
    shift_preferences: {
      shift_type: string;
      preferred_hours: string[];
    }[];
  };
}
```

**Response**:
```typescript
interface StaffingResponse {
  scenario_id: string;
  calculations: {
    total_staff: number;
    foh_staff: {
      position: string;
      count: number;
      cost: number;
    }[];
    boh_staff: {
      position: string;
      count: number;
      cost: number;
    }[];
    total_cost: number;
    efficiency_ratio: number;
  };
  optimization_params: {
    target_efficiency: number;
    budget_constraints: {
      max_budget: number;
      priority: 'cost' | 'efficiency' | 'balance';
    };
    skill_requirements: {
      position_id: string;
      min_count: number;
    }[];
    shift_preferences: {
      shift_type: string;
      preferred_hours: string[];
    }[];
  };
}
```

### 5. Calculate Staffing Requirements

```typescript
POST /api/v1/calculations/staffing
```

**Request**:
```typescript
interface StaffingParams {
  spaceParameters: {
    total_area: number;
    seating_capacity: number;
    kitchen_area: number;
    storage_area: number;
  };
  serviceParameters: {
    service_style: string;
    table_turnover: number;
    covers_per_waiter: number;
    kitchen_stations: number;
  };
  operationalHours: {
    operating_hours: {
      start: string;
      end: string;
    };
    peak_hours: string[];
    break_time: number;
    shift_length: number;
  };
}
```

**Response**:
```typescript
interface StaffingResult {
  total_staff: number;
  foh_staff: number;
  boh_staff: number;
  labor_cost: number;
  staffing_structure: {
    foh_ratio: number;
    boh_ratio: number;
    positions: {
      position: string;
      count: number;
      cost: number;
    }[];
  };
  recommendations: string[];
}
```

## Component Integration

### 1. Staffing Overview

```typescript
// Example usage
const StaffingOverview = () => {
  const { data: positions, isLoading: positionsLoading } = useQuery(
    'staff-positions',
    () => fetch('/api/v1/staffing/positions')
  );

  const { data: calculations, isLoading: calculationsLoading } = useQuery(
    ['staffing-calculations', currentScenario],
    () => fetch(`/api/v1/staffing/calculations?scenario_id=${currentScenario}`)
  );

  return (
    <div>
      <StaffingMetricCards calculations={calculations} />
      <StaffDistributionChart positions={positions} />
      <StaffingRecommendations recommendations={calculations?.recommendations} />
    </div>
  );
};
```

### 2. Positions Management

```typescript
// Example usage
const PositionsManagement = () => {
  const { data, isLoading } = useQuery(
    'staff-positions',
    () => fetch('/api/v1/staffing/positions')
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Qualifications</TableHead>
            <TableHead>Salary Range</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(position => (
            <TableRow key={position.id}>
              <TableCell>{position.name}</TableCell>
              <TableCell>{position.department}</TableCell>
              <TableCell>{position.qualifications.join(', ')}</TableCell>
              <TableCell>
                ${position.base_salary_range.min} - ${position.base_salary_range.max}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
```

### 3. Cost Analysis

```typescript
// Example usage
const CostAnalysis = () => {
  const { data, isLoading } = useQuery(
    ['staffing-calculations', currentScenario],
    () => fetch(`/api/v1/staffing/calculations?scenario_id=${currentScenario}`)
  );

  const optimizeStaffing = useMutation(
    (params: StaffingOptimizationRequest) => 
      fetch('/api/v1/staffing/optimize', {
        method: 'POST',
        body: JSON.stringify(params)
      })
  );

  const handleOptimize = () => {
    optimizeStaffing.mutate({
      scenario_id: currentScenario,
      optimization_params: {
        target_efficiency: 0.85,
        budget_constraints: {
          max_budget: 50000,
          priority: 'balance'
        },
        skill_requirements: [
          { position_id: 'server', min_count: 5 },
          { position_id: 'kitchen', min_count: 3 }
        ],
        shift_preferences: [
          { shift_type: 'morning', preferred_hours: ['08:00', '16:00'] },
          { shift_type: 'evening', preferred_hours: ['16:00', '00:00'] }
        ]
      }
    });
  };

  return (
    <div>
      <CostBreakdownChart data={data} />
      <OptimizationControls onOptimize={handleOptimize} />
      <OptimizationResults data={optimizeStaffing.data} />
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

1. Cache staff positions for 1 hour
2. Cache staffing calculations for 5 minutes
3. Cache optimization results for 2 minutes
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