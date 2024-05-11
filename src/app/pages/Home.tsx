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
  const [isRegister, setIsRegister] = useState<boolean>(false)

  const handleMember = async () => {
    try {
      await getMember()
    } catch (error: any) {
      if (error.message.endsWith('404')) {
        setIsRegister(true)
      } else {
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
        className={`flex  w-full items-center justify-center overflow-x-hidden overflow-y-hidden scrollbar-hide lg:h-screen ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        } ${isRegister || modalContent ? 'h-full' : 'h-screen'}`}
      >
        {isRegister ? <RegisterModal /> : null}
        {modalContent}
      </main>
    </>
  )
}
