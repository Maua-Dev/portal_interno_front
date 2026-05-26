import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import {
  Bot,
  Send,
  Paperclip,
  GripHorizontal,
  X,
  Sparkles,
  Trash2,
  AlertCircle
} from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { useDarkMode } from '../../hooks/useDarkMode'

export default function ChatbotWidget() {
  const {
    messages,
    isOpen,
    isLoading,
    isUploading,
    chatError,
    setIsOpen,
    sendMessage,
    uploadFile,
    clearChat
  } = useChat()

  const { darkMode } = useDarkMode()
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragControls = useDragControls()

  const [dragBounds, setDragBounds] = useState({
    left: -800,
    right: 0,
    top: -600,
    bottom: 0
  })

  useEffect(() => {
    const updateBounds = () => {
      const cardWidth = 380
      const cardHeight = 500
      setDragBounds({
        left: -window.innerWidth + cardWidth + 40,
        right: 0,
        top: -window.innerHeight + cardHeight + 80,
        bottom: 0
      })
    }
    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages, isOpen, isLoading, isUploading])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isLoading) return
    const textToSend = inputText
    setInputText('')
    await sendMessage(textToSend)
  }

  const handleFileClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await uploadFile(file)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatMessageText = (text: string) => {
    const lines = text.split('\n')

    return lines.map((line, index) => {
      const cleanLine = line.trim()

      const bulletMatch = cleanLine.match(/^[-*]\s+(.*)$/)
      const numberMatch = cleanLine.match(/^(\d+)\.\s+(.*)$/)

      const renderBold = (str: string) => {
        const parts = str.split(/\*\*([^*]+)\*\*/)
        return parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <strong
                key={i}
                className="font-semibold text-blue-600 dark:text-sky-400"
              >
                {part}
              </strong>
            )
          }
          return part
        })
      }

      if (bulletMatch) {
        return (
          <div key={index} className="my-1 flex items-start gap-2 pl-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500 text-blue-500 dark:bg-sky-400" />
            <span className="text-sm leading-relaxed">
              {renderBold(bulletMatch[1])}
            </span>
          </div>
        )
      }

      if (numberMatch) {
        return (
          <div key={index} className="my-1 flex items-start gap-2 pl-2">
            <span className="min-w-[14px] flex-shrink-0 text-sm font-semibold text-blue-500 dark:text-sky-400">
              {numberMatch[1]}.
            </span>
            <span className="text-sm leading-relaxed">
              {renderBold(numberMatch[2])}
            </span>
          </div>
        )
      }

      if (cleanLine === '') {
        return <div key={index} className="h-2" />
      }

      return (
        <p key={index} className="mb-1 text-sm leading-relaxed">
          {renderBold(cleanLine)}
        </p>
      )
    })
  }

  return (
    <>
      {/* 1. Botão Flutuante (FAB) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 outline-none transition-transform hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        layoutId="chatbot-fab"
        title="Abrir Chatbot Assistente"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot-icon"
              className="relative flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-6 w-6 animate-pulse" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.05}
            dragConstraints={dragBounds}
            className={`fixed bottom-40 right-8 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border md:w-[380px] ${
              darkMode
                ? 'border-zinc-800 bg-zinc-950/95 text-zinc-100 shadow-2xl shadow-black/80'
                : 'border-zinc-200 bg-white/95 text-zinc-800 shadow-2xl shadow-zinc-400/50'
            } backdrop-blur-md`}
          >
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className={`flex cursor-grab select-none items-center justify-between border-b px-4 py-3 active:cursor-grabbing ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60'
                  : 'border-zinc-200 bg-zinc-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-inner">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold leading-tight">
                    DevAI
                    <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  </h3>
                  <span className="text-[10px] font-medium text-zinc-500">
                    Assistente Interno
                  </span>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  onClick={clearChat}
                  className={`rounded-lg p-1.5 transition-colors ${
                    darkMode
                      ? 'text-zinc-400 hover:bg-zinc-800 hover:text-rose-400'
                      : 'text-zinc-500 hover:bg-zinc-200 hover:text-rose-600'
                  }`}
                  title="Limpar conversa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div
                  className={`h-5 w-[1px] ${
                    darkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                  }`}
                />
                <div className="cursor-grab rounded-md p-0.5 text-zinc-400 hover:bg-zinc-100 active:cursor-grabbing dark:text-zinc-500 dark:hover:bg-zinc-800">
                  <GripHorizontal className="h-4 w-4" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg p-1.5 transition-colors ${
                    darkMode
                      ? 'text-zinc-400 hover:bg-zinc-800'
                      : 'text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className={`scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-4 ${
                darkMode
                  ? 'scrollbar-thumb-zinc-800'
                  : 'scrollbar-thumb-zinc-200'
              }`}
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot'
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${
                      isBot ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isBot && (
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl border p-3 text-sm shadow-sm ${
                        isBot
                          ? darkMode
                            ? 'rounded-bl-none border-zinc-800/40 bg-zinc-900 text-zinc-100'
                            : 'rounded-bl-none border-zinc-200/50 bg-zinc-100 text-zinc-800'
                          : darkMode
                          ? 'rounded-br-none border-blue-800 bg-gradient-to-br from-blue-700 to-indigo-700 text-white'
                          : 'rounded-br-none border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                      }`}
                    >
                      {/* Formatação Especial para Upload de Arquivos */}
                      {msg.file ? (
                        <div className="flex items-center gap-2.5">
                          <Paperclip className="h-5 w-5 flex-shrink-0 text-white/95" />
                          <div className="overflow-hidden">
                            <p className="max-w-[200px] truncate text-xs font-semibold">
                              {msg.file.name}
                            </p>
                            <span className="block text-[10px] opacity-80">
                              {msg.file.status === 'uploading'
                                ? 'Enviando para o S3...'
                                : msg.file.status === 'success'
                                ? 'Enviado com sucesso'
                                : 'Falha no envio'}
                            </span>
                          </div>
                          {msg.file.status === 'uploading' && (
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          )}
                        </div>
                      ) : (
                        formatMessageText(msg.text)
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Indicador de Digitação (Typing Indicator) */}
              {isLoading && (
                <div className="flex items-end justify-start gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div
                    className={`rounded-2xl rounded-bl-none border px-4 py-3 ${
                      darkMode
                        ? 'border-zinc-800/40 bg-zinc-900'
                        : 'border-zinc-200/50 bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></span>
                    </div>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="my-2 flex justify-center">
                  <div className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-500">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Falha na conexão. Verifique a rede.</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className={`flex flex-col gap-2 border-t p-3 ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/40'
                  : 'border-zinc-200 bg-zinc-50/60'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                className="hidden"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFileClick}
                  disabled={isUploading}
                  className={`rounded-xl border p-2.5 transition-colors ${
                    darkMode
                      ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      : 'border-zinc-200 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900'
                  } disabled:opacity-50`}
                  title="Anexar arquivo PDF/imagem"
                >
                  <Paperclip className="h-4.5 w-4.5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Envie uma pergunta ou documento..."
                  disabled={isLoading}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? 'border-zinc-800 bg-zinc-950 text-white placeholder-zinc-500'
                      : 'border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400'
                  }`}
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-[0.97] disabled:scale-100 disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
