import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type variantTypes = 'default' | 'form'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: variantTypes
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const variantsStyle: Record<variantTypes, string> = {
    default:
      'flex flex-row items-center gap-2 rounded-sm bg-skin-secundary px-4 py-2 font-semibold duration-150 ease-in hover:bg-skin-fill',
    form: 'flex flex-row items-center justify-center gap-2 text-white rounded-sm bg-skin-button-blue-accent px-4 py-2 font-semibold duration-150 ease-in hover:bg-skin-button-blue-accent-hover'
  }

  const style = variantsStyle[variant]

  return (
    <button {...props} className={twMerge(style, props.className)}>
      {children}
    </button>
  )
}
