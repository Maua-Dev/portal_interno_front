import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { SlidersHorizontal } from 'lucide-react'
import Button from './Button'
import { BsThreeDots } from 'react-icons/bs'

export default function DropDown() {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button>
          <BsThreeDots className="h-6 w-6 cursor-pointer text-skin-base" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content sideOffset={5} side="bottom" asChild>
          <Test></Test>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

function Test() {
  return (
    <div className="flex flex-col bg-skin-fill p-3 text-skin-base">
      <button className="bg-white">Edit</button>
      <button>Delete</button>
    </div>
  )
}
