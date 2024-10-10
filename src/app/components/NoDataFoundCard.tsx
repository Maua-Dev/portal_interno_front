import { SearchX } from 'lucide-react'
import Card from './Card'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface NoActionsFoundComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: string
}

export function NoActionsFoundComponent({
  message,
  ...props
}: NoActionsFoundComponentProps) {
  return (
    <div
      className={twMerge(
        'flex h-screen w-10/12 items-start justify-center',
        props.className
      )}
    >
      <Card
        className="flex h-44 w-full flex-row items-center justify-center gap-2  text-2xl font-bold text-skin-muted shadow-sm shadow-gray-500"
        variant={'lg'}
      >
        <SearchX className="w-7w h-7" />
        <p>{message}</p>
      </Card>
    </div>
  )
}
