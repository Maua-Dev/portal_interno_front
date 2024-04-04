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
import { GetAllMembersUsecase } from '../../@clean/modules/action/usecases/get_all_members_usecase'
import { Member } from '../../@clean/shared/domain/entities/member'
import { GetMember } from '../../@clean/modules/action/usecases/get_member_usecase'
import { historyResponse } from '../../@clean/shared/infra/repositories/action_repository_http'

interface lastEvaluatedKeyResponse {
  actionId: string
  startDate: number
}

export type ActionContextType = {
  createAction: (
    startDate: number,
    title: string,
    description: string,
    actionId: string,
    isValid: boolean,
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

  getMember: () => Promise<Member | undefined>

  getAllMembers: () => Promise<Member[] | undefined>

  membersSelected: Member[] | undefined

  setMembersSelected: Dispatch<SetStateAction<Member[] | undefined>>
}

const defaultContext: ActionContextType = {
  history: [],
  createAction: async (
    _startDate: number,
    _title: string,
    _description: string,
    _actionId: string,
    _isValid: boolean,
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
  getMember: async () => {
    return undefined
  },

  getAllMembers: async () => {
    return []
  },

  membersSelected: [],

  setMembersSelected: (_memberRa: SetStateAction<Member[] | undefined>) => {
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

const updateActionUsecase = containerAction.get<UpdateActionUsecase>(
  RegistryAction.UpdateActionUsecase
)
const getMembersUsecase = containerAction.get<GetMember>(
  RegistryAction.GetMemberUsecase
)

const getAllMembersUsecase = containerAction.get<GetAllMembersUsecase>(
  RegistryAction.GetAllMembersUsecase
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
  const [membersSelected, setMembersSelected] = useState<Member[] | undefined>(
    undefined
  )
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
    actionId: string,
    isValid: boolean,
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
        actionId,
        isValid,
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
      const { actions, lastEvaluatedKey } = await getHistoryUsecase.execute(
        start,
        end,
        amount,
        exclusiveStartKey
      )
      setFullHistory({ actions, lastEvaluatedKey })
      setHistory(actions)
      setFirstEvaluatedKey(
        actions[(activitiesPaginationCounter - 1) * 20].actionId
      )
      setLastEvaluatedKeyResponse(lastEvaluatedKey)
      setStartDate(lastEvaluatedKey.startDate)
      return fullHistory
    } catch (error: any) {
      console.error('Something went wrong on get history: ', error)
    }
    return fullHistory
  }

  async function getMember() {
    try {
      const member = await getMembersUsecase.execute()

      return member
    } catch (error: any) {
      console.log('Something went wrong on get member: ', error)
    }
  }

  async function getAllMembers(): Promise<Member[] | undefined> {
    try {
      const members = await getAllMembersUsecase.execute()

      return members.members
    } catch (error: any) {
      console.log('Something went wrong on get all members: ', error)
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
        getMember,
        getAllMembers,
        membersSelected,
        setMembersSelected
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
