import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', values);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  useEffect(() => {
    const saved = localStorage.getItem('userInfo');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
