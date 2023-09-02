import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PopUpCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size: string
  isPopUp?: boolean
}

export function CardRoot({
  children,
  size,
  isPopUp = false,
  ...rest
}: PopUpCardProps) {
  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const cardSizeClasses: { [key: string]: string } = {
    xs: 'w-96 h-fit',
    base: 'w-1/2 h-fit',
    lg: 'w-2/3 h-fit'
  }

  return (
    <div
      {...rest}
      onClick={isPopUp ? handleCardClick : () => {}}
      className={twMerge(
        `h- text absolute z-20 rounded-3xl border border-neutral-600 bg-white px-6 py-4 ${cardSizeClasses[size]}`,
        rest.className
      )}
    >
      {children}
    </div>
  )
}
