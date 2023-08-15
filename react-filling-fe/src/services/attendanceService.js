

import api  from './api';

export const attendanceService = {
  getAll: async () => {
    try {
      const {data} = await api.get('/attendance');
      return data;
    } catch (error) {
      throw error
    }
  },
  create: async (body) => {
    try {
      const {data} = await api.post('/attendance', body , {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  update: async (id ,body) => {
    try {
      const {data} = await api.put(`/attendance/${id}`, body ,  {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  deletes: async (body) => {
    try {
      const {data} = await api.delete(`/attendance/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};