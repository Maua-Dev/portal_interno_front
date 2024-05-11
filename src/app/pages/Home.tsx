import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { useNavigate } from 'react-router-dom'
import RegisterModal from '../components/RegisterModal'
import { MemberContext } from '../contexts/member_context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ActionContext } from '../contexts/action_context'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  const { getMember, memberError } = useContext(MemberContext)
  const { actionError, actionSuccess, setActionError, setActionSuccess } =
    useContext(ActionContext)
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
  }, [actionSuccess, setActionSuccess, actionError, setActionError])

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
        className={`flex  w-full items-center justify-center overflow-hidden scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        } ${
          modalContent
            ? 'h-full lg:h-screen'
            : isRegister
            ? 'h-auto'
            : 'h-screen'
        }`}
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
