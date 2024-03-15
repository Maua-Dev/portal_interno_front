import Card from './little_components/Card'
import SearchField from './little_components/SearchField'
import Text from './little_components/Text'
import { History, Search, X, Filter } from 'lucide-react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../components/little_components/Popover'
import * as Select from '../components/little_components/Select'
import Button from './little_components/Button'
import { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SlidersHorizontal } from 'lucide-react'
import { FilterTag } from './little_components/Tags'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  setSearchText: (search: string) => void
  setFilterProps: (props: React.SetStateAction<FilterProps>) => void
  filterProps: FilterProps
}

interface FilterProps {
  searchText: string
  project: string
  area: string
  orderBy: string
}

export default function FilterBar({
  setSearchText,
  setFilterProps,
  filterProps,
  ...props
}: FilterBarProps) {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false)

  function clearFilter() {
    setFilterProps({
      searchText: '',
      project: '',
      area: '',
      orderBy: ''
    })
  }

  function handleFilterData(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFilterProps((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    setTimeout(() => {
      clearFilter()
    }, 1000)
  }, [])

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
        <FilterTag label="Portal Interno" className="hidden lg:flex" />
      </div>
      <div className="flex h-full flex-row gap-5">
        <Popover open={popUpOpen}>
          <PopoverTrigger>
            <Button
              variant="default"
              onClick={() => {
                clearFilter()
                setPopUpOpen((prev) => !prev)
              }}
            >
              Filtro
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                console.log(filterProps)
                setPopUpOpen(false)
              }}
              className="pt-10"
            >
              <Select.Root
                label="Projetos"
                name="project"
                variant="withTextLabel"
                onChange={handleFilterData}
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
                name="area"
                variant="withTextLabel"
                onChange={handleFilterData}
              >
                <Select.Content value="FRONTEND">FRONT</Select.Content>
                <Select.Content value="BACKEND">BACK</Select.Content>
                <Select.Content value="INFRA">INFRA</Select.Content>
                <Select.Content value="UX_UI">UX/UI</Select.Content>
                <Select.Content value="INTERNAL">INTERNAL</Select.Content>
              </Select.Root>
              <Select.Root
                label="Ordenar Por"
                name="orderBy"
                variant="withTextLabel"
                onChange={handleFilterData}
              >
                <Select.Content value="new">Mais Recente</Select.Content>
                <Select.Content value="old">Mais Antigo</Select.Content>
              </Select.Root>
              <Button variant="form" className="mt-4">
                Filtrar
                <Search className="h-4 w-4" />
              </Button>
              <PopoverArrow children={undefined} />
              <X
                className="absolute right-2.5 top-3 h-5 cursor-pointer"
                onClick={() => {
                  setPopUpOpen(false)
                  clearFilter()
                }}
              />
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}