import React, { createContext, useContext, useState} from 'react';
import authService from '../services/authService'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = async (formData) => {
    try {
      const response = await authService.signIn(formData);
      setUser(response.user); // Ensure response.user is correctly set by your backend
    } catch (error) {
      console.error('Sign in failed', error);
      throw error;
    }
  };

  const signup = async (formData) => {
    try {
      const response = await authService.signUp(formData);
      setUser(response.user);
    } catch (error) {
      console.error('Sign up failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
