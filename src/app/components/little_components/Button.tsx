import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type variantTypes = 'default'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: variantTypes
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const variantsStyle: Record<variantTypes, string> = {
    default:
      'flex flex-row items-center gap-2 rounded-sm bg-skin-secundary px-4 font-semibold duration-150 ease-in hover:bg-skin-fill'
  }

  const style = variantsStyle[variant]

  return (
    <button {...props} className={twMerge(style, props.className)}>
      {children}
    </button>
  )
}
