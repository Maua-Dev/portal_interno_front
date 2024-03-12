import Card from './little_components/Card'
import SearchField from './little_components/SearchField'
import Text from './little_components/Text'
import { History, Search } from 'lucide-react'
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
import { useForm } from 'react-hook-form'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  setSearchText: (search: string) => void
}

export default function FilterBar({ setSearchText, ...props }: FilterBarProps) {
  const { register, handleSubmit } = useForm()

  function handleFilterProduts(data: any) {
    console.log(data)
  }

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
            <form>
              <Select.Root
                onSubmit={handleSubmit(handleFilterProduts)}
                label="Projetos"
                variant="withTextLabel"
                {...register('projects')}
              >
                <Select.Content value="PI">Portal Interno</Select.Content>
                <Select.Content value="MF">Mauá Food</Select.Content>
                <Select.Content value="PT">Portifólio</Select.Content>
                <Select.Content value="SF">Selfie Mauá</Select.Content>
                <Select.Content value="SM">SMILE</Select.Content>
                <Select.Content value="GM">Gameficação</Select.Content>
              </Select.Root>
              <Select.Root
                label="Área"
                variant="withTextLabel"
                {...register('area')}
              >
                <Select.Content value="FRONTEND">FRONT</Select.Content>
                <Select.Content value="BACKEND">BACK</Select.Content>
                <Select.Content value="INFRA">INFRA</Select.Content>
                <Select.Content value="UX_UI">UX/UI</Select.Content>
                <Select.Content value="INTERNAL">INTERNAL</Select.Content>
              </Select.Root>
              <Select.Root
                label="Ordenar Por"
                variant="withTextLabel"
                {...register('orderBy')}
              >
                <Select.Content value="new">Mais Recente</Select.Content>
                <Select.Content value="old">Mais Antigo</Select.Content>
              </Select.Root>
              <Button variant="form">
                Filtrar
                <Search className="h-4 w-4" />
              </Button>
              <PopoverArrow children={undefined} />
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
