// import axios from 'axios';
// import Cookies from 'js-cookie';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_ENDPOINT,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Basic ${Cookies.get('token')}`
//   }
// });

// export default api;

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
  const key = Cookies.get('token') || session;
  if (key) {
    config.headers.Authorization = `Basic ${key}`;
  }
  return config;
});
export default api;
