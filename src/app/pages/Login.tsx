import background from '../assets/background_login.png'
import logo from '../assets/logo_dev.png'
import logo_white from '../assets/logo_dev_white.png'
import useDarkMode from '../utils/functions/useDarkMode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { darkMode } = useDarkMode()
  const navigate = useNavigate()

  // Set in the local storage if there's a token in URL
  const decoded = decodeURIComponent(location.hash.slice(1))
  const param = new URLSearchParams(decoded)
  const token = param.get('id_token')
  const refreshToken = param.get('refresh_token')
  if (token && refreshToken) {
    localStorage.setItem('idToken', token)
    localStorage.setItem('refreshToken', refreshToken)
  }

  // Check if there's a Token in the local storage
  useEffect(() => {
    const token = localStorage.getItem('idToken')

    // If there's token in the local storage, redirect to homepage
    if (token) {
      navigate('/')
    }
  }, [navigate])

  const handleRedirect = () => {
    if (import.meta.env.VITE_STAGE === 'prod') {
      window.location.replace(
        `https://auth.devmaua.com/?redirect_uri=${window.origin}/login`
      )
    } else {
      window.location.replace(
        `https://auth-dev.devmaua.com/?redirect_uri=${window.origin}/login`
      )
    }
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
        className="absolute h-screen w-full object-cover"
      />
      <div
        className={`z-10 flex h-2/6 w-3/5 flex-col items-center justify-between gap-12 rounded-lg sm:w-2/5 sm:gap-6 sm:py-12 ${
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
        <button
          onClick={handleRedirect}
          className="w-4/5 rounded-md bg-gradient-to-r from-red-400 to-blue-600 py-[2px] text-lg font-bold text-white sm:w-3/5"
        >
          login integrado
        </button>
      </div>
    </main>
  )
}
