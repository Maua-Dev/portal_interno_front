import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type variantType = 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant: variantType
}

export default function Card({ variant, children, ...props }: CardProps) {
  const variants: Record<variantType, string> = {
    sm: '',
    md: '',
    lg: 'h-3/5 w-4/5 bg-skin-secundary p-4 text-skin-base'
  }

  const style = variants[variant]
  return (
    <div {...props} className={twMerge(style, props.className)}>
      {children}
    </div>
  )
}
