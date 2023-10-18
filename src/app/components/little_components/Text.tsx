import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type variantType = 'base' | 'muted' | 'link'
type sizeType = 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: variantType
  size?: sizeType
}

export default function Text({ variant, size, children, ...props }: CardProps) {
  const sizeVariants: Record<sizeType, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl'
  }

  const variants: Record<variantType, string> = {
    base: 'text-skin-base',
    muted: 'text-skin-muted',
    link: 'text-blue-500 hover:underline underline-offset-2 cursor-pointer duration-150 ease-in'
  }

  const sizePiked = size ? sizeVariants[size] : null
  const variantPiked = variant ? variants[variant] : null

  const style = twMerge(sizePiked, variantPiked)
  return (
    <h1 {...props} className={twMerge(style, props.className)}>
      {children}
    </h1>
  )
}
