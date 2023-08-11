import { createContext } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../@clean/shared/domain/entities/associated_action'

export type ActionContextType = {
  createAction: (action: Action) => Promise<Action>
  createAssociatedAction: (
    associatedAction: AssociatedAction
  ) => Promise<AssociatedAction>
}

const defaultContext: ActionContextType = {
  createAction: async (action: Action) => {
    return action
  },

  createAssociatedAction: async (associatedAction: AssociatedAction) => {
    return associatedAction
  }
}

export const ActionContext = createContext<ActionContextType>(defaultContext)
