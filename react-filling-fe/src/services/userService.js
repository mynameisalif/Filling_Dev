

import api  from './api';

export const userService = {
  getAll: async () => {
    try {
      const {data} = await api.get('/user');
      return data;
    } catch (error) {
      throw error
    }
  },
  getAllById: async (user_id) => {
    try {
      const {data} = await api.get(`/user/${user_id}`);
      return data;
    } catch (error) {
      throw error
    }
  },
  create: async (body) => {
    try {
      const {data} = await api.post('/user', body , {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  update: async (id ,body) => {
    try {
      const {data} = await api.put(`/user/${id}`, body ,  {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  deletes: async (body) => {
    try {
      const {data} = await api.delete(`/user/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};