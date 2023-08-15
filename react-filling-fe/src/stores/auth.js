import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { authService } from '../services/authService';
import {handleApiError} from "../utils/handleError"

let useAuth = (set => ({
  roles: {
            ADMIN : "0c2f99e2-3ffc-454c-88c3-4ba40fb12b9d",
            USER : "71ce8f4e-4fbd-42e6-b67d-f247bcb5cf03",         
        },
  user: null,
  login: async (username, password) => {
    try {
      const user = await authService.login(username, password);
      // set({ user });
      return user
    } catch (error) {
      // console.error(error.response.data.message , 'error');
      throw handleApiError(error)
    }
  },

  register: async (obj) => {
    try {
      const user = await authService.register(obj);
      set({ user });
    } catch (error) {
      // console.error(error.response.data.message , 'error');
      throw handleApiError(error)
    }
  },
 
}))

useAuth = create(devtools(useAuth))

  
export default useAuth