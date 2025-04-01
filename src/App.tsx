
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainNavigation from '@/components/layout/MainNavigation';
import PlanningBoard from '@/components/PlanningBoard';
import Dashboard from '@/components/Dashboard';
import ControlPanel from '@/components/ControlPanel';
import StaffingStructure from '@/components/StaffingStructure';
import ScenarioManager from '@/components/ScenarioManager';
import FinancialImpact from '@/components/financial';
import PeakHourAnalysis from '@/components/PeakHourAnalysis';
import ScenarioBuilder from '@/components/ScenarioBuilder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <MainNavigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planning" element={<PlanningBoard />} />
            <Route path="/control-panel" element={<ControlPanel />} />
            <Route path="/staffing" element={<StaffingStructure />} />
            <Route path="/scenarios" element={<ScenarioManager />} />
            <Route path="/financial" element={<FinancialImpact />} />
            <Route path="/peak-hour-analysis" element={<PeakHourAnalysis />} />
            <Route path="/scenario-builder" element={<ScenarioBuilder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
