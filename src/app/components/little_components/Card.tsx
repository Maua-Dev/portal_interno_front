import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type VariantType = 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant: VariantType
}

// eslint-disable-next-line react/display-name
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, children, ...props }, ref) => {
    const variants: Record<VariantType, string> = {
      sm: '',
      md: '',
      lg: 'h-3/5 w-4/5 bg-skin-secundary p-4 text-skin-base'
    }

    const style = variants[variant]
    return (
      <div {...props} ref={ref} className={twMerge(style, props.className)}>
        {children}
      </div>
    )
  }
)

export default Card
