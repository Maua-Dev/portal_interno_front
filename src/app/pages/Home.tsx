import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { useNavigate } from 'react-router-dom'
import RegisterModal from '../components/RegisterModal'
// import { MemberContext } from '../contexts/member_context'
import { http } from '../../@clean/shared/infra/http'
import { JsonProps } from '../../@clean/shared/domain/entities/member'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  // const { getMember } = useContext(MemberContext)
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)

  const getMember = async () => {
    const token = localStorage.getItem('idToken')
    if (!token) {
      throw new Error('Token not found')
    }

    try {
      const response = await http.get<JsonProps>('/get-member', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      console.log(response.data)
    } catch (error: any) {
      console.error(error.response.status)
      if (error.response.status === 404) {
        setIsRegister(true)
      }
      if (error.response.status === 401) {
        localStorage.removeItem('idToken')
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    getMember()
  })

  return (
    <>
      <Navbar />
      <main
        className={`scrollbar-hide h-screen w-full overflow-x-hidden ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {isRegister ? <RegisterModal /> : null}
        {modalContent}
      </main>
    </>
  )
}
