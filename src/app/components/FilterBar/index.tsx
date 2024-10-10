/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
import Card from '../Card'
import SearchField from './components/SearchField'
import Text from './components/Text'
import { MoveLeft, Search, X, LucideIcon, Eraser } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../Historic/components/Popover'
import * as Select from './components/Select'
import Button from '../Historic/components/Button'
import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { twMerge } from 'tailwind-merge'
import { SlidersHorizontal } from 'lucide-react'
import { FilterTag } from '../Tags'
import { Tooltip } from '../Tooltip'
import { ProjectContext } from '../../contexts/project_context.tsx'
import { useDarkMode } from '../../hooks/useDarkMode.ts'

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  icon: LucideIcon
  setFilterProps: (props: React.SetStateAction<FilterProps>) => void
  filterProps: FilterProps
  filterOptions: FilterOptions[]
  adicionalButton?: ReactNode | undefined
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
  adicionalButton,
  ...props
}: FilterBarProps) {
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [updatedFilterOptions, setUpdatedFilterOptions] =
    useState<FilterOptions[]>(filterOptions)
  const { getAllProjects } = useContext(ProjectContext)
  const { darkMode } = useDarkMode()

  const emptyFilterProps = filterOptions.reduce((acc, option) => {
    acc[option.name] = ''
    return acc
  }, {} as FilterProps)

  const [localFilterProps, setLocalFilterProps] =
    useState<FilterProps>(emptyFilterProps)

  const updateProjectOptions = async () => {
    const projects = await getAllProjects()

    const projectOptions = projects.map((project) => ({
      label: project.name,
      value: project.code
    })) // Fetched projects options

    const finalFilterOptions = filterOptions.map((option) => {
      if (option.name === 'project') {
        return {
          ...option,
          options: projectOptions // Add fetched projects to options
        }
      }
      return option
    })

    setUpdatedFilterOptions(finalFilterOptions)
  }

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
    setLocalFilterProps((prev) => ({
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

  const hasFilterProps = useMemo(() => {
    return Object.values(filterProps).some((value) => value !== '')
  }, [filterProps, popUpOpen])

  const activeFiltersCount = useMemo(() => {
    return Object.values(filterProps).filter((value) => value !== '').length
  }, [filterProps, popUpOpen])

  useEffect(() => {
    updateProjectOptions()
  }, [filterOptions, getAllProjects])

  return (
    <Card
      variant="lg"
      className={twMerge(
        'flex h-fit flex-row items-center justify-between gap-3 rounded-t-lg shadow-sm shadow-gray-500 duration-150 ease-in',
        props.className
      )}
    >
      <div className="flex flex-row items-center md:gap-5">
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
            } w-full sm:w-64 md:block lg:w-72`}
            onChange={handleInputFilterData}
          />
        </div>
      </div>
      <div
        className={`flex h-full w-fit flex-row items-center justify-end gap-2 md:w-full md:gap-0`}
      >
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
        <Button
          variant={'default'}
          className={`${
            hasFilterProps
              ? `mr-4 hidden items-center xl:flex ${
                  darkMode
                    ? 'text-skin-muted'
                    : 'text-zinc-400 hover:text-skin-muted'
                }`
              : 'hidden'
          }`}
          onClick={clearFilters}
        >
          <Eraser className={'h-5 w-5 text-xs'} />
          <p className={'text-base'}>Limpar</p>
        </Button>
        <div
          className={`flex flex-row items-center gap-2 md:justify-end md:gap-0 md:p-2 ${
            hasFilterProps
              ? 'rounded-sm transition-all duration-300 ease-in-out md:pl-3 lg:border-dashed xl:border xl:border-skin-muted'
              : ''
          }`}
        >
          <div className="hidden w-fit flex-row gap-4 xl:flex">
            {activeFiltersCount < 4 ? (
              Object.entries(filterProps).map(([key, value], index) =>
                value ? (
                  <div key={key + '' + index}>
                    {renderFilterTags(key, value, index)}
                  </div>
                ) : null
              )
            ) : (
              <div className={''}>
                <p>{activeFiltersCount.toString() + ' selecionados'}</p>
              </div>
            )}
          </div>
          <div
            className={`${
              hasFilterProps
                ? 'mx-1 ml-3 hidden h-7 w-0 border border-dashed  border-skin-muted xl:block'
                : 'hidden'
            }`}
          />
          <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                className="p-2 md:px-4"
                onClick={() => {
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
                {updatedFilterOptions.map((filterOption, index) => {
                  if (filterOption.type === 'select') {
                    return (
                      <Select.Root
                        key={filterOption.name + index}
                        label={filterOption.label}
                        name={filterOption.name}
                        variant="withTextLabel"
                        onChange={handleSelectFilterData}
                        value={localFilterProps[filterOption.name]}
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
                <div className={'flex w-full flex-row gap-3'}>
                  <Button
                    variant="default"
                    className={`mt-4 flex w-full flex-row items-center lg:hidden ${
                      darkMode
                        ? 'text-skin-muted'
                        : 'text-zinc-400 hover:text-skin-muted'
                    }`}
                    onClick={() => {
                      clearFilters()
                      setPopUpOpen(false)
                    }}
                  >
                    <Eraser className={'h-5 w-5 text-xs'} />
                    <p className={'text-base'}>Limpar</p>
                  </Button>
                  <Button
                    variant="form"
                    className="mt-4 w-full"
                    onClick={filter}
                  >
                    Filtrar
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
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
      </div>
      <div className={!adicionalButton ? 'hidden' : undefined}>
        {adicionalButton}
      </div>
    </Card>
  )
}
