import { HTMLAttributes } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { twMerge } from 'tailwind-merge'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: string
}

export const Tooltip = ({ placeholder, children, ...props }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          {...props}
          className={twMerge(
            'rounded-md bg-skin-fill p-2 opacity-85',
            props.className
          )}
          sideOffset={5}
          side="bottom"
        >
          <p className="text-sm">{placeholder}</p>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
