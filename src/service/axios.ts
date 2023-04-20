import axios, {AxiosRequestConfig} from 'axios';

axios.defaults.baseURL = 'http://3.138.61.64/';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const jwt: string | null = localStorage.getItem('token');
  const authorization: string = jwt ? `Bearer ${jwt}` : '';
  config.headers.authorization = authorization;
  return config;
});

export default axios;
