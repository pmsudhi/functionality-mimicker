
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainNavigation from '@/components/layout/MainNavigation';
import PlanningBoard from '@/components/planning/index';
import Dashboard from '@/components/dashboard/index';
import ControlPanel from '@/components/control/index';
import StaffingStructure from '@/components/staffing/index';
import ScenarioManager from '@/components/scenarios/index';
import FinancialImpact from '@/components/financial/FinancialImpact';
import PeakHourAnalysis from '@/components/analysis/PeakHourAnalysis';
import ScenarioBuilder from '@/components/ScenarioBuilder';  // Updated import path

function App() {
  return (
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
            <Route path="/scenario-builder" element={<ScenarioBuilder />} />
            
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
  );
}

export default App;
