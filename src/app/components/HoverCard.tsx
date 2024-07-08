import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined
}

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ placeholder, side, children, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Root openDelay={100} closeDelay={100}>
        <HoverCardPrimitive.Trigger asChild>
          {children}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          sideOffset={10}
          side={side || 'bottom'}
          ref={ref}
          className={twMerge(
            'rounded-md bg-skin-fill px-2 py-1 text-skin-base opacity-90',
            props.className
          )}
        >
          <p>{placeholder}</p>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    )
  }
)

HoverCard.displayName = 'HoverCard'

export default HoverCard
