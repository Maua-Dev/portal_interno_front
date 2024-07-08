/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
import Card from '../Card'
import SearchField from './components/SearchField'
import Text from './components/Text'
import { MoveLeft, Search, X, LucideIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../Historic/components/Popover'
import * as Select from './components/Select'
import Button from '../Historic/components/Button'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SlidersHorizontal } from 'lucide-react'
import { FilterTag } from '../Tags'
import { Tooltip } from '../Tooltip'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  icon: LucideIcon
  setFilterProps: (props: React.SetStateAction<FilterProps>) => void
  filterProps: FilterProps
  filterOptions: FilterOptions[]
}

export interface FilterProps {
  [filterName: string]: string
}

export interface FilterOptions {
  name: string
  label: string
  type: 'text' | 'select'
  options?: { label: string; value: string }[]
}

export default function FilterBar({
  label,
  icon: Icon,
  setFilterProps,
  filterProps,
  filterOptions,
  ...props
}: FilterBarProps) {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  const emptyFilterProps = filterOptions.reduce((acc, option) => {
    acc[option.name] = ''
    return acc
  }, {} as FilterProps)

  const [localFilterProps, setLocalFilterProps] =
    useState<FilterProps>(emptyFilterProps)

  function filter() {
    setFilterProps(localFilterProps)
    setPopUpOpen(false)
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
            <Tooltip placeholder="Voltar">
              <Button
                variant="icon"
                onClick={() => {
                  setSearchOpen(false)
                }}
              >
                <MoveLeft />
              </Button>
            </Tooltip>
          ) : (
            <>
              <Icon className="h-8 w-8" />
              <Text size="2xl" className="font-semibold">
                {label}
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
        <Tooltip placeholder="Pesquisar">
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
        </Tooltip>
        <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
          <PopoverTrigger asChild>
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
          </PopoverTrigger>
          <PopoverContent>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setPopUpOpen(false)
              }}
              className="pt-10"
            >
              {filterOptions.map((filterOption, index) => {
                if (filterOption.type === 'select') {
                  return (
                    <Select.Root
                      key={filterOption.name + index}
                      label={filterOption.label}
                      name={filterOption.name}
                      variant="withTextLabel"
                      onChange={handleSelectFilterData}
                    >
                      {filterOption.options?.map((option, index) => {
                        return (
                          <Select.Content
                            key={option.value + index}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Content>
                        )
                      })}
                    </Select.Root>
                  )
                }
              })}
              <Button variant="form" className="mt-4" onClick={filter}>
                Filtrar
                <Search className="h-4 w-4" />
              </Button>
              <PopoverArrow children={undefined} />
              <X
                className="absolute right-2.5 top-3 h-5 cursor-pointer"
                onClick={() => {
                  setPopUpOpen(false)
                }}
              />
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  )
}
