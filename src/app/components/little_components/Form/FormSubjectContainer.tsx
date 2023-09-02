import { ReactNode } from 'react'

interface FormSubjectContainerProps {
  children: ReactNode
  label: string
}

export function FormSubjectContainer({
  children,
  label
}: FormSubjectContainerProps) {
  return (
    <div>
      <h1 className="mb-2 text-lg font-bold">{label}</h1>
      <div className="grid grid-cols-2 gap-7">{children}</div>
    </div>
  )
}
