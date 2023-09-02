import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string
  textStyle: string
}

export function CardTitle({ children, textStyle, ...rest }: CardTitleProps) {
  const tilteClasses: { [key: string]: string } = {
    regular: 'text-2xl',
    bold: 'text-2xl font-bold',
    blue: 'text-xl font-extrabold text-blue-700'
  }
  return (
    <h1 {...rest} className={twMerge(tilteClasses[textStyle], rest.className)}>
      {children}
    </h1>
  )
}
