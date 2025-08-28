/**
 * axios setup to use mock service
 */

import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
async (config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error: { response: { status: number; data: any; }; }) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export async function fetcher(args: string | [string, AxiosRequestConfig]) {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
}
