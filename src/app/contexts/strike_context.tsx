import type { Strike } from '../../@clean/shared/domain/entities/strike'
import {
  createContext,
  useState, type ReactNode
} from 'react'

export interface StrikeContextInterface {
  getStrikes: () => Promise<void>

  deleteStrike: (strikeId: string) => Promise<void>

  postStrike: (
    owner_user_id: string,
    target_user_id: string,
    occurred_date: number,
    category: string,
    description: string
  ) => Promise<void>
}

export const StrikeContext = createContext<StrikeContextInterface>({} as StrikeContextInterface)

export function StrikeContextProvider({ children }: { children: ReactNode }) {
  const [strikes, setStrikes] = useState<Strike[]>([])
  const getStrikes = async () => {
    try {
      const response = await fetch('/api/strikes')
      const data = await response.json()
      setStrikes(data)
    } catch (error) {
      console.error('Failed to find strikes', error)
    }
  }

  const postStrike = async (
    owner_user_id: string,
    target_user_id: string,
    occurred_date: number,
    category: string,
    description: string
  ) => {
    try {
      const novoStrike = {
        target_user_id,
        category,
        description,
        occurred_date,
        owner_user_id
      }
      await fetch('https://api/strikes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoStrike)
      })
    } catch (error) {
      console.error('Failed to Post Strike', error)
    }
  }
  const deleteStrike = async (strikeID: string) => {
    try {
      await fetch('api/strikes/' + strikeID, { method: 'DELETE' })
      setStrikes((currentStrikes) =>
        currentStrikes.filter((strike) => strike.strikeId !== strikeID)
      )
    } catch (error) {
      console.error('Failed to Delete Strike', error)
    }
  }

  return (
    <StrikeContext.Provider
      value={{
        getStrikes,
        postStrike,
        deleteStrike
      }}
    >
      {children}
    </StrikeContext.Provider>
  )
}
