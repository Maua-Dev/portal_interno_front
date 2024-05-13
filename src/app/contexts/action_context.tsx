import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState
} from 'react'
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
import { historyResponse } from '../../@clean/shared/infra/repositories/action_repository_http'
import { UpdateActionValidationUsecase } from '../../@clean/modules/action/usecases/update_action_validation'
import { DeleteActionUsecase } from '../../@clean/modules/action/usecases/delete_action_usecase'

export interface ActionContextInterface {
  createAction: (
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
  ) => Promise<Action | undefined>

  createAssociatedAction: (
    associatedAction: AssociatedAction
  ) => Promise<AssociatedAction | undefined>

  action: Action | undefined

  setAction: Dispatch<SetStateAction<Action | undefined>>

  getHistory: (
    start?: number, // milissegundos da data do inicio das actions
    end?: number, // milissegundos da data de fim da action (vai até essa data contando ela mesma)
    amount?: number, // quantidade de actions retornadas
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ) => Promise<historyResponse>

  updateAction: (
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
  ) => Promise<Action | undefined>

  updateActionValidation: (
    actionId: string,
    isValid: boolean
  ) => Promise<Action | undefined>

  deleteAction: (actionId: string) => Promise<void>

  actionError: string

  actionSuccess: string

  setActionError: Dispatch<SetStateAction<string>>

  setActionSuccess: Dispatch<SetStateAction<string>>
}

const defaultContext: ActionContextInterface = {
  createAction: async (
    _startDate: number,
    _title: string,
    _endDate: number,
    _duration: number,
    _projectCode: string,
    _description?: string,
    _storyId?: number,
    _associatedMembersUserIds?: string[],
    _stackTags?: STACK[],
    _actionTypeTag?: ACTION_TYPE
  ) => {
    return undefined
  },

  createAssociatedAction: async (associatedAction: AssociatedAction) => {
    return associatedAction
  },

  action: undefined,

  setAction: (_action: SetStateAction<Action | undefined>) => {
    return undefined
  },

  getHistory: async (
    _start?: number,
    _end?: number,
    _amount?: number,
    _exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ) => {
    return {
      actions: [],
      lastEvaluatedKey: {
        actionId: '',
        startDate: 0
      }
    }
  },

  updateAction: async (
    _actionId: string,
    _newStartDate?: number,
    _newEndDate?: number,
    _newDuration?: number,
    _newStoryId?: number,
    _newTitle?: string,
    _newDescription?: string,
    _newProjectCode?: string,
    _newAssociatedMembersUserIds?: string[],
    _newStackTags?: STACK[],
    _newActionTypeTag?: ACTION_TYPE,
    _newisValid?: boolean
  ) => {
    return undefined
  },

  updateActionValidation: async (_actionId: string, _isValid: boolean) => {
    return undefined
  },

  deleteAction: async (_actionId: string) => {
    return undefined
  },

  actionError: '',
  actionSuccess: '',
  setActionError: (_actionError: SetStateAction<string>) => {
    return undefined
  },
  setActionSuccess: (_actionSuccess: SetStateAction<string>) => {
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

const updateActionValidationUsecase =
  containerAction.get<UpdateActionValidationUsecase>(
    RegistryAction.UpdateActionValidationUsecase
  )

const deleteActionUsecase = containerAction.get<DeleteActionUsecase>(
  RegistryAction.DeleteActionUsecase
)

export function ActionProvider({ children }: PropsWithChildren) {
  const [createdActions, setCreatedActions] = useState<Action[]>([])
  const [action, setAction] = useState<Action | undefined>(undefined)
  const [actionError, setActionError] = useState<string>('')
  const [actionSuccess, setActionSuccess] = useState<string>('')

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
      setCreatedActions([...createdActions, createdAction])
      setActionSuccess('Atividade criada com sucesso!')
      return createdAction
    } catch (error: any) {
      setActionError(error.message)
      throw new Error('Something went wrong on create action: ' + error.message)
    }
  }

  async function createAssociatedAction(associatedAction: AssociatedAction) {
    try {
      const createdAssociatedAction =
        await createAssociatedActionUsecase.execute(associatedAction)
      return createdAssociatedAction
    } catch (error: any) {
      console.log('Something went wrong on create associated action: ', error)
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
      console.log(updatedAction)
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
        action,
        setAction,
        createAssociatedAction,
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
