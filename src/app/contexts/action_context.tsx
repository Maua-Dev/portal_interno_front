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
import { GetAllMembersUsecase } from '../../@clean/modules/action/usecases/get_all_members_usecase'
import { Member } from '../../@clean/shared/domain/entities/member'

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

  getAllMembers: () => Promise<Member[] | undefined>
}

const defaultContext: ActionContextType = {
  createAction: async (action: Action) => {
    return action
  },

  createAssociatedAction: async (associatedAction: AssociatedAction) => {
    return associatedAction
  },

  getHistory: async (
    _ra: string,
    _amount?: number,
    _start?: number,
    _end?: number,
    _exclusiveStartKey?: string
  ) => {
    return []
  },

  getAllMembers: async () => {
    return []
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

const getAllMembersUsecase = containerAction.get<GetAllMembersUsecase>(
  RegistryAction.GetAllMembersUsecase
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
  ): Promise<Action[]> {
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
    } catch (error: any) {
      console.error('Something went wrong on get history: ', error)
    }
    return history
  }

  async function getAllMembers(): Promise<Member[] | undefined> {
    try {
      const members = await getAllMembersUsecase.execute()

      return members.members
    } catch (error: any) {
      console.log('Something went wrong on get all members: ', error)
    }
  }

  return (
    <ActionContext.Provider
      value={{
        createAction,
        createAssociatedAction,
        getHistory,
        getAllMembers
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
