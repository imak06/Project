import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setAdmin(res.data.admin);
            localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
          }
        } catch (err) {
          console.error('Session expired or invalid:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      const { token: newToken, admin: adminData } = res.data;
      setToken(newToken);
      setAdmin(adminData);
      localStorage.setItem('adminToken', newToken);
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, message: res.data.message || 'Login failed' };
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  const updateAdminProfile = (updatedAdmin) => {
    setAdmin(updatedAdmin);
    localStorage.setItem('adminUser', JSON.stringify(updatedAdmin));
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, updateAdminProfile, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
