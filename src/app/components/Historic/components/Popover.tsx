import React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { twMerge } from 'tailwind-merge'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverProps {
  children: React.ReactNode
  className?: string
}

export function PopoverContent({
  children,
  className,
  ...props
}: PopoverProps) {
  return (
    <PopoverPrimitive.PopoverContent
      className={twMerge(
        '[data-align]:end flex flex-col gap-2 rounded-md border border-skin-muted bg-skin-secundary p-3',
        className
      )}
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
