import { useContext } from 'react'
import { ActionModalContext } from '../contexts/action_modal_context'

export const useActionModal = () => {
  const {
    currentMembers,
    currentStackTags,
    setCurrentMembers,
    setCurrentStackTags
  } = useContext(ActionModalContext)

  return {
    currentMembers,
    currentStackTags,
    setCurrentMembers,
    setCurrentStackTags
  }
}
