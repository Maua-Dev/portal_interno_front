import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardBody({ children, ...rest }: CardBodyProps) {
  return (
    <div {...rest} className={twMerge('h-fit px-3', rest.className)}>
      {children}
    </div>
  )
}
