import React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverProps {
  children: React.ReactNode
}

export const PopoverContent = React.forwardRef(
  (
    { children, ...props }: PopoverPrimitive.PopoverContentProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <PopoverPrimitive.PopoverContent
      className="flex flex-col gap-2 rounded-md border border-skin-muted bg-skin-secundary p-3"
      sideOffset={5}
      {...props}
      ref={forwardedRef}
      asChild
    >
      {children}
    </PopoverPrimitive.PopoverContent>
  )
)

export const PopoverArrow = React.forwardRef(
  (
    { children, ...props }: PopoverProps,
    forwardedRef: React.Ref<SVGSVGElement>
  ) => (
    <PopoverPrimitive.Arrow
      className="fill-skin-muted"
      {...props}
      ref={forwardedRef}
    />
  )
)
