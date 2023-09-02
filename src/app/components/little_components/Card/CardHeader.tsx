import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  columns: string
}

export function CardHeader({ children, columns, ...rest }: CardHeaderProps) {
  const headerColumns: { [key: string]: string } = {
    sigle: 'flex gap-3',
    double: 'flex flex-row justify-between items-center'
  }
  return (
    <div
      {...rest}
      className={twMerge(
        `h-fit border-b-2 border-neutral-600 px-3 py-4 ${
          headerColumns[columns] || ''
        }`,
        rest.className
      )}
    >
      {children}
    </div>
  )
}
