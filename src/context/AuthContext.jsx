import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if a token exists and validate it against the backend
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('gym_jwt_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(api('/api/auth/me'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem('gym_jwt_token');
          localStorage.removeItem('gym_user');
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('gym_jwt_token');
        localStorage.removeItem('gym_user');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(api('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('gym_jwt_token', data.token);
        localStorage.setItem('gym_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      return { success: false, error: 'Network error. Is the server running?' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(api('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('gym_jwt_token', data.token);
        localStorage.setItem('gym_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      return { success: false, error: 'Network error. Is the server running?' };
    }
  };

  const logout = () => {
    localStorage.removeItem('gym_jwt_token');
    localStorage.removeItem('gym_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
