import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useDarkMode } from '../../../hooks/useDarkMode'

type VariantTypes = 'default' | 'form' | 'icon' | 'destructive'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: VariantTypes
  buttonType?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      buttonType = 'button', // default value
      children,
      ...props
    },
    ref
  ) => {
    const { darkMode } = useDarkMode()
    const variantsStyle: Record<VariantTypes, string> = {
      default:
        'flex flex-row items-center gap-2 outline-none rounded-sm bg-skin-secundary px-4 py-2 font-semibold duration-150 ease-in hover:bg-skin-fill',
      form: 'flex flex-row items-center justify-center gap-2 outline-none text-white rounded-sm bg-skin-button-blue-accent px-4 py-2 font-semibold duration-150 ease-in hover:bg-skin-button-blue-accent-hover',
      icon: 'p-1 rounded-full duration-150 hover:bg-skin-fill',
      destructive: `flex flex-row items-center gap-2 outline-none rounded-sm text-white px-4 py-2 font-semibold duration-150 ease-in ${
        darkMode ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
      }`
    }

    const style = variantsStyle[variant]

    return (
      <button
        {...props}
        ref={ref}
        type={buttonType}
        className={twMerge(style, props.className)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
