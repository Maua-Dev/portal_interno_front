import { Search } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export default function SearchField({
  children,
  ...props
}: HTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={twMerge(
        'relative h-10 w-72 overflow-hidden rounded-full border border-skin-muted bg-skin-fill focus:bg-red-500',
        props.className
      )}
    >
      <input
        {...props}
        type="text"
        className={twMerge(
          'focus: peer z-20 h-full w-full rounded-full bg-transparent pl-9 duration-150 placeholder:text-skin-base placeholder:transition-transform placeholder:duration-150 placeholder:ease-linear focus:pl-3 focus:outline-none focus:placeholder:-translate-x-7 focus:placeholder:pl-7',
          props.className
        )}
      />
      <Search className="group-:hidden pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-skin-base transition-transform duration-150 peer-focus:-translate-x-10" />
    </div>
  )
}
