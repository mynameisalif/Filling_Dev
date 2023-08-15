// authService.js

import api  from './api';

export const authService = {
  login: async (username, password) => {
    try {
      const {data} = await api.post('/auth/login', { username, password });
      return data;
    } catch (error) {
      throw error
    }
  },
  register: async (body) => {
    try {
      const {data} = await api.post('/auth/register', body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};