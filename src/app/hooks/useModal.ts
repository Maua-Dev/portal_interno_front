import { useContext } from 'react'
import { ModalContext } from '../contexts/modal_context'

export const useModal = () => {
  const { isModalOpen, closeModal, changeModalContent, modalContent } =
    useContext(ModalContext)

  return {
    isModalOpen,
    closeModal,
    changeModalContent,
    modalContent
  }
}
