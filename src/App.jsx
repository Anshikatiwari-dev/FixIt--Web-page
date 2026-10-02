import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShowProblemPage } from './pages/ShowProblemPage';
import { DiagnosisPage } from './pages/DiagnosisPage';
import { DiyPage } from './pages/DiyPage';
import { TechniciansPage } from './pages/TechniciansPage';
import { TechnicianProfilePage } from './pages/TechnicianProfilePage';
import { SparePartsPage } from './pages/SparePartsPage';
import { RepairVsReplacePage } from './pages/RepairVsReplacePage';
import { ReusePage } from './pages/ReusePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { TechnicianDashboardPage } from './pages/TechnicianDashboardPage';
import { AdminPage } from './pages/AdminPage';
import { FixItNowPage } from './pages/FixItNowPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top helper on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/show-problem" element={<ShowProblemPage />} />
                <Route path="/diagnosis" element={<DiagnosisPage />} />
                <Route path="/diy" element={<DiyPage />} />
                <Route path="/technicians" element={<TechniciansPage />} />
                <Route path="/technician/:id" element={<TechnicianProfilePage />} />
                <Route path="/spare-parts" element={<SparePartsPage />} />
                <Route path="/repair-vs-replace" element={<RepairVsReplacePage />} />
                <Route path="/reuse" element={<ReusePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/technician-dashboard" element={<TechnicianDashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/fixit-now" element={<FixItNowPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Fallback route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </Router>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
