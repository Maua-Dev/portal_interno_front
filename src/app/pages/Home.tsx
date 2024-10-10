import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RegisterModal from '../components/RegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import { useDarkMode } from '../hooks/useDarkMode'
import { useMember } from '../hooks/useMember'
import { useAction } from '../hooks/useAction'
import { useModal } from '../hooks/useModal'
import 'react-toastify/dist/ReactToastify.css'
import { OnHoldModal } from '../components/OnHoldModal'
import Historic from '../components/Historic'
import NotificationDrawer from '../components/NotificationDrawer'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { memberError, handleAllMembers, handleMember, isRegister, isOnHold } =
    useMember()
  const { actionError, actionSuccess, setActionError, setActionSuccess } =
    useAction()
  const { modalContent, changeModalContent } = useModal()
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false)

  useEffect(() => {
    handleMember()
    handleAllMembers()
    changeModalContent(<Historic />)
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
      <Navbar open={notificationIsOpen} openOnChange={setNotificationIsOpen} />
      <main
        className={`flex w-full items-center justify-center overflow-x-hidden transition-all duration-200 scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        } ${
          modalContent
            ? 'h-full'
            : isRegister || isOnHold
            ? 'h-auto'
            : 'h-screen'
        }`}
      >
        {isOnHold ? <OnHoldModal /> : null}
        {isRegister ? <RegisterModal /> : null}
        {!isOnHold && modalContent}
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
        <NotificationDrawer
          open={notificationIsOpen}
          openOnChange={setNotificationIsOpen}
        />
      </main>
    </>
  )
}
