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

interface lastEvaluatedKeyResponse {
  action_id: string
  start_date: number
}

export type ActionContextType = {
  createAction: (action: Action) => Promise<Action | undefined>

  createAssociatedAction: (
    associatedAction: AssociatedAction
  ) => Promise<AssociatedAction | undefined>

  action: Action | undefined

  setAction: Dispatch<SetStateAction<Action | undefined>>

  getHistory: (
    ra: string,
    amount?: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ) => Promise<Action[] | undefined>

  history: Action[]
  activitiesPaginationCounter: number
  setActivitiesPaginationCounter: (counter: number) => void
  firstEvaluatedKey?: string
  lastEvaluatedKeyResponse?: lastEvaluatedKeyResponse
  startDate?: number

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

  getMember: (ra: string) => Promise<Member | undefined>

  getAllMembers: () => Promise<Member[] | undefined>

  membersSelected: Member[] | undefined

  setMembersSelected: Dispatch<SetStateAction<Member[] | undefined>>
}

const defaultContext: ActionContextType = {
  history: [],
  createAction: async (action: Action) => {
    return action
  },

  createAssociatedAction: async (associatedAction: AssociatedAction) => {
    return associatedAction
  },

  action: undefined,

  setAction: (_action: SetStateAction<Action | undefined>) => {
    return undefined
  },

  getHistory: async (
    ra: string,
    amount?: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ) => {
    return []
  },

  activitiesPaginationCounter: 1,
  setActivitiesPaginationCounter: () => {},
  lastEvaluatedKeyResponse: undefined,
  firstEvaluatedKey: undefined,

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
  },
  getMember: async (_ra: string) => {
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
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ) {
    try {
      const { actions, lastEvaluatedKey } = await getHistoryUsecase.execute(
        ra,
        amount as number,
        start,
        end,
        exclusiveStartKey
      )
      console.log(lastEvaluatedKey)
      setHistory(actions)
      setFirstEvaluatedKey(
        actions[(activitiesPaginationCounter - 1) * 20].actionId
      )
      setLastEvaluatedKeyResponse(lastEvaluatedKey)
      setStartDate(lastEvaluatedKey.start_date)
      return actions
    } catch (error: any) {
      console.error('Something went wrong on get history: ', error)
    }
    return await history
  }

  async function getMember(ra: string) {
    try {
      const member = await getMembersUsecase.execute(ra)

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
