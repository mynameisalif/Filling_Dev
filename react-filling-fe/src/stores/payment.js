import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { paymentService } from '../services/paymentService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
 
  getAll: async () => {
    try {
      const user = await paymentService.getAll();
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  getPaymentApprove: async () => {
    try {
      const user = await paymentService.getPaymentApprove();
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  checkUniqCode: async (uniq_code) => {
    try {
      const user = await paymentService.checkUniqCode(uniq_code);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  
  create: async (obj) => {
    try {
      const user = await paymentService.create(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  update: async (id ,obj) => {
    try {
      const user = await paymentService.update(id,obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  deletes: async (obj) => {
    try {
      const user = await paymentService.deletes(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },
 
}))

useStore = create(devtools(useStore))

  
export default useStore