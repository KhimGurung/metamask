import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Accept': 'application/x-www-form-urlencoded' 
    }
});

export default AxiosClient;
