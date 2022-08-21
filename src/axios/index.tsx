import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 1000,
  headers: {
    'Accept': 'application/x-www-form-urlencoded' 
    }
});

export default AxiosClient;
