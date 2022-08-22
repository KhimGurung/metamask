import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Accept': 'application/x-www-form-urlencoded' 
    }
});

export default AxiosClient;
