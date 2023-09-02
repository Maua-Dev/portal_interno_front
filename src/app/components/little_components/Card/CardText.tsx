import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: string
  textStyle: string
}

export function CardText({ children, textStyle, ...rest }: CardTextProps) {
  const tilteClasses: { [key: string]: string } = {
    regular: 'text-base text-zinc-400',
    bold: 'text-lg font-bold text-zinc-500'
  }
  return (
    <p {...rest} className={twMerge(tilteClasses[textStyle], rest.className)}>
      {children}
    </p>
  )
}
