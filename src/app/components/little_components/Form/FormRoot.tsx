import { ReactNode } from 'react'

interface FormRootProps {
  children: ReactNode
}

export function FormRoot({ children }: FormRootProps) {
  return <div className="flex flex-col gap-7">{children}</div>
}
