import { createContext, useState, type PropsWithChildren } from 'react'
import { http } from '../../@clean/shared/infra/http'
import { ChatRepositoryHttp } from '../../@clean/shared/infra/repositories/chat_repository_http'

export interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
  file?: {
    name: string
    status: 'uploading' | 'success' | 'error'
  }
}

interface ChatContextInterface {
  messages: Message[]
  isOpen: boolean
  isLoading: boolean
  isUploading: boolean
  chatError: string
  setIsOpen: (isOpen: boolean) => void
  sendMessage: (text: string) => Promise<void>
  uploadFile: (file: File) => Promise<void>
  clearChat: () => void
}

export const ChatContext = createContext<ChatContextInterface>(
  {} as ChatContextInterface
)

export function ChatProvider({ children }: PropsWithChildren) {
  const chatRepository = new ChatRepositoryHttp(http)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Olá! Sou a inteligência artificial do portal interno da Dev Community Mauá. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [chatError, setChatError] = useState('')

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessageId =
      Math.random().toString(36).substring(2, 9) + Date.now().toString()
    const userMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setChatError('')

    try {
      const answer = await chatRepository.createChat(text)
      const botMessageId =
        Math.random().toString(36).substring(2, 9) + Date.now().toString()
      const botMessage: Message = {
        id: botMessageId,
        sender: 'bot',
        text: answer,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (err: any) {
      setChatError(err.message)
      const botErrorMessageId =
        Math.random().toString(36).substring(2, 9) + Date.now().toString()
      const errorMessage: Message = {
        id: botErrorMessageId,
        sender: 'bot',
        text: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setChatError('')

    const fileId =
      Math.random().toString(36).substring(2, 9) + Date.now().toString()
    const userMessage: Message = {
      id: fileId,
      sender: 'user',
      text: `Enviando arquivo: ${file.name}`,
      timestamp: new Date(),
      file: {
        name: file.name,
        status: 'uploading'
      }
    }

    setMessages((prev) => [...prev, userMessage])

    try {
    
      const { uploadUrl } = await chatRepository.getUploadUrl(file.name)

  
      await chatRepository.uploadFile(uploadUrl, file)

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === fileId
            ? {
                ...msg,
                text: `Arquivo enviado: ${file.name}`,
                file: { name: file.name, status: 'success' }
              }
            : msg
        )
      )

      const botConfirmMessageId =
        Math.random().toString(36).substring(2, 9) + Date.now().toString()
      const botConfirmMessage: Message = {
        id: botConfirmMessageId,
        sender: 'bot',
        text: `Recebi o arquivo **${file.name}** com sucesso! Ele foi adicionado à base de conhecimento da IA. Sinta-se à vontade para fazer perguntas sobre o conteúdo dele.`,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botConfirmMessage])
    } catch (err: any) {
      setChatError(err.message)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === fileId
            ? {
                ...msg,
                text: `Falha ao enviar arquivo: ${file.name}`,
                file: { name: file.name, status: 'error' }
              }
            : msg
        )
      )
    } finally {
      setIsUploading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Olá! Sou a inteligência artificial do portal interno da Dev Community Mauá. Como posso ajudar você hoje?',
        timestamp: new Date()
      }
    ])
    setChatError('')
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        isUploading,
        chatError,
        setIsOpen,
        sendMessage,
        uploadFile,
        clearChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
