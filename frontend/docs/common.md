# Common API Integration

This document outlines the common API endpoints and utilities used across the frontend application.

## Overview

The common API endpoints provide shared functionality used by multiple components, including authentication, filtering, parameter management, and utility functions.

## API Endpoints

### 1. Authentication

```typescript
POST /api/v1/auth/login
```

**Request**:
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

**Response**:
```typescript
interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
}
```

```typescript
POST /api/v1/auth/refresh
```

**Request**:
```typescript
interface RefreshRequest {
  refresh_token: string;
}
```

**Response**:
```typescript
interface RefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
```

### 2. Filters and Parameters

```typescript
GET /api/v1/common/filters
```

**Response**:
```typescript
interface CommonFilters {
  brands: {
    id: string;
    name: string;
  }[];
  outlets: {
    id: string;
    name: string;
    brand_id: string;
  }[];
  service_styles: string[];
  departments: string[];
  positions: {
    id: string;
    name: string;
    department: string;
  }[];
  time_periods: {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
  }[];
}
```

### 3. Parameters

```typescript
GET /api/v1/common/parameters
```

**Response**:
```typescript
interface CommonParameters {
  operational: {
    operating_hours: {
      start: string;
      end: string;
    };
    peak_hours: string[];
    break_time: number;
    shift_length: number;
  };
  service: {
    service_style: string;
    table_turnover: number;
    covers_per_waiter: number;
    kitchen_stations: number;
  };
  space: {
    total_area: number;
    seating_capacity: number;
    kitchen_area: number;
    storage_area: number;
  };
  staffing: {
    min_staff: number;
    max_staff: number;
    roles: {
      role: string;
      count: number;
    }[];
  };
  financial: {
    target_margin: number;
    labor_cost_target: number;
    average_check: number;
  };
}
```

### 4. User Profile

```typescript
GET /api/v1/common/profile
```

**Response**:
```typescript
interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
    default_brand_id?: string;
    default_outlet_id?: string;
  };
  created_at: string;
  updated_at: string;
}
```

### 5. System Settings

```typescript
GET /api/v1/common/settings
```

**Response**:
```typescript
interface SystemSettings {
  version: string;
  environment: string;
  features: {
    [key: string]: boolean;
  };
  limits: {
    max_scenarios: number;
    max_brands: number;
    max_outlets: number;
    max_staff: number;
  };
  defaults: {
    page_size: number;
    date_format: string;
    currency: string;
    timezone: string;
  };
}
```

## Utility Functions

### 1. Authentication Utility

```typescript
// Example usage
const useAuth = () => {
  const login = async (credentials: LoginRequest) => {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  };

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');
    
    const response = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  };

  return { login, refresh, logout };
};
```

### 2. API Client Utility

```typescript
// Example usage
const apiClient = {
  get: async (url: string, params?: Record<string, any>) => {
    const token = localStorage.getItem('token');
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    
    const response = await fetch(`${url}${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      // Token expired, try to refresh
      const { refresh } = useAuth();
      await refresh();
      // Retry the original request
      return apiClient.get(url, params);
    }
    
    return response.json();
  },
  
  post: async (url: string, data: any) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.status === 401) {
      // Token expired, try to refresh
      const { refresh } = useAuth();
      await refresh();
      // Retry the original request
      return apiClient.post(url, data);
    }
    
    return response.json();
  }
};
```

### 3. Filter Utility

```typescript
// Example usage
const useFilters = () => {
  const { data, isLoading } = useQuery(
    'common-filters',
    () => apiClient.get('/api/v1/common/filters')
  );
  
  const filterOptions = {
    brands: data?.brands || [],
    outlets: data?.outlets || [],
    serviceStyles: data?.service_styles || [],
    departments: data?.departments || [],
    positions: data?.positions || [],
    timePeriods: data?.time_periods || []
  };
  
  return { filterOptions, isLoading };
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

1. Cache common filters for 1 hour
2. Cache parameters for 1 hour
3. Cache user profile for 15 minutes
4. Cache system settings for 1 hour

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