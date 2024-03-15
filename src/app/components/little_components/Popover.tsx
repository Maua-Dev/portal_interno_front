import React, { HTMLAttributes, HtmlHTMLAttributes } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { X } from 'lucide-react'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverProps {
  children: React.ReactNode
}

export function PopoverContent({ children, ...props }: PopoverProps) {
  return (
    <PopoverPrimitive.PopoverContent
      className="flex flex-col gap-2 rounded-md border border-skin-muted bg-skin-secundary p-3"
      sideOffset={5}
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

interface PopoverCloseProps {
  children: React.ReactNode
}
