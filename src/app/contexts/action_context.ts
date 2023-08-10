import { Action } from "@/@clean/shared/domain/entities/action"
import { AssociatedAction } from "@/@clean/shared/domain/entities/associated_action"
import { createContext } from "react"

export type ActionContextType = {
  createAction: (action: Action) => Promise<Action>
  createAssociatedAction: (associatedAction: AssociatedAction) => Promise<AssociatedAction>
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