# Brands API Integration

This document outlines the API integration requirements for the Brands management component.

## Overview

The Brands component allows users to manage restaurant brands, including their properties, service styles, and operational parameters. It includes features for brand creation, editing, and configuration.

## API Endpoints

### 1. List Brands

```typescript
GET /api/v1/brands
Query Parameters:
- page: number
- size: number
- sort_by: string
- sort_order: 'asc' | 'desc'
- status: 'active' | 'inactive'
```

**Response**:
```typescript
interface BrandList {
  items: Brand[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  service_style: string;
  status: string;
  created_at: string;
  updated_at: string;
  parameters: BrandParameters;
  metrics: BrandMetrics;
}
```

### 2. Get Brand Details

```typescript
GET /api/v1/brands/{brand_id}
```

**Response**:
```typescript
interface BrandDetails extends Brand {
  outlets: Outlet[];
  operational_parameters: OperationalParameters;
  service_parameters: ServiceParameters;
  financial_parameters: FinancialParameters;
}
```

### 3. Create Brand

```typescript
POST /api/v1/brands
```

**Request**:
```typescript
interface BrandCreate {
  name: string;
  description: string;
  service_style: string;
  parameters: {
    operational: OperationalParameters;
    service: ServiceParameters;
    financial: FinancialParameters;
  };
}
```

### 4. Update Brand

```typescript
PUT /api/v1/brands/{brand_id}
```

**Request**:
```typescript
interface BrandUpdate {
  name?: string;
  description?: string;
  service_style?: string;
  parameters?: {
    operational?: OperationalParameters;
    service?: ServiceParameters;
    financial?: FinancialParameters;
  };
  status?: string;
}
```

### 5. Delete Brand

```typescript
DELETE /api/v1/brands/{brand_id}
```

### 6. Brand Parameters

```typescript
GET /api/v1/brands/{brand_id}/parameters
```

**Response**:
```typescript
interface BrandParameters {
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
  financial: {
    target_margin: number;
    labor_cost_target: number;
    average_check: number;
  };
}
```

## Component Integration

### 1. Brand List

```typescript
// Example usage
const BrandList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    status: 'active'
  });

  const { data, isLoading } = useQuery(
    ['brands', filters],
    () => fetch(`/api/v1/brands?${new URLSearchParams(filters)}`)
  );

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <Table>
        {data?.items.map(brand => (
          <BrandRow key={brand.id} brand={brand} />
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

### 2. Brand Details

```typescript
// Example usage
const BrandDetails = ({ brandId }: { brandId: string }) => {
  const { data, isLoading } = useQuery(
    ['brand', brandId],
    () => fetch(`/api/v1/brands/${brandId}`)
  );

  return (
    <div>
      <BrandHeader brand={data} />
      <Tabs>
        <TabsList>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="outlets">Outlets</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="parameters">
          <BrandParameters parameters={data?.parameters} />
        </TabsContent>
        {/* Other tab contents */}
      </Tabs>
    </div>
  );
};
```

### 3. Brand Form

```typescript
// Example usage
const BrandForm = () => {
  const [brand, setBrand] = useState({
    name: '',
    description: '',
    service_style: 'Casual Dining',
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
      service: {
        service_style: 'Casual Dining',
        table_turnover: 3,
        covers_per_waiter: 20,
        kitchen_stations: 5
      },
      financial: {
        target_margin: 15,
        labor_cost_target: 25,
        average_check: 50
      }
    }
  });

  const createBrand = useMutation(
    (data: BrandCreate) => 
      fetch('/api/v1/brands', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBrand.mutate(brand);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Brand Name"
        value={brand.name}
        onChange={e => setBrand(prev => ({ ...prev, name: e.target.value }))}
      />
      {/* Other form fields */}
      <Button type="submit">Create Brand</Button>
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

1. Cache brand list for 5 minutes
2. Cache brand details for 10 minutes
3. Cache brand parameters for 15 minutes
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