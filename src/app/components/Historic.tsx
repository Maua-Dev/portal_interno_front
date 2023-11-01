/* eslint-disable indent */
import { useContext, useEffect, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import FilterBar from './FilterBar'
import HistoricActionCard from './HistoricActionCard'
import { ActionContext } from '../contexts/action_context'
import Loader from './little_components/Loader'

export default function Historic() {
  const [history, setHistory] = useState<Action[] | undefined>(undefined)
  const { getHistory } = useContext(ActionContext)

  const handleHistoric = async () => {
    const response = await getHistory('19017310', 20)
    setHistory(response)
  }

  useEffect(() => {
    handleHistoric()
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <FilterBar />
      {history ? (
        history.map((actionUnit, key) => {
          return <HistoricActionCard key={key} action={actionUnit} />
        })
      ) : (
        <Loader />
      )}
    </div>
  )
}
