import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RegisterModal from '../components/RegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import { useDarkMode } from '../hooks/useDarkMode'
import { useMember } from '../hooks/useMember'
import { useAction } from '../hooks/useAction'
import { useModal } from '../hooks/useModal'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { memberError, handleAllMembers, handleMember, isRegister } =
    useMember()
  const { actionError, actionSuccess, setActionError, setActionSuccess } =
    useAction()
  const { modalContent } = useModal()

  useEffect(() => {
    handleMember()
    handleAllMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (actionSuccess) {
      toast.success(actionSuccess, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      setActionSuccess('')
    }

    if (actionError) {
      toast.error(actionError, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      setActionError('')
    }
  }, [actionSuccess, actionError, setActionSuccess, setActionError])

  useEffect(() => {
    if (memberError) {
      toast.error(memberError, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }, [memberError])

  return (
    <>
      <Navbar />
      <main
        className={`flex w-full items-center justify-center overflow-x-hidden transition-all duration-200 scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        } ${modalContent ? 'h-full' : isRegister ? 'h-auto' : 'h-screen'}`}
      >
        {isRegister ? <RegisterModal /> : null}
        {modalContent}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </>
  )
}
