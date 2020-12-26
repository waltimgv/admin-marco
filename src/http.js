import axios from 'axios';
import NProgress from 'nprogress';

const client = axios.create({
  baseURL: process.env.VUE_APP_URI,
  timeout: 9000,
});

client.interceptors.request.use((config) => {
  NProgress.start();

  return {
    ...config,
    headers: {
      ...config.headers,
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
    }
  };
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

client.interceptors.response.use((response) => {
  NProgress.done();

  return response;
}, (error) => {
  NProgress.done();

  return Promise.reject(error);
});

export default client;
