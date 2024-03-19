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

export default function Historic() {
  const [history, setHistory] = useState<Action[] | undefined>(undefined)
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

  const loadHistoricByRA = async () => {
    const response = await getHistory('19017310', 20)
    setHistory(response)
  }

  const filteredActions = useMemo(() => {
    if (filterProps.project === '' && filterProps.area === '') {
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

    return Array.from(currentActions)
  }, [history, filterProps])

  useEffect(() => {
    clearFilter()
    loadHistoricByRA()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-fit w-full flex-col items-center gap-2 bg-skin-fill py-10">
      <FilterBar
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        className="z-30"
        setSearchText={setSearchText}
      />
      {filteredActions ? (
        filteredActions
          .filter((actionUnit) => {
            const searchTextLowerCase = searchText.toLowerCase()

            return searchTextLowerCase === ''
              ? actionUnit
              : actionUnit.title.toLowerCase().includes(searchTextLowerCase) ||
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
          })
      ) : (
        <Loader />
      )}
    </div>
  )
}
