import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

const authService = {
  signUp: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Sign up failed', error);
      throw new Error('Sign up failed');
    }
  },
  signIn: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Sign in failed', error);
      throw new Error('Sign in failed');
    }
  },
  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout failed', error);
      throw new Error('Logout failed');
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Refresh token failed', error);
      throw new Error('Refresh token failed');
    }
  },
  // Modify this function to include the token in the headers
  // getCurrentUser: async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get(`${API_URL}/user`, {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to fetch current user');
  //   }
  // },
};

export default authService;
