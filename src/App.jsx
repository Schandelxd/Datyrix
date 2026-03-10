import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import ApiManagement from './components/ApiManagement';
import DetailedAnalytics from './components/DetailedAnalytics';
import UserSettings from './components/UserSettings';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ApiProvider } from './context/ApiContext';
import MobileNav from './components/MobileNav';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Avoid flashing login screen

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ApiProvider>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
            ) : null}
          </AnimatePresence>

          {!loading && (
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoute>} />
                <Route path="/api-management" element={<ProtectedRoute><ErrorBoundary><ApiManagement /></ErrorBoundary></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><ErrorBoundary><DetailedAnalytics /></ErrorBoundary></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><ErrorBoundary><UserSettings /></ErrorBoundary></ProtectedRoute>} />
              </Routes>
              <MobileNav />
            </Router>
          )}
        </ApiProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
