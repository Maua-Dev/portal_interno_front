import { useState } from 'react'
import Navbar from '../components/Navbar'
import useDarkMode from '../utils/functions/useDarkMode'
import { Modal } from '../components/Modal'

export default function Home() {
  const { darkMode } = useDarkMode()

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      <div>
        <Navbar openModal={openModal} />
        <main
          className={`h-screen w-full ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
        >
          <button
            className="ml-64 bg-black text-white"
            onClick={handleOpenModal}
          >
            Edit action
          </button>
        </main>
      </div>
      <div className={'flex items-center justify-center'}>
        {openModal && (
          <Modal
            open={openModal}
            onClick={() => {
              setOpenModal(false)
            }}
            create={false}
          />
        )}
      </div>
    </>
  )
}
