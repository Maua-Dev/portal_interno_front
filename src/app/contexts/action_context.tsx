import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState
} from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import {
  RegistryAction,
  containerAction
} from '../../@clean/shared/infra/containers/container_action'
import { CreateActionUsecase } from '../../@clean/modules/action/usecases/create_action_usecase'
import { GetHistoryUsecase } from '../../@clean/modules/action/usecases/get_history_usecase'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { UpdateActionUsecase } from '../../@clean/modules/action/usecases/update_action_usecase'
import { historyResponse } from '../../@clean/shared/infra/repositories/action_repository_http'
import { UpdateActionValidationUsecase } from '../../@clean/modules/action/usecases/update_action_validation'
import { DeleteActionUsecase } from '../../@clean/modules/action/usecases/delete_action_usecase'

export interface ActionContextInterface {
  createAction(
    startDate: number,
    title: string,
    endDate: number,
    duration: number,
    projectCode: string,
    description?: string,
    storyId?: number,
    associatedMembersUserIds?: string[],
    stackTags?: STACK[],
    actionTypeTag?: ACTION_TYPE
  ): Promise<Action | undefined>

  getHistory(
    start?: number, // milissegundos da data do inicio das actions
    end?: number, // milissegundos da data de fim da action (vai até essa data contando ela mesma)
    amount?: number, // quantidade de actions retornadas
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ): Promise<historyResponse | undefined>

  updateAction(
    actionId: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number,
    newTitle?: string,
    newDescription?: string,
    newProjectCode?: string,
    newAssociatedMembersUserIds?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE,
    newisValid?: boolean
  ): Promise<Action | undefined>

  updateActionValidation(
    actionId: string,
    isValid: boolean
  ): Promise<Action | undefined>

  deleteAction(actionId: string): Promise<void>

  actionSuccess: string

  actionError: string

  setActionError: Dispatch<SetStateAction<string>>

  setActionSuccess: Dispatch<SetStateAction<string>>
}

const defaultContext: ActionContextInterface = {
  createAction: async () => {
    return undefined
  },

  getHistory: async () => {
    return undefined
  },

  updateAction: async () => {
    return undefined
  },

  updateActionValidation: async () => {
    return undefined
  },

  deleteAction: async () => {
    return undefined
  },

  actionError: '',

  actionSuccess: '',

  setActionError: () => {
    return undefined
  },
  setActionSuccess: () => {
    return undefined
  }
}

export const ActionContext = createContext(defaultContext)

const createActionUsecase = containerAction.get<CreateActionUsecase>(
  RegistryAction.CreateActionUsecase
)

const getHistoryUsecase = containerAction.get<GetHistoryUsecase>(
  RegistryAction.GetHistoryUsecase
)

const updateActionUsecase = containerAction.get<UpdateActionUsecase>(
  RegistryAction.UpdateActionUsecase
)

const updateActionValidationUsecase =
  containerAction.get<UpdateActionValidationUsecase>(
    RegistryAction.UpdateActionValidationUsecase
  )

const deleteActionUsecase = containerAction.get<DeleteActionUsecase>(
  RegistryAction.DeleteActionUsecase
)

export function ActionProvider({ children }: PropsWithChildren) {
  const [actionError, setActionError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  async function createAction(
    startDate: number,
    title: string,
    endDate: number,
    duration: number,
    projectCode: string,
    description?: string,
    storyId?: number,
    associatedMembersUserIds?: string[],
    stackTags?: STACK[],
    actionTypeTag?: ACTION_TYPE
  ) {
    try {
      const createdAction = await createActionUsecase.execute(
        startDate,
        title,
        endDate,
        duration,
        projectCode,
        description,
        storyId,
        associatedMembersUserIds,
        stackTags,
        actionTypeTag
      )
      setActionSuccess('Atividade criada com sucesso!')
      return createdAction
    } catch (error: any) {
      setActionError(error.message)
      throw new Error('Something went wrong on create action: ' + error.message)
    }
  }

  async function getHistory(
    start?: number, // milissegundos da data do inicio das actions
    end?: number, // milissegundos da data de fim da action (vai até essa data contando ela mesma)
    amount?: number, // quantidade de actions retornadas
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ) {
    try {
      const response = await getHistoryUsecase.execute(
        start,
        end,
        amount,
        exclusiveStartKey
      )

      return response
    } catch (error: any) {
      setActionError(error.message)
      console.log('Something went wrong on get history: ' + error.message)
    }
    return {
      actions: [],
      lastEvaluatedKey: {
        actionId: '',
        startDate: 0
      }
    }
  }

  async function updateAction(
    actionId: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number,
    newTitle?: string,
    newDescription?: string,
    newProjectCode?: string,
    newAssociatedMembersUserIds?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE,
    newisValid?: boolean
  ) {
    try {
      const updatedAction = await updateActionUsecase.execute(
        actionId,
        newStartDate,
        newEndDate,
        newDuration,
        newStoryId,
        newisValid,
        newTitle,
        newDescription,
        newProjectCode,
        newAssociatedMembersUserIds,
        newStackTags,
        newActionTypeTag
      )
      setActionSuccess('Atividade atualizada com sucesso!')
      return updatedAction
    } catch (error: any) {
      setActionError(error.message)
      throw new Error('Something went wrong on update action: ' + error.message)
    }
  }

  async function updateActionValidation(actionId: string, isValid: boolean) {
    try {
      const updatedAction = await updateActionValidationUsecase.execute(
        actionId,
        isValid
      )
      return updatedAction
    } catch (error: any) {
      console.error('Something went wrong on update action: ', error)
    }
  }

  async function deleteAction(actionId: string) {
    try {
      const deletedAction = await deleteActionUsecase.execute(actionId)
      setActionSuccess('Atividade deletada com sucesso!')
      return deletedAction
    } catch (error: any) {
      setActionError(error.message)
      throw new Error('Something went wrong on delete action: ' + error.message)
    }
  }

  return (
    <ActionContext.Provider
      value={{
        createAction,
        getHistory,
        updateAction,
        updateActionValidation,
        deleteAction,
        actionError,
        actionSuccess,
        setActionError,
        setActionSuccess
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
