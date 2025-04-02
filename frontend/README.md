# Manpower Planning System - Frontend

A modern React-based frontend application for restaurant manpower planning and optimization. Built with TypeScript, Vite, and shadcn/ui components.

## Project Structure

```
src/
└── components/
    ├── analysis/                    # Analysis related components
    │   ├── components/             # Shared analysis components
    │   │   ├── AnalysisMetrics.tsx
    │   │   └── AnalysisCharts.tsx
    │   ├── PeakHourAnalysis/
    │   │   ├── components/         # Peak hour specific components
    │   │   ├── hooks/             # Peak hour specific hooks
    │   │   └── utils/             # Peak hour utility functions
    │   └── WhatIfAnalysis/
    │       ├── components/
    │       └── utils/
    │
    ├── control/                     # Control Panel components
    │   ├── components/             # Control specific components
    │   ├── tabs/                   # Tab components
    │   │   └── parameters/         # Parameter configuration tabs
    │   └── utils/                  # Control utility functions
    │
    ├── dashboard/                   # Dashboard components
    │   ├── components/             # Dashboard specific components
    │   └── utils/                  # Dashboard utilities
    │
    ├── financial/                   # Financial components
    │   ├── components/             # Financial specific components
    │   ├── tabs/                   # Financial analysis tabs
    │   └── utils/                  # Financial calculations
    │
    ├── layout/                      # Layout components
    │   ├── MainNavigation.tsx
    │   └── components/             # Layout specific components
    │
    ├── planning/                    # Planning components
    │   ├── components/             # Planning specific components
    │   ├── config/                 # Planning configuration
    │   └── utils/                  # Planning utilities
    │
    ├── scenarios/                   # Scenario components
    │   ├── components/             # Scenario specific components
    │   ├── tabs/                   # Scenario tabs
    │   └── utils/                  # Scenario utilities
    │
    ├── staffing/                    # Staffing components
    │   ├── components/             # Staffing specific components
    │   ├── tabs/                   # Staffing tabs
    │   └── utils/                  # Staffing utilities
    │
    └── ui/                          # Shared UI components
        ├── base/                   # Base UI components
        ├── data-display/           # Data display components
        ├── feedback/               # Feedback components
        ├── layout/                 # Layout components
        └── navigation/             # Navigation components
```

## Component Organization

### Feature Components
Each major feature follows a consistent organization pattern:
- `components/` - Feature-specific components
- `tabs/` - Tab-based views
- `utils/` - Utility functions
- `hooks/` - Custom hooks (where applicable)
- `config/` - Configuration files (where applicable)

### UI Components
Shared UI components are organized by function:
- `base/` - Basic UI elements (Button, Input, Select)
- `data-display/` - Data presentation (Table, Card)
- `feedback/` - User feedback (Toast, Progress)
- `layout/` - Layout components (PageLayout, PageHeader)
- `navigation/` - Navigation elements (Tabs, Menu)

## Key Features

1. **Dashboard**
   - Overview metrics
   - Performance indicators
   - Quick actions

2. **Control Panel**
   - Parameter configuration
   - System settings
   - Operational controls

3. **Staffing Structure**
   - Staff organization
   - Position management
   - Cost analysis

4. **Planning**
   - Resource allocation
   - Schedule management
   - Capacity planning

5. **Financial Analysis**
   - Cost tracking
   - Revenue projections
   - P&L integration

6. **Scenario Management**
   - What-if analysis
   - Scenario comparison
   - Optimization suggestions

## Technology Stack

### Core
- React 18.x
- TypeScript
- Vite

### UI Framework
- shadcn/ui components
- Radix UI primitives
- TailwindCSS
- Lucide icons

### State Management
- React Context API
- React Query
- React Hook Form

### Data Visualization
- Recharts
- Custom chart components

## Development Setup

1. **Prerequisites**
   ```bash
   node >= 16.x
   npm >= 8.x
   ```

2. **Installation**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Configuration

### Base URL
The application is configured to run under the `/solutions/manpower/` path:
```typescript
// vite.config.ts
export default defineConfig({
  base: '/solutions/manpower/',
  // ...
})

// App.tsx
<Router basename="/solutions/manpower">
  // ...
</Router>
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url
VITE_APP_ENV=development
```

## Development Guidelines

### Component Creation
1. Create components in their respective feature directories
2. Follow the established folder structure
3. Use shared UI components from `ui/` directory
4. Implement proper TypeScript types

### State Management
1. Use Context API for global state
2. Implement React Query for API data
3. Use local state for component-specific data
4. Handle loading and error states

### Styling
1. Use TailwindCSS for styling
2. Follow the design system
3. Maintain responsive design
4. Use CSS variables for theming

### Performance
1. Implement code splitting
2. Use lazy loading for routes
3. Optimize bundle size
4. Cache API responses

## Testing

1. **Unit Tests**
   ```bash
   npm run test
   ```

2. **E2E Tests**
   ```bash
   npm run test:e2e
   ```

## Build and Deployment

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Build Output**
   - Generated in `dist/` directory
   - Optimized assets
   - Source maps (optional)

## Contributing

1. Follow the established directory structure
2. Create feature-specific components in appropriate directories
3. Use shared components from `ui/` directory
4. Maintain TypeScript types
5. Document new features or changes

## Support

For support, please contact the development team or refer to the internal documentation.
