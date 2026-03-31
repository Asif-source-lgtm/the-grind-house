import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';

import DashboardLayout from './dashboard/DashboardLayout';
import Overview from './dashboard/views/Overview';
import Workouts from './dashboard/views/Workouts';
import TrainersView from './dashboard/views/TrainersView';
import Membership from './dashboard/views/Membership';
import Settings from './dashboard/views/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="trainers" element={<TrainersView />} />
              <Route path="membership" element={<Membership />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
