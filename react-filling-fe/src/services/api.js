import axios from 'axios';
import {BASEURL} from "../../config/config"
const api = axios.create({
  baseURL: BASEURL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any common headers or authentication tokens here
  },
});

export default api;