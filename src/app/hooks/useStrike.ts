import { useContext } from 'react'
import { StrikeContext } from '../contexts/strike_context'
export const useStrike = () => {
  const { postStrike, deleteStrike, getStrikes } = useContext(StrikeContext)
  return {
    postStrike,
    deleteStrike,
    getStrikes
  }
}
