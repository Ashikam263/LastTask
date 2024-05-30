import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; // Replace with your backend URL

const authService = {
  signUp: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error('Sign up failed');
    }
  },
  signIn: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, { withCredentials: true });
      localStorage.setItem('access_token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw new Error('Sign in failed');
    }
  },
  // getCurrentUser: async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to fetch current user');
  //   }
  // }
};


export default authService;
