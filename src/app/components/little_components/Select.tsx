import { ChevronDown } from 'lucide-react'
import React, { HTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface RootProps extends HTMLAttributes<HTMLSelectElement> {
  label: string
}

function Root({ label, children, ...props }: RootProps) {
  const [isOptionSelected, setIsOptionSelected] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOptionSelected(event.target.value !== label)
  }
  return (
    <div
      className={twMerge(
        `relative flex h-10 w-auto flex-row items-center justify-between rounded-md border border-skin-muted bg-skin-secundary ${
          isOptionSelected && 'bg-skin-fill'
        }`
      )}
    >
      <select
        {...props}
        name={label}
        id={label}
        onChange={handleChange}
        className={twMerge(
          'peer z-20 h-full w-auto flex-grow appearance-none bg-transparent px-3',
          props.className
        )}
      >
        <option value={label} selected>
          {label}
        </option>
        {children}
      </select>
      <ChevronDown
        className={`absolute right-3 h-4 w-4 flex-shrink-0 text-skin-base ${
          isOptionSelected && 'hidden'
        }`}
      />
    </div>
  )
}

interface ContentProps extends React.HTMLAttributes<HTMLOptionElement> {
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
