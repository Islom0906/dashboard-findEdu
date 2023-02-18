import axios from "axios";

axios.defaults.baseURL = 'http://18.216.178.179/api/v1'

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  const authorization = jwt ? `Bearer ${jwt}` : ''
  config.headers.authorization=authorization
  return config
})

export default axios