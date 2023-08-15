import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { roleService } from '../services/roleService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
  roles: {
            SUPER_ADMIN : 1,
            COMAN : 2,
            ADMINISTRATOR : 2,
            MEMBER : 3,
            VIEWER : 4,
        },
  role: null,
  getAll: async () => {
    try {
      const role = await roleService.getAll();
       return role
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },

  create: async (obj) => {
    try {
      const role = await roleService.create(obj);
    } catch (error) {
      // console.error(error.response.data.message , 'error');
      throw handleApiError(error)
    }
  },

  update: async (obj) => {
    try {
      const role = await roleService.update(obj);
    } catch (error) {
      // console.error(error.response.data.message , 'error');
      throw handleApiError(error)
    }
  },

  deletes: async (obj) => {
    try {
      const role = await roleService.deletes(obj);
    } catch (error) {
      // console.error(error.response.data.message , 'error');
      throw handleApiError(error)
    }
  },
 
}))

useStore = create(devtools(useStore))

  
export default useStore