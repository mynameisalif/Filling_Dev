import api from './api';

const userService = {
  getUser: async (userId, headers) => {
    try {
      const {data} = await api.get(`/auth`, { headers });
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Other user-related API methods
};

export default userService;
