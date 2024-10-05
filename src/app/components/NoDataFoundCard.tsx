import { SearchX } from 'lucide-react'
import Card from './Card'

interface NoActionsFoundComponentProps {
  message: string
}

export function NoActionsFoundComponent({
  message
}: NoActionsFoundComponentProps) {
  return (
    <div className="flex h-screen w-4/5 items-start justify-center">
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
