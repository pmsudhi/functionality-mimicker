# What-if Analysis API Integration

This document outlines the API integration requirements for the What-if Analysis component.

## Overview

The What-if Analysis component allows users to simulate different scenarios and analyze their potential impact on various business metrics. It includes features for scenario comparison, sensitivity analysis, and impact assessment.

## API Endpoints

### 1. What-if Analysis

```typescript
POST /api/v1/what-if/analyze
```

**Request**:
```typescript
interface WhatIfAnalysisRequest {
  scenario_id: string;
  parameters: {
    variables: {
      name: string;
      current_value: number;
      new_value: number;
      unit: string;
    }[];
    time_frame: 'daily' | 'weekly' | 'monthly' | 'yearly';
    include_secondary_effects: boolean;
  };
}
```

**Response**:
```typescript
interface WhatIfAnalysis {
  primary_impact: {
    metric: string;
    current_value: number;
    projected_value: number;
    change: number;
    percentage_change: number;
  }[];
  secondary_effects: {
    metric: string;
    impact: number;
    confidence: number;
    description: string;
  }[];
  summary: {
    overall_impact: number;
    risk_level: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
}
```

### 2. Sensitivity Analysis

```typescript
POST /api/v1/what-if/sensitivity
```

**Request**:
```typescript
interface SensitivityAnalysisRequest {
  scenario_id: string;
  parameters: {
    target_metric: string;
    variables: string[];
    range: {
      min: number;
      max: number;
      steps: number;
    };
  };
}
```

**Response**:
```typescript
interface SensitivityAnalysis {
  results: {
    variable: string;
    impact_curve: {
      value: number;
      impact: number;
    }[];
    sensitivity_score: number;
    threshold_points: {
      value: number;
      description: string;
    }[];
  }[];
  summary: {
    most_sensitive: string;
    least_sensitive: string;
    critical_thresholds: {
      variable: string;
      threshold: number;
      impact: string;
    }[];
  };
}
```

### 3. Scenario Comparison

```typescript
POST /api/v1/what-if/compare
```

**Request**:
```typescript
interface ScenarioComparisonRequest {
  base_scenario_id: string;
  comparison_scenarios: {
    id: string;
    name: string;
    changes: {
      variable: string;
      value: number;
    }[];
  }[];
}
```

**Response**:
```typescript
interface ScenarioComparison {
  comparisons: {
    scenario_id: string;
    name: string;
    metrics: {
      name: string;
      base_value: number;
      comparison_value: number;
      difference: number;
      percentage_change: number;
    }[];
    summary: {
      overall_impact: number;
      key_differences: string[];
      recommendations: string[];
    };
  }[];
  analysis: {
    best_scenario: string;
    worst_scenario: string;
    trade_offs: {
      scenario: string;
      pros: string[];
      cons: string[];
    }[];
  };
}
```

### 4. Impact Assessment

```typescript
GET /api/v1/what-if/impact/{scenario_id}
```

**Response**:
```typescript
interface ImpactAssessment {
  financial_impact: {
    revenue: number;
    costs: number;
    profit: number;
    roi: number;
  };
  operational_impact: {
    efficiency: number;
    capacity: number;
    quality: number;
  };
  risk_assessment: {
    level: 'low' | 'medium' | 'high';
    factors: {
      name: string;
      probability: number;
      impact: number;
      mitigation: string[];
    }[];
  };
}
```

## Component Integration

### 1. What-if Analysis

```typescript
// Example usage
const WhatIfAnalysis = () => {
  const [parameters, setParameters] = useState({
    variables: [
      {
        name: 'staff_count',
        current_value: 20,
        new_value: 25,
        unit: 'people'
      },
      {
        name: 'average_check',
        current_value: 50,
        new_value: 55,
        unit: 'currency'
      }
    ],
    time_frame: 'monthly',
    include_secondary_effects: true
  });

  const { data, isLoading } = useQuery(
    ['what-if-analysis', parameters],
    () => fetch('/api/v1/what-if/analyze', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters
      })
    })
  );

  return (
    <div>
      <VariableControls
        variables={parameters.variables}
        onChange={setParameters}
      />
      <ImpactChart data={data?.primary_impact} />
      <SecondaryEffects data={data?.secondary_effects} />
      <AnalysisSummary summary={data?.summary} />
    </div>
  );
};
```

### 2. Sensitivity Analysis

```typescript
// Example usage
const SensitivityAnalysis = () => {
  const [parameters, setParameters] = useState({
    target_metric: 'profit',
    variables: ['staff_count', 'average_check', 'occupancy_rate'],
    range: {
      min: -20,
      max: 20,
      steps: 10
    }
  });

  const { data, isLoading } = useQuery(
    ['sensitivity-analysis', parameters],
    () => fetch('/api/v1/what-if/sensitivity', {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: currentScenario,
        parameters
      })
    })
  );

  return (
    <div>
      <SensitivityControls
        parameters={parameters}
        onChange={setParameters}
      />
      <SensitivityChart data={data?.results} />
      <SensitivitySummary summary={data?.summary} />
    </div>
  );
};
```

### 3. Scenario Comparison

```typescript
// Example usage
const ScenarioComparison = () => {
  const [scenarios, setScenarios] = useState([
    {
      id: 'scenario1',
      name: 'Increased Staffing',
      changes: [
        { variable: 'staff_count', value: 25 }
      ]
    },
    {
      id: 'scenario2',
      name: 'Higher Prices',
      changes: [
        { variable: 'average_check', value: 60 }
      ]
    }
  ]);

  const { data, isLoading } = useQuery(
    ['scenario-comparison', scenarios],
    () => fetch('/api/v1/what-if/compare', {
      method: 'POST',
      body: JSON.stringify({
        base_scenario_id: currentScenario,
        comparison_scenarios: scenarios
      })
    })
  );

  return (
    <div>
      <ScenarioControls
        scenarios={scenarios}
        onChange={setScenarios}
      />
      <ComparisonTable data={data?.comparisons} />
      <ComparisonAnalysis analysis={data?.analysis} />
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

1. Cache what-if analysis for 5 minutes
2. Cache sensitivity analysis for 10 minutes
3. Cache scenario comparisons for 5 minutes
4. Cache impact assessments for 10 minutes

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