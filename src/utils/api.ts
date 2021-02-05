import axios from 'axios';

/**
 * This is not a recommended implementation:
 * a better approach would to set this as an env variables.
 */
const API_TOKEN = '';

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    "Authorization": API_TOKEN
  },
});

export default axiosInstance;
