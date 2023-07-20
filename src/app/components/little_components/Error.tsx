import { ReactNode } from 'react'

const MessageErrorLogin = ({ children }: { children: ReactNode }) => {
  return <span className="flex justify-center">{children}</span>
}
const MessageErrorRegister = ({ children }: { children: ReactNode }) => {
  return <span className="flex justify-center">{children}</span>
}

export { MessageErrorLogin, MessageErrorRegister }
