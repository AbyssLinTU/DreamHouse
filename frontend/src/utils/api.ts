import axios from "axios";
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200/',
  }) 

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
api.interceptors.response.use((config) => {
  return config
},async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._isRetry && error.config) {
      try {
        originalRequest._isRetry = true
        const tokens = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', tokens.data.accessToken)
        return api.request(originalRequest)
      }catch (error) {
        console.log("User is not authorized, error:"+error);
      }
  }
  throw error
  
})
export default api