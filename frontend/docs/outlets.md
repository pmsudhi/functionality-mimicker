# Outlets API Integration

This document outlines the API integration requirements for the Outlets management component.

## Overview

The Outlets component allows users to manage restaurant outlets, including their locations, configurations, and operational parameters. It includes features for outlet creation, editing, and performance tracking.

## API Endpoints

### 1. List Outlets

```typescript
GET /api/v1/outlets
Query Parameters:
- page: number
- size: number
- sort_by: string
- sort_order: 'asc' | 'desc'
- brand_id: string
- status: 'active' | 'inactive'
```

**Response**:
```typescript
interface OutletList {
  items: Outlet[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

interface Outlet {
  id: string;
  name: string;
  brand_id: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  status: string;
  created_at: string;
  updated_at: string;
  parameters: OutletParameters;
  metrics: OutletMetrics;
}
```

### 2. Get Outlet Details

```typescript
GET /api/v1/outlets/{outlet_id}
```

**Response**:
```typescript
interface OutletDetails extends Outlet {
  brand: Brand;
  operational_parameters: OperationalParameters;
  space_parameters: SpaceParameters;
  staffing_parameters: StaffingParameters;
}
```

### 3. Create Outlet

```typescript
POST /api/v1/outlets
```

**Request**:
```typescript
interface OutletCreate {
  name: string;
  brand_id: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  parameters: {
    operational: OperationalParameters;
    space: SpaceParameters;
    staffing: StaffingParameters;
  };
}
```

### 4. Update Outlet

```typescript
PUT /api/v1/outlets/{outlet_id}
```

**Request**:
```typescript
interface OutletUpdate {
  name?: string;
  location?: {
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  parameters?: {
    operational?: OperationalParameters;
    space?: SpaceParameters;
    staffing?: StaffingParameters;
  };
  status?: string;
}
```

### 5. Delete Outlet

```typescript
DELETE /api/v1/outlets/{outlet_id}
```

### 6. Outlet Parameters

```typescript
GET /api/v1/outlets/{outlet_id}/parameters
```

**Response**:
```typescript
interface OutletParameters {
  operational: {
    operating_hours: {
      start: string;
      end: string;
    };
    peak_hours: string[];
    break_time: number;
    shift_length: number;
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
}
```

## Component Integration

### 1. Outlet List

```typescript
// Example usage
const OutletList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    brand_id: selectedBrand,
    status: 'active'
  });

  const { data, isLoading } = useQuery(
    ['outlets', filters],
    () => fetch(`/api/v1/outlets?${new URLSearchParams(filters)}`)
  );

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <Table>
        {data?.items.map(outlet => (
          <OutletRow key={outlet.id} outlet={outlet} />
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

### 2. Outlet Details

```typescript
// Example usage
const OutletDetails = ({ outletId }: { outletId: string }) => {
  const { data, isLoading } = useQuery(
    ['outlet', outletId],
    () => fetch(`/api/v1/outlets/${outletId}`)
  );

  return (
    <div>
      <OutletHeader outlet={data} />
      <Tabs>
        <TabsList>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="staffing">Staffing</TabsTrigger>
        </TabsList>
        <TabsContent value="parameters">
          <OutletParameters parameters={data?.parameters} />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </div>
  );
};
```

### 3. Outlet Form

```typescript
// Example usage
const OutletForm = () => {
  const [outlet, setOutlet] = useState({
    name: '',
    brand_id: selectedBrand,
    location: {
      address: '',
      city: '',
      country: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    },
    parameters: {
      operational: {
        operating_hours: {
          start: '09:00',
          end: '22:00'
        },
        peak_hours: ['12:00', '19:00'],
        break_time: 30,
        shift_length: 8
      },
      space: {
        total_area: 500,
        seating_capacity: 100,
        kitchen_area: 150,
        storage_area: 50
      },
      staffing: {
        min_staff: 10,
        max_staff: 30,
        roles: [
          { role: 'Server', count: 5 },
          { role: 'Kitchen', count: 3 }
        ]
      }
    }
  });

  const createOutlet = useMutation(
    (data: OutletCreate) => 
      fetch('/api/v1/outlets', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOutlet.mutate(outlet);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Outlet Name"
        value={outlet.name}
        onChange={e => setOutlet(prev => ({ ...prev, name: e.target.value }))}
      />
      {/* Other form fields */}
      <Button type="submit">Create Outlet</Button>
    </form>
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

1. Cache outlet list for 5 minutes
2. Cache outlet details for 10 minutes
3. Cache outlet parameters for 15 minutes
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