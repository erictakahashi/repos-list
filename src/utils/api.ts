import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/orgs/facebook'
});

export default axiosInstance;
