import axios from 'axios';

const API = axios.create({
  baseURL: 'https://url-shortner-backend-y0u9.onrender.com/',
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
