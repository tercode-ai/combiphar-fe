import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const key = Cookies.get('cm') ?? '';
  if (key) {
    config.headers.Authorization = `Basic ${key}`;
  }
  return config;
});

export default api;
