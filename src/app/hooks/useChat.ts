import { useContext } from 'react'
import { ChatContext } from '../contexts/chat_context'

export const useChat = () => {
  return useContext(ChatContext)
}
