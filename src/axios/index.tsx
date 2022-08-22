import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'https://khim-nodejs.herokuapp.com/',
  headers: {
    'Accept': 'application/x-www-form-urlencoded' 
    }
});

export default AxiosClient;
