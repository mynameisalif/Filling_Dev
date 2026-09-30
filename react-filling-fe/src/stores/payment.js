import { create } from "zustand";
import { devtools } from 'zustand/middleware';
import { paymentService } from '../services/paymentService';
import { handleApiError } from "../utils/handleError";

let useStore = () => ({
  getAll: async () => {
    try {
      return await paymentService.getAll();
    } catch (error) {
      console.error(error, 'error');
      throw handleApiError(error);
    }
  },
  getPaymentApprove: async () => {
    try {
      return await paymentService.getPaymentApprove();
    } catch (error) {
      console.error(error, 'error');
      throw handleApiError(error);
    }
  },
  checkUniqCode: async (uniq_code) => {
    try {
      return await paymentService.checkUniqCode(uniq_code);
    } catch (error) {
      console.error(error, 'error');
      throw handleApiError(error);
    }
  },
  create: async (obj) => {
    try {
      await paymentService.create(obj);
    } catch (error) { 
      throw handleApiError(error);
    }
  },
  update: async (id, obj) => {
    try {
      await paymentService.update(id, obj);
    } catch (error) { 
      throw handleApiError(error);
    }
  },
  deletes: async (obj) => {
    try {
      await paymentService.deletes(obj);
    } catch (error) { 
      throw handleApiError(error);
    }
  },
  verifyAI: async (id) => {
    try {
      return await paymentService.verifyAI(id);
    } catch (error) {
      console.error(error, 'error verifyAI');
      throw handleApiError(error);
    }
  },
  getCertificate: async (code) => {
    try {
      return await paymentService.getCertificate(code);
    } catch (error) {
      console.error(error, 'error getCertificate');
      throw handleApiError(error);
    }
  },
});

useStore = create(devtools(useStore));

export default useStore;