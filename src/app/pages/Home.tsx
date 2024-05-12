import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { useNavigate } from 'react-router-dom'
import RegisterModal from '../components/RegisterModal'
import { MemberContext } from '../contexts/member_context'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  const { getMember } = useContext(MemberContext)
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)

  // const getMember = async () => {
  //   const token = localStorage.getItem('idToken')
  //   if (!token) {
  //     navigate('/login')
  //   }

  //   try {
  //     const response = await http.get<JsonProps>('/get-member', {
  //       headers: {
  //         Authorization: 'Bearer ' + token
  //       }
  //     })
  //     console.log(response.data)
  //   } catch (error: any) {
  //     console.error(error.response.status)
  //     if (error.response.status === 404) {
  //       setIsRegister(true)
  //     }
  //     if (error.response.status === 401) {
  //       localStorage.removeItem('idToken')
  //       navigate('/login')
  //     }
  //   }
  // }

  const handleMember = async () => {
    try {
      await getMember()
    } catch (error: any) {
      if (error.message.endsWith('404')) {
        setIsRegister(true)
      } else if (
        !error.message.endsWith('401') ||
        !error.message.endsWith('404')
      ) {
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    handleMember()
  })

  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full overflow-x-hidden scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {isRegister ? <RegisterModal /> : null}
        {modalContent}
      </main>
    </>
  )
}
