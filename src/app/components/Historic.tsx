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
  const { getHistory } = useContext(ActionContext)

  const loadHistoricByRA = async () => {
    const response = await getHistory('19017310', 20)
    setHistory(response)
  }

  useEffect(() => {
    loadHistoricByRA()
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center gap-2 bg-skin-fill py-10">
      <FilterBar setSearchText={setSearchText} />
      {history ? (
        history
          .filter((actionUnit) => {
            return searchText.toLowerCase() === ''
              ? actionUnit
              : actionUnit.title.toLowerCase().includes(searchText) ||
                  actionUnit.description.toLowerCase().includes(searchText)
          })
          .map((actionUnit, key) => {
            return <HistoricActionCard key={key} action={actionUnit} />
          })
      ) : (
        <Loader />
      )}
    </div>
  )
}
