
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainNavigation from '@/components/layout/MainNavigation';
import { PlanningBoard } from '@/components/planning';
import { Dashboard } from '@/components/dashboard';
import { ControlPanel } from '@/components/control';
import { StaffingStructure } from '@/components/staffing';
import { ScenarioManager } from '@/components/scenarios';
import { FinancialImpact } from '@/components/financial';
import { PeakHourAnalysis } from '@/components/analysis';
import WhatIfAnalysis from '@/components/WhatIfAnalysis';
import { BrandOutletProvider } from '@/context/BrandOutletContext';

function App() {
  return (
    <BrandOutletProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <MainNavigation />
          <main className="flex-1">
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
          </main>
          <Toaster />
        </div>
      </Router>
    </BrandOutletProvider>
  );
}

export default App;
