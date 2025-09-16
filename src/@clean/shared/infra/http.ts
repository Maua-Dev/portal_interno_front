import axios from 'axios'

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
    const originalRequest = error.config
    if (error.code === 'ERR_NETWORK') {
      try {
        // Faça a solicitação para renovar o token usando o refresh token salvo
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('idToken')
          return Promise.reject(error)
        }

        const authDomain = getAuthDomain()
        const tokenEndpoint = `https://${authDomain}/oauth2/token`
        
        const response = await axios.post(tokenEndpoint, 
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: window.location.origin
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${import.meta.env.VITE_BASIC_AUTH_USERPOOL}`
            }
          }
        )
        
        // Atualize o token de acesso com o novo token recebido
        const newToken = response.data.id_token
        localStorage.setItem('idToken', newToken)
        if (response.data.refresh_token) {
          localStorage.setItem('refreshToken', response.data.refresh_token)
        }
        if (response.data.access_token) {
          localStorage.setItem('accessToken', response.data.access_token)
        }
        
        // Reenvie a solicitação original com o novo token de acesso
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return http(originalRequest)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('idToken')
        console.error('Erro ao renovar o token', error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
