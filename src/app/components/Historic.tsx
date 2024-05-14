/* eslint-disable indent */
import { useContext, useEffect, useMemo, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import FilterBar from './FilterBar'
import HistoricActionCard from './HistoricActionCard'
import { ActionContext } from '../contexts/action_context'
import Loader from './little_components/Loader'
import { stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'

interface FilterProps {
  [key: string]: string
  searchText: string
  project: string
  area: string
  orderBy: string
}

interface lastEvaluatedKey {
  actionId: string
  startDate: number
}

export default function Historic() {
  const [localHistory, setLocalHistory] = useState<Action[]>([])
  const [_lastEvaluatedKey, setLastEvaluatedKey] =
    useState<lastEvaluatedKey | null>()
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

  const loadHistoric = async (lastKey?: lastEvaluatedKey | undefined) => {
    const AMOUNT = 10
    try {
      const response = await getHistory(undefined, undefined, AMOUNT, lastKey)

      if (lastKey) {
        setLocalHistory((prev) => prev.concat(response.actions))
      } else {
        setLocalHistory(response.actions)
      }

      setLastEvaluatedKey(response.lastEvaluatedKey)
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  const filteredActions = useMemo(() => {
    if (
      filterProps.searchText === '' &&
      filterProps.project === '' &&
      filterProps.area === '' &&
      filterProps.orderBy === ''
    ) {
      return localHistory
    }

    let currentActions: Action[] = localHistory

    if (filterProps.searchText !== '') {
      const searchTextLowerCase = filterProps.searchText.toLowerCase()
      currentActions = currentActions.filter(
        (action) =>
          action.title.toLowerCase().includes(searchTextLowerCase) ||
          action.description.toLowerCase().includes(searchTextLowerCase) ||
          action.storyId.toString().includes(searchTextLowerCase)
      )
    }

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
  }, [localHistory, filterProps])

  useEffect(() => {
    clearFilter()
    if (localHistory.length === 0) {
      loadHistoric()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(filterProps)
  }, [filterProps])

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-2 py-20 pl-0 md:py-10 md:pl-14">
      <FilterBar
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        className="z-30"
      />
      {filteredActions.length !== 0 ? (
        <div className="flex h-fit w-full flex-col items-center gap-2 ">
          {filteredActions.map((actionUnit, index) => {
            return (
              <HistoricActionCard
                className="z-10 hover:z-20"
                key={index + '' + actionUnit.actionId}
                action={actionUnit}
                setHistory={setLocalHistory}
              />
            )
          })}
          <h1
            className={`pb-8 pt-8 text-skin-muted duration-150
            ${
              _lastEvaluatedKey !== null
                ? 'cursor-pointer hover:text-skin-base'
                : null
            }`}
            onClick={() => {
              if (_lastEvaluatedKey !== null) {
                loadHistoric(_lastEvaluatedKey)
              }
            }}
          >
            {_lastEvaluatedKey === null ? 'Sem Mais Itens' : 'Ver Mais'}
          </h1>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
