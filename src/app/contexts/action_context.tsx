import { PropsWithChildren, createContext, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../@clean/shared/domain/entities/associated_action'
import {
  RegistryAction,
  containerAction
} from '../../@clean/shared/infra/containers/container_action'
import { CreateActionUsecase } from '../../@clean/modules/action/usecases/create_action_usecase'
import { CreateAssociatedActionUsecase } from '../../@clean/modules/action/usecases/create_associated_action_usecase'
import { GetHistoryUsecase } from '../../@clean/modules/action/usecases/get_history_usecase'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { UpdateActionUsecase } from '../../@clean/modules/action/usecases/update_action_usecase'

export type ActionContextType = {
  createAction: (action: Action) => Promise<Action | undefined>
  createAssociatedAction: (
    associatedAction: AssociatedAction
  ) => Promise<AssociatedAction | undefined>
  getHistory: (
    ra: string,
    amount?: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: string
  ) => Promise<Action[] | undefined>
  updateAction: (
    actionId: string,
    newOwnerRa?: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersRa?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE
  ) => Promise<Action | undefined>
}

const defaultContext: ActionContextType = {
  createAction: async (action: Action) => {
    return action
  },

  createAssociatedAction: async (associatedAction: AssociatedAction) => {
    return associatedAction
  },

  getHistory: async (
    ra: string,
    amount?: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: string
  ) => {
    return []
  },

  updateAction: async (
    actionId: string,
    newOwnerRa?: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersRa?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE
  ) => {
    return undefined
  }
}

export const ActionContext = createContext(defaultContext)

const createActionUsecase = containerAction.get<CreateActionUsecase>(
  RegistryAction.CreateActionUsecase
)

const createAssociatedActionUsecase =
  containerAction.get<CreateAssociatedActionUsecase>(
    RegistryAction.CreateAssociatedActionUsecase
  )

const getHistoryUsecase = containerAction.get<GetHistoryUsecase>(
  RegistryAction.GetHistoryUsecase
)

const updateActionUsecase = containerAction.get<UpdateActionUsecase>(
  RegistryAction.UpdateActionUsecase
)

export function ActionProvider({ children }: PropsWithChildren) {
  const [createdActions, setCreatedActions] = useState<Action[]>([])
  const [history, setHistory] = useState<Action[]>([])

  async function createAction(action: Action) {
    try {
      const createdAction = await createActionUsecase.execute(action)
      setCreatedActions([...createdActions, createdAction])
      return createdAction
    } catch (error: any) {
      console.error('Something went wrong on create action: ', error)
    }
  }

  async function createAssociatedAction(associatedAction: AssociatedAction) {
    try {
      const createdAssociatedAction =
        await createAssociatedActionUsecase.execute(associatedAction)
      return createdAssociatedAction
    } catch (error: any) {
      console.error('Something went wrong on create associated action: ', error)
    }
  }

  async function getHistory(
    ra: string,
    amount?: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: string
  ) {
    try {
      const { actions, lastId } = await getHistoryUsecase.execute(
        ra,
        amount as number,
        start,
        end,
        exclusiveStartKey
      )
      console.log('lastId: ', lastId)
      setHistory(actions)
      console.log(history)
      return actions
    } catch (error: any) {
      console.error('Something went wrong on get history: ', error)
    }
  }

  async function updateAction(
    actionId: string,
    newOwnerRa?: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersRa?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE
  ) {
    try {
      const updatedAction = await updateActionUsecase.execute(
        actionId,
        newOwnerRa,
        newStartDate,
        newEndDate,
        newDuration,
        newStoryId,
        newTitle,
        newDescription,
        newProjectCode,
        newAssociatedMembersRa,
        newStackTags,
        newActionTypeTag
      )
      console.log(updatedAction)
      return updatedAction
    } catch (error: any) {
      console.error('Something went wrong on update action: ', error)
    }
  }

  return (
    <ActionContext.Provider
      value={{
        createAction,
        createAssociatedAction,
        getHistory,
        updateAction
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
