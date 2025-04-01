
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import PlanningBoard from '@/components/PlanningBoard';
import Dashboard from '@/components/Dashboard';
import ControlPanel from '@/components/ControlPanel';
import StaffingStructure from '@/components/StaffingStructure';
import ScenarioManager from '@/components/ScenarioManager';
import FinancialImpact from '@/components/FinancialImpact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planning" element={<PlanningBoard />} />
          <Route path="/control-panel" element={<ControlPanel />} />
          <Route path="/staffing" element={<StaffingStructure />} />
          <Route path="/scenarios" element={<ScenarioManager />} />
          <Route path="/financial" element={<FinancialImpact />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
