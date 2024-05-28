import { ReactNode, createContext, useState } from 'react'
import { STACK } from '../../../../@clean/shared/domain/enums/stack_enum'

interface ActionModalContextInterface {
  currentMembers: string[]
  setCurrentMembers: (members: string[]) => void
  currentStackTags: STACK[]
  setCurrentStackTags: (stackTags: STACK[]) => void
}

export const ActionModalContext = createContext<ActionModalContextInterface>({
  currentMembers: [],
  currentStackTags: [],
  setCurrentMembers: () => {},
  setCurrentStackTags: () => {}
})

export const ActionModalProvider = ({ children }: { children: ReactNode }) => {
  const [currentMembers, setCurrentMembers] = useState<string[]>([])
  const [currentStackTags, setCurrentStackTags] = useState<STACK[]>([])

  return (
    <ActionModalContext.Provider
      value={{
        currentMembers,
        setCurrentMembers,
        currentStackTags,
        setCurrentStackTags
      }}
    >
      {children}
    </ActionModalContext.Provider>
  )
}
