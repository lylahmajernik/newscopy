import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  // ✅ Load user from localStorage if available
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
});

  const isAuthenticated = user !== null;
  const isAdmin = () => user?.role === 'admin';

  const login = (username, password, role = 'regular') => {
    const mockToken = `mock_jwt_token_${Date.now()}`;
    const userData = { username, role, token: mockToken };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // store full user
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // remove user on logout
  };

  const hasRole = (role) => user?.role === role;

  const value = { user, isAuthenticated, isAdmin, login, logout, hasRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}