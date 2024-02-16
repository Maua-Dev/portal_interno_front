import { useContext } from 'react'
import ActionModal from '../components/ActionModal'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { isModalOpen } = useContext(ModalContext)

  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
      >
        {isModalOpen && <ActionModal />}
      </main>
    </>
  )
}
