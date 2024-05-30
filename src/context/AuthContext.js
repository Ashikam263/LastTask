import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'

export const AuthContext = createContext(); // Exporting AuthContext here

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    loadUser();
  }, []);

  const login = async (formData) => {
    const response = await authService.signIn(formData);
    setUser(response.user);
  };

  const signup = async (formData) => {
    const response = await authService.signUp(formData);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
