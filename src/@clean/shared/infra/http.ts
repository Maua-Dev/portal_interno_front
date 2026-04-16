import axios from 'axios'
import { HTTP_STATUS_CODE } from '../domain/enums/http_status_code'

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: import.meta.env.VITE_MSS_API_URL
})

// Helper function to get auth domain based on stage
const getAuthDomain = () => {
  return import.meta.env.VITE_AUTH_DOMAIN
}

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log('HTTP Error Interceptor Status:', error.response?.status)
    console.log('URL:', error.config?.url)
    
    const originalRequest = error.config
    
    // Se o erro for 401 (Não autorizado), tentamos renovar o token
    if (error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          console.error('Refresh token not found in localStorage')
          return Promise.reject(error)
        }

        const authDomain = getAuthDomain()
        const tokenEndpoint = `https://${authDomain}/oauth2/token`
        
        console.log('Attempting to refresh token with refresh_token:', refreshToken.substring(0, 10) + '...')
        
        const clientId = import.meta.env.VITE_USERPOOL_CLIENT_ID?.trim()
        const basicAuth = import.meta.env.VITE_BASIC_AUTH_USERPOOL
        const clientSecret = import.meta.env.VITE_USERPOOL_CLIENT_SECRET?.trim()

        const headers: Record<string, string> = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

        if (basicAuth) {
          headers['Authorization'] = `Basic ${basicAuth}`
        } else if (clientSecret && clientId) {
          headers['Authorization'] = `Basic ${btoa(clientId + ':' + clientSecret)}`
        }

        const response = await axios.post(tokenEndpoint, 
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          }),
          { headers }
        )
        
        const newToken = response.data.id_token
        console.log('Token refreshed successfully')
        
        localStorage.setItem('idToken', newToken)
        if (response.data.refresh_token) {
          localStorage.setItem('refreshToken', response.data.refresh_token)
        }
        if (response.data.access_token) {
          localStorage.setItem('accessToken', response.data.access_token)
        }
        
        // Atualiza o header da requisição original e tenta novamente
        originalRequest.headers.Authorization = newToken
        return http(originalRequest)
      } catch (refreshError) {
        console.error('Erro ao renovar o token:', refreshError)
        // Se falhar a renovação, desloga o usuário
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('idToken')
        window.location.replace('/login')
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)
