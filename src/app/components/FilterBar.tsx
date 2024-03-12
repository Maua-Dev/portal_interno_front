import Card from './little_components/Card'
import SearchField from './little_components/SearchField'
import Text from './little_components/Text'
import { History } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../components/little_components/Popover'
import * as Select from '../components/little_components/Select'
import Button from './little_components/Button'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { SlidersHorizontal } from 'lucide-react'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  setSearchText: (search: string) => void
}

export default function FilterBar({ setSearchText, ...props }: FilterBarProps) {
  return (
    <Card
      variant="lg"
      className={twMerge(
        'flex h-fit flex-row items-center justify-between shadow-sm shadow-gray-500 duration-150 ease-in',
        props.className
      )}
    >
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-2">
          <History className="h-8 w-8" />
          <Text size="2xl">Histórico</Text>
        </div>
        <SearchField
          placeholder="Digite o titulo da atividade..."
          className="hidden w-64 md:block lg:w-72"
          onChange={(event) => {
            setSearchText(event.currentTarget.value)
          }}
        />
      </div>
      <div className="flex h-full flex-row gap-5">
        <Popover>
          <PopoverTrigger>
            <Button variant="default">
              Filtro
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <Select.Root label="Projetos" variant="withTextLabel">
                <Select.Content value="PI">Portal Interno</Select.Content>
              </Select.Root>
              <Select.Root label="Área" variant="withTextLabel">
                <Select.Content value="PI">Teste</Select.Content>
              </Select.Root>
              <Select.Root label="Ordenar Por" variant="withTextLabel">
                <Select.Content value="PI">Teste</Select.Content>
              </Select.Root>

              <Button variant="form">Filtrar</Button>
              <PopoverArrow children={undefined} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
