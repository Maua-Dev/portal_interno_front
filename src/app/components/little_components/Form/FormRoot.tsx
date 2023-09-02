import { ReactNode } from 'react'

interface FormRootProps {
  children: ReactNode
}

export function FormRoot({ children }: FormRootProps) {
  return <div>{children}</div>
}
