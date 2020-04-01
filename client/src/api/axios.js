import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
  baseURL: '/api'
};

const axiosInstance = axios.create(config);

export default axiosInstance;
