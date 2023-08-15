

import api  from './api';

export const feedbackService = {
  getAll: async () => {
    try {
      const {data} = await api.get('/feedback');
      return data;
    } catch (error) {
      throw error
    }
  },
  getAllByWorkshop: async (workshopId) => {
    try {
      const {data} = await api.get(`/feedback/detail/${workshopId}`);
      return data;
    } catch (error) {
      throw error
    }
  },
  getAllByWorkshopUser: async (workshopId , userId) => {
    try {
      const {data} = await api.get(`/feedback/detail/${workshopId}/${userId}`);
      return data;
    } catch (error) {
      throw error
    }
  },   
   
  create: async (body) => {
    try {
      const {data} = await api.post('/feedback', body , {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },

  getPaymentApprove: async () => {
    try {
      const {data} = await api.get('/payment/list-approve');
      return data;
    } catch (error) {
      throw error
    }
  },
  checkUniqCode: async (uniq_code) => {
    try {
      const {data} = await api.get(`/payment/check-uniq-code/${uniq_code}`);
      return data;
    } catch (error) {
      throw error
    }
  },
 
  update: async (id ,body) => {
    try {
      const {data} = await api.put(`/payment/${id}`, body ,  {headers : {   'Content-Type': 'multipart/form-data' } });
      return data;
    } catch (error) {
      throw error
    }
  },
  deletes: async (body) => {
    try {
      const {data} = await api.delete(`/payment/${body.id}`, body);
      return data;
    } catch (error) {
      throw error
    }
  },
  
};