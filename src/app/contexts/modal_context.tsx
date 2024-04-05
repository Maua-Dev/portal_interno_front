import { ReactNode, createContext, useState } from 'react'

interface modalContextInterface {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<modalContextInterface>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
