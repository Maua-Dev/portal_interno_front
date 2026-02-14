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
  const exchangeCodeForTokens = async (code: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const authDomain = import.meta.env.VITE_AUTH_DOMAIN
      const tokenEndpoint = `https://${authDomain}/oauth2/token`

      
      console.log("Fazendo requisição")
      
      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI 
            ? import.meta.env.VITE_REDIRECT_URI
            : `${window.location.protocol}//${window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname}:${window.location.port}/login`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTH_USERPOOL}`,
          },
        }
      )

      const { id_token, access_token, refresh_token } = response.data

      if (id_token && refresh_token) {
        console.log("Setando tokens")
        localStorage.setItem('idToken', id_token)
        localStorage.setItem('refreshToken', refresh_token)
        if (access_token) {
          localStorage.setItem('accessToken', access_token)
        }
        navigate('/')
      } else {
        throw new Error('Invalid token response')
      }
    } catch (err) {
      console.error('Error exchanging code for tokens:', err)
      setError('Falha na autenticação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle authorization code from URL and check for existing session
  useEffect(() => {
    // 1. Primeiro, verifica se o usuário já está logado
    const token = localStorage.getItem('idToken')
    if (token) {
      console.log("token: ", token)
      navigate('/')
      return // Encerra a execução se já estiver logado
    }

    // 2. Depois, procura pelo código de autorização na URL
    const urlParams = new URLSearchParams(window.location.search)
    console.log("urlParams: ", window.location.search)
    const code = urlParams.get('code')
    console.log("code: ", code)

    // Se encontrar o código, inicia a troca
    if (code) {
      // Limpa a URL para que o código não seja processado novamente
      console.log("Tem token")
      window.history.replaceState({}, document.title, window.location.pathname)
      
      // Chama a função para trocar o código por tokens
      exchangeCodeForTokens(code)
    }
  }, [navigate])

  const handleRedirect = () => {
    const clientId = import.meta.env.VITE_USERPOOL_CLIENT_ID
    const authDomain = import.meta.env.VITE_AUTH_DOMAIN
    // Use environment variable if available, otherwise fallback to dynamic detection
    const envRedirectUri = import.meta.env.VITE_REDIRECT_URI
    
    let redirectUri = ''
    if (envRedirectUri) {
       redirectUri = envRedirectUri
    } else {
       // Fallback logic
       const hostname = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname
       redirectUri = `${window.location.protocol}//${hostname}:${window.location.port}/login`
    }
    
    const authEndpoint = `https://${authDomain}/login`
    
    window.location.replace(
      `${authEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
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
          <p className="w-4/5 text-center text-red-500 text-sm sm:w-3/5">
            {error}
          </p>
        )}
        
        <button
          onClick={handleRedirect}
          disabled={isLoading}
          className={`w-4/5 rounded-md py-[2px] text-lg font-bold text-white sm:w-3/5 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-400 to-blue-600 hover:from-red-500 hover:to-blue-700'
          }`}
        >
          {isLoading ? 'Autenticando...' : 'login integrado'}
        </button>
      </div>
    </main>
  )
}
