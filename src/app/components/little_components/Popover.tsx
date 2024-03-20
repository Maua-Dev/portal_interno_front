import React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverProps {
  children: React.ReactNode
}

export function PopoverContent({ children, ...props }: PopoverProps) {
  return (
    <PopoverPrimitive.PopoverContent
      className="[data-align]:end flex flex-col gap-2 rounded-md border border-skin-muted bg-skin-secundary p-3"
      sideOffset={5}
      align={window.innerWidth < 1024 ? 'end' : 'center'}
      asChild
      {...props}
    >
      {children}
    </PopoverPrimitive.PopoverContent>
  )
}

interface PopoverArrowProps {
  children: React.ReactNode
}

export function PopoverArrow({ children, ...props }: PopoverArrowProps) {
  return <PopoverPrimitive.Arrow className="fill-skin-muted" {...props} />
}
