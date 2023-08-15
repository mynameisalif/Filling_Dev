import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { attendanceService } from '../services/attendanceService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
 
  getAll: async () => {
    try {
      const user = await attendanceService.getAll();
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },

  create: async (obj) => {
    try {
      const user = await attendanceService.create(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  update: async (id ,obj) => {
    try {
      const user = await attendanceService.update(id,obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  deletes: async (obj) => {
    try {
      const user = await attendanceService.deletes(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },
 
}))

useStore = create(devtools(useStore))

  
export default useStore