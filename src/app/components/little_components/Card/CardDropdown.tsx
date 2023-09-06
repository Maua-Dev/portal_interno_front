import { twMerge } from 'tailwind-merge'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { HTMLAttributes, useState } from 'react'

interface CardDropDownProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  listDropdown?: string[]
}

export default function CardDropDown({
  label,
  listDropdown,
  ...rest
}: CardDropDownProps) {
  const [isOpen, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const printDropdownList = () => {
    if (listDropdown) {
      return listDropdown.map((unit, index) => (
        <h1 className="text-lg text-zinc-700" key={index}>
          {unit}
        </h1>
      ))
    } else {
      return 'Loading'
    }
  }

  return (
    <div
      {...rest}
      className={twMerge(
        'flex flex-col gap-4 rounded-md border border-black p-2 px-3 text-xl text-zinc-500',
        rest.className
      )}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-extrabold text-zinc-500">{label}</h1>
        <ArrowBackIosNewIcon
          className={
            isOpen ? '-rotate-90 text-zinc-400' : 'rotate-0 text-zinc-400'
          }
        />
      </div>
      {isOpen ? printDropdownList() : null}
    </div>
  )
}
