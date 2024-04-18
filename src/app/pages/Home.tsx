import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { useNavigate } from 'react-router-dom'
import { MemberContext } from '../contexts/member_context'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  const { getMember } = useContext(MemberContext)
  const navigate = useNavigate()

  useEffect(() => {
    getMember().then((res) => {
      const member = res?.props
      if (!member) {
        localStorage.removeItem('idToken')
        navigate('/login')
      }
    })
  }, [getMember, navigate])

  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full overflow-x-hidden scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {modalContent}
      </main>
    </>
  )
}
