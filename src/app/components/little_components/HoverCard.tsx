import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
}

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ placeholder, children, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Root openDelay={100} closeDelay={100}>
        <HoverCardPrimitive.Trigger asChild>
          {children}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          sideOffset={10}
          ref={ref}
          className={twMerge(
            'rounded-md bg-skin-fill p-2 opacity-85',
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
