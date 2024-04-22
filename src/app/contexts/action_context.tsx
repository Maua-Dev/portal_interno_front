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

interface lastEvaluatedKeyResponse {
  actionId: string
  startDate: number
}

export interface ActionContextInterface {
  createAction: (
    startDate: number,
    title: string,
    description: string,
    endDate: number,
    duration: number,
    projectCode: string,
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

  history: Action[]
  activitiesPaginationCounter: number
  setActivitiesPaginationCounter: (counter: number) => void
  firstEvaluatedKey?: string
  lastEvaluatedKeyResponse?: lastEvaluatedKeyResponse
  startDate?: number

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
}

const defaultContext: ActionContextInterface = {
  history: [],
  createAction: async (
    _startDate: number,
    _title: string,
    _description: string,
    _endDate: number,
    _duration: number,
    _projectCode: string,
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

  activitiesPaginationCounter: 1,
  setActivitiesPaginationCounter: () => {},
  lastEvaluatedKeyResponse: undefined,
  firstEvaluatedKey: undefined,

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

export function ActionProvider({ children }: PropsWithChildren) {
  const [createdActions, setCreatedActions] = useState<Action[]>([])
  const [action, setAction] = useState<Action | undefined>(undefined)
  const [history, setHistory] = useState<Action[]>([])
  const [activitiesPaginationCounter, setActivitiesPaginationCounter] =
    useState<number>(1)
  const [lastEvaluatedKeyResponse, setLastEvaluatedKeyResponse] =
    useState<lastEvaluatedKeyResponse>()
  const [firstEvaluatedKey, setFirstEvaluatedKey] = useState<string>()
  const [startDate, setStartDate] = useState<number>()
  const [fullHistory, setFullHistory] = useState<historyResponse>({
    actions: [],
    lastEvaluatedKey: {
      actionId: '',
      startDate: 0
    }
  })

  async function createAction(
    startDate: number,
    title: string,
    description: string,
    endDate: number,
    duration: number,
    projectCode: string,
    storyId?: number,
    associatedMembersUserIds?: string[],
    stackTags?: STACK[],
    actionTypeTag?: ACTION_TYPE
  ) {
    try {
      const createdAction = await createActionUsecase.execute(
        startDate,
        title,
        description,
        endDate,
        duration,
        projectCode,
        storyId,
        associatedMembersUserIds,
        stackTags,
        actionTypeTag
      )
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
      console.error('Something went wrong on get history: ', error)
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
      return updatedAction
    } catch (error: any) {
      console.error('Something went wrong on update action: ', error)
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

  return (
    <ActionContext.Provider
      value={{
        createAction,
        action,
        setAction,
        createAssociatedAction,
        getHistory,
        history,
        activitiesPaginationCounter,
        setActivitiesPaginationCounter,
        firstEvaluatedKey,
        lastEvaluatedKeyResponse,
        startDate,
        updateAction,
        updateActionValidation
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
