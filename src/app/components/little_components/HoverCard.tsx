import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
}

export default function HoverCard({
  placeholder,
  children,
  ...props
}: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root openDelay={100} closeDelay={100}>
      <HoverCardPrimitive.Trigger>{children}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        sideOffset={10}
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
