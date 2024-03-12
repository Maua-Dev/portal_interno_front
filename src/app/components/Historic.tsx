/* eslint-disable indent */
import { useContext, useEffect, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import FilterBar from './FilterBar'
import HistoricActionCard from './HistoricActionCard'
import { ActionContext } from '../contexts/action_context'
import Loader from './little_components/Loader'

export default function Historic() {
  const [history, setHistory] = useState<Action[] | undefined>(undefined)
  const [searchText, setSearchText] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)
  const { getHistory } = useContext(ActionContext)

  const loadHistoricByRA = async () => {
    const response = await getHistory('19017310', 20)
    setHistory(response)
  }

  useEffect(() => {
    loadHistoricByRA()
  }, [])

  return (
    <div className="flex h-fit w-full flex-col items-center gap-2 bg-skin-fill py-10">
      <FilterBar className="z-30" setSearchText={setSearchText} />
      {history ? (
        history
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
                className="z-10 checked:z-20"
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
