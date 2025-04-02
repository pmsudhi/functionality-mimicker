# Frontend API Integration Documentation

This directory contains detailed API integration documentation for each component and page in the frontend application. Each file describes the required API endpoints, request/response formats, and integration guidelines.

## Documentation Structure

- `dashboard.md` - Dashboard page API integration
- `scenarios.md` - Scenario management API integration
- `financial.md` - Financial analysis API integration
- `staffing.md` - Staffing management API integration
- `peak-hours.md` - Peak hour analysis API integration
- `what-if.md` - What-if analysis API integration
- `brands.md` - Brand management API integration
- `outlets.md` - Outlet management API integration
- `common.md` - Common API endpoints and utilities

## General API Guidelines

1. **Base URL**: All API endpoints are relative to the base URL: `http://localhost:8000/api/v1`

2. **Authentication**:
   - All requests must include an Authorization header: `Authorization: Bearer <token>`
   - Token can be obtained from `/auth/login` endpoint
   - Token refresh: `/auth/refresh` endpoint

3. **Response Format**:
```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string;
  metadata: {
    timestamp: string;
    version: string;
    environment: string;
  };
  pagination?: {
    total: number;
    page: number;
    size: number;
    total_pages: number;
  };
}
```

4. **Error Handling**:
```typescript
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    timestamp: string;
    version: string;
    environment: string;
  };
}
```

5. **Pagination**:
   - Use query parameters: `page`, `size`, `sort_by`, `sort_order`
   - Default page size: 10
   - Maximum page size: 100

6. **Rate Limiting**:
   - 100 requests per minute per IP
   - Rate limit headers included in response

## Common Headers

```typescript
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

## Development Guidelines

1. Always handle API errors appropriately
2. Implement proper loading states
3. Use TypeScript interfaces for type safety
4. Follow the response format structure
5. Implement proper error boundaries
6. Use proper HTTP methods for each operation
7. Implement proper data validation
8. Use proper caching strategies
9. Implement proper retry mechanisms
10. Follow proper security practices 