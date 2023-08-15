
import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { workshopService } from '../services/workshopService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
 
  getAll: async () => {
    try {
      const user = await workshopService.getAll();
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  getWorkshopNotPay: async (id) => {
    try {
      const user = await workshopService.getWorkshopNotPay(id);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },

  getWorkshopPay: async (id) => {
    try {
      const user = await workshopService.getWorkshopPay(id);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },

  

  

  create: async (obj) => {
    try {
      const user = await workshopService.create(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  update: async (id ,obj) => {
    try {
      const user = await workshopService.update(id,obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  deletes: async (obj) => {
    try {
      const user = await workshopService.deletes(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },
 
}))

useStore = create(devtools(useStore))

  
export default useStore