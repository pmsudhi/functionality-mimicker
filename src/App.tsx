
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainNavigation from '@/components/layout/MainNavigation';
import { BrandOutletProvider } from '@/context/BrandOutletContext';
import { LoadingFallback } from '@/components/ui/loading-fallback';

// Use React.lazy to lazy-load components
const Dashboard = lazy(() => import('@/components/dashboard'));
const PlanningBoard = lazy(() => import('@/components/planning'));
const ScenarioManager = lazy(() => import('@/components/scenarios'));
const ControlPanel = lazy(() => import('@/components/control'));
const StaffingStructure = lazy(() => import('@/components/staffing'));
const FinancialImpact = lazy(() => import('@/components/financial'));
const PeakHourAnalysis = lazy(() => import('@/components/analysis/PeakHourAnalysis'));
const WhatIfAnalysis = lazy(() => import('@/components/WhatIfAnalysis'));

function App() {
  return (
    <BrandOutletProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <MainNavigation />
          <main className="flex-1">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Dashboard & Overview */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Planning & Scenarios */}
                <Route path="/planning" element={<PlanningBoard />} />
                <Route path="/scenarios" element={<ScenarioManager />} />
                <Route path="/scenario-builder" element={<WhatIfAnalysis />} />
                
                {/* Analysis & Reports */}
                <Route path="/financial" element={<FinancialImpact />} />
                <Route path="/peak-hour-analysis" element={<PeakHourAnalysis />} />
                
                {/* Configuration & Setup */}
                <Route path="/control-panel" element={<ControlPanel />} />
                <Route path="/staffing" element={<StaffingStructure />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Toaster />
        </div>
      </Router>
    </BrandOutletProvider>
  );
}

export default App;
