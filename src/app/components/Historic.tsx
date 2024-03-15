/* eslint-disable indent */
import { useContext, useEffect, useMemo, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import FilterBar from './FilterBar'
import HistoricActionCard from './HistoricActionCard'
import { ActionContext } from '../contexts/action_context'
import Loader from './little_components/Loader'
import { STACK, stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'

interface FilterProps {
  searchText: string
  project: string
  area: string
  orderBy: string
}

export default function Historic() {
  const [history, setHistory] = useState<Action[] | undefined>(undefined)
  const [searchText, setSearchText] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)
  const { getHistory } = useContext(ActionContext)
  const [filterProps, setFilterProps] = useState<FilterProps>({
    searchText: '',
    project: '',
    area: '',
    orderBy: ''
  })
  const loadHistoricByRA = async () => {
    const response = await getHistory('19017310', 20)
    setHistory(response)
  }

  const filteredActions = useMemo(() => {
    if (filterProps.project === '' && filterProps.area === '') {
      return history
    }

    const responseFiltered = new Set<Action>(history)

    if (filterProps.project !== '') {
      history?.filter((action) => {
        if (action.projectCode !== filterProps.project) {
          responseFiltered.delete(action)
        }
      })
    }

    if (filterProps.area !== '') {
      history?.filter((action) => {
        if (!action.stackTags.includes(stackToEnum(filterProps.area))) {
          responseFiltered.delete(action)
        }
      })
    }

    return Array.from(responseFiltered)
  }, [filterProps])

  useEffect(() => {
    loadHistoricByRA()
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
