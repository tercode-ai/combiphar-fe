import axios from 'axios';
import Cookies from 'js-cookie';
import { SessionToken } from './cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const session = SessionToken.get();
  const key =
    session?.access_token ??
    JSON.parse(Cookies.get('token') || '').access_token;
  if (key) {
    config.headers.Authorization = `Basic ${key}`;
  }
  return config;
});

export default api;
