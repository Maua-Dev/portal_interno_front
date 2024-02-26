import Card from './little_components/Card'
import TextField from './little_components/TextField'
import Text from './little_components/Text'
import { History } from 'lucide-react'
import Popover from './little_components/Popover'

interface FilterBarProps {
  setSearchText: (search: string) => void
}

export default function FilterBar({ setSearchText }: FilterBarProps) {
  return (
    <Card
      variant="lg"
      className="flex h-fit flex-row items-center justify-between opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in hover:opacity-100"
    >
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-2">
          <History className="h-8 w-8" />
          <Text size="2xl">Histórico</Text>
        </div>
        <TextField
          placeholder="Digite o titulo da atividade..."
          className="hidden w-64 md:block lg:w-72"
          onChange={(event) => {
            setSearchText(event.currentTarget.value)
          }}
        />
      </div>
      <div className="flex h-full flex-row gap-5">
        <Popover></Popover>
      </div>
    </Card>
  )
}
