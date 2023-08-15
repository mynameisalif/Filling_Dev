import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { userService } from '../services/userService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
 
  getAll: async () => {
    try {
      const user = await userService.getAll();
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  getAllById: async (user_id) => {
    try {
      const user = await userService.getAllById(user_id);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  

  create: async (obj) => {
    try {
      const user = await userService.create(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  update: async (id ,obj) => {
    try {
      const user = await userService.update(id,obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },

  deletes: async (obj) => {
    try {
      const user = await userService.deletes(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },
 
}))

useStore = create(devtools(useStore))

  
export default useStore