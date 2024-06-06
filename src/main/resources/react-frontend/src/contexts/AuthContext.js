import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [userEmail, setUserEmail] = useState(AuthService.getUserEmail());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDepositManager, setIsDepositManager] = useState(false); // Add state for deposit manager

  useEffect(() => {
    const token = AuthService.getAccessToken();
    const email = AuthService.getUserEmail();
    const role = AuthService.getUserRole();

    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setIsAdmin(role === 'ROLE_ADMIN'); // adjust role check as needed
      setIsDepositManager(role === 'ROLE_DEPOSIT_MANAGER'); // adjust role check as needed
    }
  }, []);

  const login = async (loginData) => {
    await AuthService.login(loginData);
    const role = AuthService.getUserRole();
    setIsAuthenticated(true);
    setUserEmail(AuthService.getUserEmail());
    setIsAdmin(role === 'ROLE_ADMIN'); // adjust role check as needed
    setIsDepositManager(role === 'ROLE_DEPOSIT_MANAGER'); // adjust role check as needed
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsAdmin(false);
    setIsDepositManager(false); // Reset deposit manager state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, isAdmin, isDepositManager, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
