import api from './api';

export const paymentService = {
  getAll: async () => {
    const { data } = await api.get('/payment');
    return data;
  },
  getPaymentApprove: async () => {
    const { data } = await api.get('/payment/list-approve');
    return data;
  },
  checkUniqCode: async (uniq_code) => {
    const { data } = await api.get(`/payment/check-uniq-code/${uniq_code}`);
    return data;
  },
  create: async (body) => {
    const { data } = await api.post('/payment', body, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data;
  },
  update: async (id, body) => {
    const { data } = await api.put(`/payment/${id}`, body, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data;
  },
  deletes: async (body) => {
    const { data } = await api.delete(`/payment/${body.id}`, body);
    return data;
  },
  verifyAI: async (id) => {
    const { data } = await api.post(`/payment/verify-ai/${id}`);
    return data;
  },
  getCertificate: async (code) => {
    const { data } = await api.get(`/payment/certificate/${code}`);
    return data;
  },
};