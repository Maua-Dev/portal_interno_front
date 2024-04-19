import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { useNavigate } from 'react-router-dom'
import { MemberContext } from '../contexts/member_context'
import RegisterModal from '../components/RegisterModal'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  const { getMember } = useContext(MemberContext)
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {
    getMember().then((res) => {
      const member = res?.props
      if (!member && localStorage.getItem('idToken')?.startsWith('ey')) {
        setIsRegister(!isRegister)
      } else if (!member) {
        console.log(localStorage.getItem('idToken'))
        localStorage.removeItem('idToken')
        navigate('/login')
      }
    })
  }, [getMember, navigate])

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
