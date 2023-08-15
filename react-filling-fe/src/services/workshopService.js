

import api  from './api';

export const workshopService = {
  getAll: async () => {
    try {
      const {data} = await api.get('/workshop');
      return data;
    } catch (error) {
      throw error
    }
  },
  getWorkshopNotPay: async (id) => {
    try {
      const {data} = await api.get(`/workshop/notpay/${id}`);
      return data;
    } catch (error) {
      throw error
    }
  },

  getWorkshopPay: async (id) => {
    try {
      const {data} = await api.get(`/workshop/pay/${id}`);
      return data;
    } catch (error) {
      throw error
    }
  },

  
  
  create: async (body) => {
    try {
      const {data} = await api.post('/workshop', body , {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  update: async (id ,body) => {
    try {
      const {data} = await api.put(`/workshop/${id}`, body ,  {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  deletes: async (body) => {
    try {
      const {data} = await api.delete(`/workshop/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};