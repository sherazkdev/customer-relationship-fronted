import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { login as loginApi, getMe, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchMe();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMe = async () => {
    setLoading(true);
    try {
      const me = await getMe();
      setUser(me);
    } catch (err) {
      setToken(null);
      localStorage.removeItem('token');
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginApi(credentials);
      const newToken = res.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setAuthToken(newToken);
      setUser(res.data);
      toast.success('Welcome back!');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    fetchMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

