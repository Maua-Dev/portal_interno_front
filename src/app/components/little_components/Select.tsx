import { ChevronDown } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Text from './Text'

type selectTypes = 'default' | 'withTextLabel'

interface RootProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant: selectTypes
  label: string
}

function Root({ label, variant, children, ...props }: RootProps) {
  return (
    <div
      className={twMerge(
        'relative flex h-10 w-auto flex-row items-center justify-between gap-4'
      )}
    >
      {variant === 'withTextLabel' ? (
        <Text variant="muted">{label}: </Text>
      ) : null}
      <div className="flex flex-row items-center justify-between rounded-md border border-skin-muted bg-skin-secundary p-2">
        <select
          id={label}
          className={twMerge(
            'peer z-20 h-full w-36 appearance-none bg-transparent px-3 outline-none',
            props.className
          )}
          {...props}
          defaultValue={''}
        >
          <option>{variant === 'default' ? label : ''}</option>
          {children}
        </select>
        <ChevronDown
          className={'h-4 w-4 flex-shrink-0 text-skin-base selection:hidden'}
        />
      </div>
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
