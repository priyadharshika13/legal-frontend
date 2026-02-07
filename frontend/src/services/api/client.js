import axios from 'axios';
import { getAuth, clearAuth } from '../../store/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const auth = getAuth();

  // token
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;

  // tenant header (you can rename to whatever backend expects)
    if (auth?.tenantCode) config.headers['X-Tenant'] = auth.tenantCode;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // auto logout on 401
    if (err?.response?.status === 401) clearAuth();
    return Promise.reject(err);
  }
);
