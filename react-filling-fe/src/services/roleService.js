

import api  from './api';

export const roleService = {
  getAll: async () => {
    try {
      const {data} = await api.get('/roles');
      return data;
    } catch (error) {
      throw error
    }
  },
  create: async (body) => {
    try {
      const {data} = await api.post('/roles', body);
      return data;
    } catch (error) {
      throw error
    }
  },
  update: async (body) => {
    try {
      const {data} = await api.put(`/roles/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  deletes: async (body) => {
    try {
      const {data} = await api.delete(`/roles/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};