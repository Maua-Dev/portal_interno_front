import { Search } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface SearchFieldProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export default function SearchField({
  placeholder,
  children,
  ...props
}: SearchFieldProps) {
  return (
    <div
      className={twMerge(
        'relative h-8 w-72 overflow-hidden rounded-full border border-skin-muted bg-skin-fill focus:bg-red-500 sm:h-10',
        props.className
      )}
    >
      <input
        {...props}
        type="text"
        placeholder={placeholder}
        className={twMerge(
          'focus: peer z-20 h-full w-full rounded-full bg-transparent pb-1 pl-7 duration-150 placeholder:flex placeholder:text-xs placeholder:text-skin-base placeholder:transition-transform placeholder:duration-150 placeholder:ease-linear focus:pl-3 focus:outline-none focus:placeholder:-translate-x-7 focus:placeholder:pl-7 sm:pb-0 sm:pl-9 sm:placeholder:pb-0 sm:placeholder:text-lg',
          props.className
        )}
      />
      <Search className="group-:hidden pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-skin-base transition-transform duration-150 peer-focus:-translate-x-10 sm:h-5 sm:w-5" />
    </div>
  )
}
