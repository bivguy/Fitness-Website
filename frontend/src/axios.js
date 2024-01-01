import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://finalwebapplicationforbivan-dbd052c58b78.herokuapp.com/', 
  withCredentials: true,
});

export default instance; 