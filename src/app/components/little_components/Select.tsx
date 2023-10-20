import { ChevronDown } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface RootProps extends HTMLAttributes<HTMLSelectElement> {
  label: string
}

function Root({ label, children, ...props }: RootProps) {
  return (
    <div
      className={twMerge(
        'relative flex h-10 w-36 flex-row items-center justify-between rounded-md bg-skin-secundary '
      )}
    >
      <select
        {...props}
        name="projects"
        id="projects"
        className={twMerge(
          'peer z-20 h-full w-full appearance-none bg-transparent pl-3',
          props.className
        )}
      >
        <option selected>{label}</option>
        {children}
      </select>
      <ChevronDown className="absolute right-3 h-4 w-4 text-skin-base" />
    </div>
  )
}

interface ContentProps extends HTMLAttributes<HTMLOptionElement> {
  value: string
}

function Content({ value, children, ...props }: ContentProps) {
  return (
    <option {...props} value={value} className={twMerge('', props.className)}>
      {children}
    </option>
  )
}

export { Root, Content }
