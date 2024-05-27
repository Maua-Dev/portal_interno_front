import { ReactElement, ReactNode, createContext, useState } from 'react'
import Historic from '../components/Historic'

interface ModalContextInterface {
  modalContent: ReactNode
  isModalOpen: boolean
  closeModal: (isEdit?: boolean) => void
  changeModalContent: (modal: ReactElement) => void
}

export const ModalContext = createContext<ModalContextInterface>({
  modalContent: undefined,
  isModalOpen: false,
  closeModal: () => {},
  changeModalContent: () => {}
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactElement | undefined>(
    undefined
  )

  const changeModalContent = (content: ReactElement) => {
    if (modalContent?.type === content.type) {
      setModalContent(undefined)
      setModalOpen(false)
    } else {
      setModalContent(content)
      setModalOpen(true)
    }
  }

  const closeModal = (isEdit?: boolean) => {
    if (isEdit) setModalContent(<Historic />)
    else setModalContent(undefined)
  }

  return (
    <ModalContext.Provider
      value={{ modalContent, closeModal, isModalOpen, changeModalContent }}
    >
      {children}
    </ModalContext.Provider>
  )
}
