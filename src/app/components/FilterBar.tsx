/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
import Card from './little_components/Card'
import SearchField from './little_components/SearchField'
import Text from './little_components/Text'
import { MoveLeft, History, Search, X } from 'lucide-react'
import HoverCard from './little_components/HoverCard'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../components/little_components/Popover'
import * as Select from '../components/little_components/Select'
import Button from './little_components/Button'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SlidersHorizontal } from 'lucide-react'
import { FilterTag } from './little_components/Tags'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  setFilterProps: (props: React.SetStateAction<FilterProps>) => void
  filterProps: FilterProps
}

interface FilterProps {
  [filterName: string]: string
  searchText: string
  project: string
  area: string
  orderBy: string
}

export default function FilterBar({
  setFilterProps,
  filterProps,
  ...props
}: FilterBarProps) {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  const emptyFilterProps = {
    searchText: '',
    project: '',
    area: '',
    orderBy: ''
  }

  const [localFilterProps, setLocalFilterProps] =
    useState<FilterProps>(emptyFilterProps)

  function filter() {
    setFilterProps(localFilterProps)
  }

  function clearFilters() {
    setFilterProps(emptyFilterProps)
    setLocalFilterProps(emptyFilterProps)
  }

  function handleInputFilterData(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setFilterProps((prev) => ({
      ...prev,
      searchText: value
    }))
  }

  function handleSelectFilterData(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setLocalFilterProps((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function clearFilterData(key: string) {
    setFilterProps((prev) => ({
      ...prev,
      [key]: ''
    }))
  }

  function renderFilterTags(
    key: string,
    value: any,
    index: number
  ): JSX.Element {
    if (value !== '' && key !== 'searchText') {
      return (
        <FilterTag
          key={index}
          label={value}
          className={filterProps[key] === '' ? 'hidden' : ''}
          clearFilterProp={() => {
            clearFilterData(key)
          }}
        />
      )
    }
    return <></>
  }

  useEffect(() => {
    setTimeout(() => {
      clearFilters()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {searchOpen ? (
            <HoverCard placeholder={'Voltar'}>
              <Button
                variant="icon"
                onClick={() => {
                  setSearchOpen(false)
                }}
              >
                <MoveLeft />
              </Button>
            </HoverCard>
          ) : (
            <>
              <History className="h-8 w-8" />
              <Text size="2xl" className="font-semibold">
                Histórico
              </Text>
            </>
          )}
        </div>
        <div>
          <SearchField
            placeholder="Pesquisar"
            className={`${
              searchOpen ? 'block' : 'hidden'
            } w-4/5 sm:w-64 md:block lg:w-72`}
            onChange={handleInputFilterData}
          />
        </div>
        <div className="hidden min-w-full flex-row gap-4 lg:flex">
          {filterProps !== emptyFilterProps
            ? Object.entries(filterProps).map(([key, value], index) => {
                return (
                  <div key={key + '' + index}>
                    {renderFilterTags(key, value, index)}
                  </div>
                )
              })
            : null}
        </div>
      </div>
      <div className="flex h-full flex-row">
        <HoverCard placeholder="Pesquisar">
          <Button
            variant="default"
            className={`h-fit w-fit p-2 md:hidden ${
              searchOpen ? 'hidden' : ''
            }`}
            onClick={() => {
              setSearchOpen(true)
            }}
          >
            <Search className="h-5 text-skin-base" />
          </Button>
        </HoverCard>
        <Popover open={popUpOpen}>
          <PopoverTrigger>
            <HoverCard placeholder="Filtrar" className="md:hidden">
              <Button
                variant="default"
                className="p-2 md:px-4"
                onClick={() => {
                  clearFilters()
                  setPopUpOpen((prev) => !prev)
                }}
              >
                <p className="hidden md:block">Filtro</p>
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </HoverCard>
          </PopoverTrigger>
          <PopoverContent>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setPopUpOpen(false)
              }}
              className="pt-10"
            >
              <Select.Root
                label="Projetos"
                name="project"
                variant="withTextLabel"
                onChange={handleSelectFilterData}
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
                onChange={handleSelectFilterData}
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
                onChange={handleSelectFilterData}
              >
                <Select.Content value="NEW">Mais Recente</Select.Content>
                <Select.Content value="OLD">Mais Antigo</Select.Content>
                <Select.Content value="BIGGER">Maior Duração</Select.Content>
                <Select.Content value="SMALLER">Menor Duração</Select.Content>
              </Select.Root>
              <Button variant="form" className="mt-4" onClick={filter}>
                Filtrar
                <Search className="h-4 w-4" />
              </Button>
              <PopoverArrow children={undefined} />
              <X
                className="absolute right-2.5 top-3 h-5 cursor-pointer"
                onClick={() => {
                  setPopUpOpen(false)
                  clearFilters()
                }}
              />
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
