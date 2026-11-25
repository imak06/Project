import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/common/Toast';

// Public Pages
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';

// Protected Admin Layout & Pages
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProjectManager from './pages/admin/ProjectManager';
import SkillManager from './pages/admin/SkillManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import EducationManager from './pages/admin/EducationManager';
import CertificationManager from './pages/admin/CertificationManager';
import ProfileManager from './pages/admin/ProfileManager';
import MessageInbox from './pages/admin/MessageInbox';
import SettingsManager from './pages/admin/SettingsManager';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/project/:slugOrId" element={<ProjectDetail />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin CMS Routes */}
              <Route path="/admin" element={<AdminProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="projects" element={<ProjectManager />} />
                  <Route path="skills" element={<SkillManager />} />
                  <Route path="experience" element={<ExperienceManager />} />
                  <Route path="education" element={<EducationManager />} />
                  <Route path="certifications" element={<CertificationManager />} />
                  <Route path="profile" element={<ProfileManager />} />
                  <Route path="messages" element={<MessageInbox />} />
                  <Route path="settings" element={<SettingsManager />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
