import React, { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function CardFooter({ children, ...rest }: CardFooterProps) {
  return (
    <div {...rest} className={twMerge('px-4', rest.className)}>
      {children}
    </div>
  )
}
