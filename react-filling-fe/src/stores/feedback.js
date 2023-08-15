import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { feedbackService } from '../services/feedbackService';
import {handleApiError} from "../utils/handleError"

let useStore = (set => ({
 
    getAllByWorkshop: async (workshopId) => {
    try {
      const user = await feedbackService.getAllByWorkshop(workshopId);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  getAllByWorkshopUser: async (workshopId , userId) => {
    try {
      const user = await feedbackService.getAllByWorkshopUser(workshopId , userId);
       return user
    } catch (error) {
      console.error(error , 'error');
      throw handleApiError(error)
    }
  },
  create: async (obj) => {
    try {
      const feed = await feedbackService.create(obj);
    } catch (error) { 
      throw handleApiError(error)
    }
  },
  
 
 
}))

useStore = create(devtools(useStore))

  
export default useStore