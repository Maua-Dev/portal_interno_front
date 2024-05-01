import axios from 'axios'

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: import.meta.env.VITE_MSS_API_URL
})

const stage = import.meta.env.VITE_STAGE

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Faça a solicitação para renovar o token usando o refresh token salvo
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await http.post(import.meta.env.VITE_MSS_API_URL, {
          refresh_token: refreshToken,
          stage
        })

        // Atualize o token de acesso com o novo token recebido
        const newToken = response.data.id_token
        localStorage.setItem('idToken', newToken)

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
