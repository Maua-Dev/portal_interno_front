import axios from 'axios'

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: import.meta.env.VITE_MSS_API_URL
})

const stage = import.meta.env.VITE_STAGE === 'prod' ? 'prod' : 'dev'

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (originalRequest._retry >= 2) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('idToken')
      return Promise.reject(error)
    }

    if (originalRequest._retry < 2) {
      originalRequest._retry++
    }

    if (!originalRequest._retry) {
      originalRequest._retry = 0
    }

    if (error.config.url === '/get-member' || error.code === 'ERR_NETWORK') {
      originalRequest._retry = true
      try {
        // Faça a solicitação para renovar o token usando o refresh token salvo
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('idToken')
          return Promise.reject(error)
        }

        const response = await axios.post(
          `${import.meta.env.VITE_REFRESH_TOKEN_URL}/refresh_token`,
          {
            refresh_token: refreshToken,
            stage
          }
        )
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
