import { zodResolver } from '@hookform/resolvers/zod'
import background from '../assets/background_login.png'
import logo from '../assets/logo_dev.png'
import logo_white from '../assets/logo_dev_white.png'
import useDarkMode from '../utils/functions/useDarkMode'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Preencha o campo do e-mail')
    .email('E-mail inválido'),
  password: z.string().min(1, 'Preencha o campo da senha')
})

export type User = z.infer<typeof loginSchema>

export default function Login() {
  const { darkMode } = useDarkMode()
  const navigate = useNavigate()

  // Set in the local storage if there's a token in URL
  const decoded = decodeURIComponent(location.hash.slice(1))
  const param = new URLSearchParams(decoded)
  const token = param.get('id_token')
  if (token) localStorage.setItem('idToken', token)

  // Check if there's a Token in the local storage
  useEffect(() => {
    const token = localStorage.getItem('idToken')

    // If there's no token in the local storage, redirect to integrated login
    if (!token) {
      window.location.replace(
        'https://auth-dev.devmaua.com/?redirect_uri=http://localhost:5000/login'
      )
    }
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }, [navigate])

  const handleLogin = (data: User) => {
    // alert(`E-mail: ${data.email}\nSenha: ${data.password}`)
    console.log(data)
    window.location.replace(
      'https://auth-dev.devmaua.com/?redirect_uri=http://localhost:5000/login'
    )
  }

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  })
  return (
    <main
      className={`flex h-screen w-full items-center justify-center ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <img
        src={background}
        alt="Ondas coloridas com degradê"
        className="absolute h-screen w-full object-cover"
      />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={`z-10 flex h-4/6 w-96 flex-col items-center justify-between gap-6 rounded-lg py-12 ${
          darkMode
            ? 'sm:bg-black sm:shadow-[1px_1px_0px_9px_rgba(255,255,255,0.34)]'
            : 'sm:bg-white sm:shadow-[1px_1px_0px_9px_rgba(176,173,173,0.74)]'
        }`}
      >
        <img
          src={darkMode ? logo_white : logo}
          alt="Logo da Dev. Community Mauá"
          className="h-22 w-20"
        />
        <div className="flex w-full flex-col items-center justify-center gap-4 px-4">
          <input
            type="text"
            placeholder="E-mail"
            className={`w-5/6 border-b-2 border-gray-600 py-[4px] outline-none transition-all duration-500 focus:border-blue-800 ${
              errors.email && 'border-red-600'
            } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
            {...register('email', { required: true })}
          />
          <div className="-mt-[12px] w-5/6 text-left">
            <span className="text-sm text-red-600">
              {errors.email && errors.email.message}
            </span>
          </div>
          <input
            type="password"
            placeholder="Senha"
            className={`w-5/6 border-b-2 border-gray-600 py-[4px] outline-none transition-all duration-500 focus:border-blue-800 ${
              errors.password && 'border-red-600'
            } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
            {...register('password', { required: true })}
          />
          <div className="-mt-[12px] w-5/6 text-left">
            <span className="text-sm text-red-600">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="-mt-[10px] w-5/6 text-right">
            <a href="/" className="text-sm text-gray-600">
              Esqueceu a senha?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-3/5 rounded-md bg-gradient-to-r from-red-400 to-blue-600 py-[2px] text-lg font-bold text-white"
        >
          login
        </button>
        <a href="/" className="text-sm text-gray-600">
          Primeira vez? Crie sua conta
        </a>
      </form>
    </main>
  )
}
