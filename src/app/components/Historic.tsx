/* eslint-disable indent */
import { useContext, useEffect, useMemo, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import FilterBar from './FilterBar'
import HistoricActionCard from './HistoricActionCard'
import { ActionContext } from '../contexts/action_context'
import Loader from './little_components/Loader'
import { STACK, stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'

interface FilterProps {
  [key: string]: string
  searchText: string
  project: string
  area: string
  orderBy: string
}

const action: Action = new Action({
  userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
  startDate: 1689955200000,
  endDate: 1689964020000,
  duration: 8820000,
  actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
  isValid: true,
  title: 'Imp. Navbar',
  actionTypeTag: ACTION_TYPE.CODE,
  projectCode: 'PT',
  stackTags: [STACK.FRONTEND],
  storyId: 150,
  description: 'Navbar codada'
})

interface lastEvaluatedKey {
  actionId: string
  startDate: number
}

export default function Historic() {
  const [history, setHistory] = useState<Action[]>([])
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<lastEvaluatedKey>()
  const [searchText, setSearchText] = useState<string>('')
  const { getHistory } = useContext(ActionContext)
  const [filterProps, setFilterProps] = useState<FilterProps>({
    searchText: '',
    project: '',
    area: '',
    orderBy: ''
  })

  const clearFilter = () => {
    setFilterProps({
      searchText: '',
      project: '',
      area: '',
      orderBy: ''
    })
  }

  const loadHistoric = async () => {
    const response = await getHistory(
      undefined,
      undefined,
      undefined,
      undefined
    )
    setLastEvaluatedKey(response.lastEvaluatedKey)
    setHistory(response.actions)
  }

  const loadMoreHistoric = async () => {
    if (lastEvaluatedKey !== undefined) {
      const response = await getHistory(
        undefined,
        undefined,
        1,
        lastEvaluatedKey
      )
      setLastEvaluatedKey(response.lastEvaluatedKey)

      setHistory((prevHistory) => prevHistory.concat(response.actions))
      console.log('historico' + history)
    }
  }

  const filteredActions = useMemo(() => {
    if (
      filterProps.project === '' &&
      filterProps.area === '' &&
      filterProps.orderBy === ''
    ) {
      return history
    }

    let currentActions: Action[] = [...(history || [])]

    if (filterProps.project) {
      currentActions = currentActions.filter(
        (action) => action.projectCode === filterProps.project
      )
    }

    if (filterProps.area) {
      currentActions = currentActions.filter((action) =>
        action.stackTags.includes(stackToEnum(filterProps.area))
      )
    }

    switch (filterProps.orderBy) {
      case 'OLD':
        currentActions.sort(
          (a, b) =>
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        )
        break
      case 'NEW':
        currentActions.sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        )
        break
      case 'BIGGER':
        currentActions.sort((a, b) => b.duration - a.duration)
        break
      case 'SMALLER':
        currentActions.sort((a, b) => a.duration - b.duration)
        break
      default:
        break
    }

    return currentActions
  }, [history, filterProps])

  useEffect(() => {
    clearFilter()
    if (history.length === 0) {
      loadHistoric()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHistory])

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-2 py-20 pl-0 md:py-10 md:pl-14">
      <FilterBar
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        className="z-30"
        setSearchText={setSearchText}
      />
      {filteredActions.length !== 0 ? (
        <div className="flex h-fit w-full flex-col items-center gap-2 ">
          {filteredActions
            .filter((actionUnit) => {
              const searchTextLowerCase = searchText.toLowerCase()

              return searchTextLowerCase === ''
                ? actionUnit
                : actionUnit.title
                    .toLowerCase()
                    .includes(searchTextLowerCase) ||
                    actionUnit.description
                      .toLowerCase()
                      .includes(searchTextLowerCase) ||
                    actionUnit.storyId.toString().includes(searchTextLowerCase)
            })
            .map((actionUnit, key) => {
              return (
                <HistoricActionCard
                  className="z-10 hover:z-20"
                  key={key}
                  action={actionUnit}
                />
              )
            })}
          <h1
            className="cursor-pointer pb-8 pt-8 text-skin-muted duration-150 hover:text-skin-base"
            onClick={loadMoreHistoric}
          >
            Mostrar Mais
          </h1>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
