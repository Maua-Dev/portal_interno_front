import React, { useContext } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { SlidersHorizontal } from 'lucide-react'
import Button from './Button'
import { ThemeContext } from '../../contexts/theme_context'

export default function Popover() {
  const { theme } = useContext(ThemeContext)
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>
        <Button variant="default" aria-label="Filtro">
          <SlidersHorizontal className="h-5 w-5" />
          Filtrar
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={5}
          style={{
            backgroundColor: theme ? '#eceaf5' : '#000000',
            color: theme ? '#000000' : '#ffffff',
            border: '1px solid 000000',
            padding: '20px'
          }}
        >
          <div className="flex flex-col gap-2 p-5">
            <p>Filtro</p>
          </div>
          <PopoverPrimitive.Close
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
            aria-label="Close"
          >
            <SlidersHorizontal />
          </PopoverPrimitive.Close>
          <PopoverPrimitive.Arrow
            style={{
              fill: theme ? '#eceaf5' : '#000000'
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
