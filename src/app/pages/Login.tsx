import { useDarkMode } from '../hooks/useDarkMode'
import background from '../assets/background_login.png'
import logo from '../assets/logo_dev.png'
import logo_white from '../assets/logo_dev_white.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const { darkMode } = useDarkMode()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // OAuth2 token exchange function
  // Extrai a lógica do redirect_uri para evitar duplicação
  const getRedirectUri = () => {
    const envRedirectUri = import.meta.env.VITE_REDIRECT_URI
    if (envRedirectUri) return envRedirectUri

    return `${window.location.protocol}//${window.location.host}/login`

    console.log(
      'redirect_uri construído dinamicamente:',
      `${window.location.protocol}//${window.location.host}/login`
    )
  }

  const exchangeCodeForTokens = async (code: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const authDomain = import.meta.env.VITE_AUTH_DOMAIN
      const clientId = import.meta.env.VITE_USERPOOL_CLIENT_ID
      const tokenEndpoint = `https://${authDomain}/oauth2/token`
      const redirectUri = getRedirectUri()

      console.log('redirect_uri usado no token exchange:', redirectUri)

      const params: Record<string, string> = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId // ✅ Adicionado
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      // ✅ Só envia Authorization Basic se o secret existir
      const basicAuth = import.meta.env.VITE_BASIC_AUTH_USERPOOL
      if (basicAuth) {
        headers['Authorization'] = `Basic ${basicAuth}`
      }

      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams(params),
        { headers }
      )

      const { id_token, access_token, refresh_token } = response.data

      if (id_token && refresh_token) {
        localStorage.setItem('idToken', id_token)
        localStorage.setItem('refreshToken', refresh_token)
        if (access_token) localStorage.setItem('accessToken', access_token)
        navigate('/')
      } else {
        throw new Error('Invalid token response')
      }
    } catch (err: any) {
      console.error(
        'Erro na troca de código:',
        err.response?.data || err.message
      )
      setError('Falha na autenticação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('idToken')
    console.log('=== DEBUG LOGIN ===')
    console.log('Token no localStorage:', token)
    console.log('URL atual:', window.location.href)
    console.log('Search params:', window.location.search)

    if (token) {
      console.log('✅ Token encontrado, redirecionando para /')
      navigate('/')
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    console.log('Code na URL:', code)

    if (code) {
      console.log('✅ Code encontrado, iniciando troca...')
      window.history.replaceState({}, document.title, window.location.pathname)
      exchangeCodeForTokens(code)
    } else {
      console.log('❌ Nenhum code na URL e nenhum token salvo')
    }
  }, [navigate])

  const handleRedirect = () => {
    const clientId = import.meta.env.VITE_USERPOOL_CLIENT_ID
    const authDomain = import.meta.env.VITE_AUTH_DOMAIN
    const redirectUri = getRedirectUri() // ✅ Mesma função, garantia de consistência

    console.log('redirect_uri usado no login:', redirectUri) // Compare com o de cima!

    window.location.replace(
      `https://${authDomain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(
        'aws.cognito.signin.user.admin email openid phone profile'
      )}`
    )
  }

  return (
    <main
      className={`flex h-screen w-full items-center justify-center ${
        darkMode ? 'bg-dev-gray' : 'bg-white'
      }`}
    >
      <img
        src={background}
        alt="Ondas coloridas com degradê"
        draggable="false"
        className="absolute h-screen w-full object-cover"
      />
      <div
        className={`z-10 flex h-[40%] w-3/5 max-w-md flex-col items-center justify-between gap-12 rounded-lg sm:w-2/5 sm:gap-6 sm:py-12 ${
          darkMode
            ? 'sm:bg-dev-gray sm:shadow-[1px_1px_0px_9px_rgba(255,255,255,0.34)]'
            : 'sm:bg-white sm:shadow-[1px_1px_0px_9px_rgba(176,173,173,0.74)]'
        }`}
      >
        <img
          src={darkMode ? logo_white : logo}
          alt="Logo da Dev. Community Mauá"
          className="h-22 w-20"
        />
        <p
          className={`w-full text-center ${
            darkMode ? 'text-white' : 'text-black'
          } sm:w-3/5`}
        >
          Para acessar o Portal Interno é necessário realizar autenticação no
          login integrado
        </p>

        {error && (
          <p className="w-4/5 text-center text-sm text-red-500 sm:w-3/5">
            {error}
          </p>
        )}

        <button
          onClick={handleRedirect}
          disabled={isLoading}
          className={`w-4/5 rounded-md py-[2px] text-lg font-bold text-white sm:w-3/5 ${
            isLoading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-gradient-to-r from-red-400 to-blue-600 hover:from-red-500 hover:to-blue-700'
          }`}
        >
          {isLoading ? 'Autenticando...' : 'login integrado'}
        </button>
      </div>
    </main>
  )
}
