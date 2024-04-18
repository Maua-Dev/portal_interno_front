import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'
import { raFormatterFromJson } from '../../../../app/utils/functions/formatters'
import { ACTION_TYPE } from '../../domain/enums/action_type_enum'
import { STACK } from '../../domain/enums/stack_enum'
import { JsonProps, Member } from '../../domain/entities/member'
import { stackFormatter, stackToEnum } from '../../domain/enums/stack_enum'
import { ROLE, roleToEnum } from '../../domain/enums/role_enum'
import { COURSE, courseToEnum } from '../../domain/enums/course_enum'
import { activeToEnum } from '../../domain/enums/active_enum'

interface getHistoryRawResponse {
  actions: [
    {
      user_id: string
      start_date: number
      end_date: number
      duration: number
      action_id: string
      is_valid: boolean
      story_id?: number
      title: string
      description?: string
      project_code: string
      associated_members_user_ids?: string[]
      stack_tags: string[]
      action_type_tag: string
    }
  ]
  last_evaluated_key: {
    action_id: string
    start_date: number
  }
  message: string
}

export interface historyResponse {
  actions: Action[]
  lastEvaluatedKey: {
    actionId: string
    startDate: number
  }
}

interface createActionBodyRequest {
  start_date: number
  title: string
  description: string | ''
  action_id: string
  is_valid: boolean
  end_date: number
  duration: number
  project_code: string
  story_id?: number
  associated_members_user_ids?: string[]
  stack_tags?: string[]
  action_type_tag?: string
}

interface updateActionBodyRequest {
  action_id: string
  new_start_date?: number
  new_end_date?: number
  new_duration?: number
  new_story_id?: number
  new_associated_members_user_ids?: string[]
  new_title?: string
  new_description?: string
  new_project_code?: string
  new_stack_tags?: string[]
  new_action_type_tag?: string
  new_is_valid?: boolean
}

interface createActionRawResponse {
  action: Action
  message: string
}

interface updateActionRawResponse {
  action: Action
  message: string
}

// interface projectRawResponse {
//   code: string
//   name: string
//   description: string
//   po_user_id: string
//   scrum_user_id: string
//   start_date: number
//   members_user_ids: number[]
//   photos: string[]
// }

interface memberRawResponse {
  member: {
    name: string
    email_dev: string
    email: string
    ra: string
    role: string
    stack: string
    year: number
    cellphone: string
    course: string
    hired_date: number
    deactivated_date?: number
    active: string
    user_id: string
  }
}

export interface getAllMembersRawResponse {
  members: memberRawResponse[]
}

export class ActionRepositoryHttp implements IActionRepository {
  constructor(private http: AxiosInstance) {}
  async updateAction(
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
  ): Promise<Action> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const body: updateActionBodyRequest = {
        action_id: actionId,
        new_start_date: newStartDate ? newStartDate : undefined,
        new_end_date: newEndDate ? newEndDate : undefined,
        new_duration: newDuration ? newDuration : undefined,
        new_story_id: newStoryId ? newStoryId : undefined,
        new_is_valid: newisValid ? newisValid : undefined,
        new_associated_members_user_ids: newAssociatedMembersUserIds
          ? newAssociatedMembersUserIds
          : undefined,
        new_title: newTitle ? newTitle : undefined,
        new_description: newDescription ? newDescription : undefined,
        new_project_code: newProjectCode ? newProjectCode : undefined,
        new_stack_tags: newStackTags ? stackFormatter(newStackTags) : undefined,
        new_action_type_tag: newActionTypeTag
          ? newActionTypeTag.toString()
          : undefined
      }

      const response = await this.http.put<updateActionRawResponse>(
        '/update-action',
        body,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      return response.data.action
    } catch (error: any) {
      throw new Error('Error updating action: ' + error.message)
    }
  }

  async getHistoryActions(
    amount?: number | undefined,
    start?: number | undefined,
    end?: number | undefined,
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ): Promise<historyResponse> {
    const token = localStorage.getItem('idToken')

    if (!token) {
      throw new Error('Token not found')
    }

    const response: historyResponse = {
      actions: [],
      lastEvaluatedKey: {
        actionId: '',
        startDate: 0
      }
    }
    try {
      if (amount && start && end && exclusiveStartKey) {
        const firstCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            start,
            end,
            amount,
            exclusiveStartKey
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        for (let i = 0; i < firstCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(firstCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          actionId: firstCase.data.last_evaluated_key.action_id,
          startDate: firstCase.data.last_evaluated_key.start_date
        }
      } else if (amount && start && end) {
        const secondCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            start,
            end,
            amount
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        for (let i = 0; i < secondCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(secondCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          actionId: secondCase.data.last_evaluated_key.action_id,
          startDate: secondCase.data.last_evaluated_key.start_date
        }
      } else if (amount && exclusiveStartKey) {
        const thirdCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            amount,
            exclusive_start_key: exclusiveStartKey
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        for (let i = 0; i < thirdCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(thirdCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          actionId: thirdCase.data.last_evaluated_key.action_id,
          startDate: thirdCase.data.last_evaluated_key.start_date
        }
      } else if (amount) {
        const fourthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            amount
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        for (let i = 0; i < fourthCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(fourthCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          actionId: fourthCase.data.last_evaluated_key.action_id,
          startDate: fourthCase.data.last_evaluated_key.start_date
        }
      } else {
        const fifthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        for (let i = 0; i < fifthCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(fifthCase.data.actions[i]))
        }
      }

      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createAction(
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
  ): Promise<Action> {
    const token = localStorage.getItem('idToken')
    if (!token) {
      throw new Error('Token not found')
    }
    const stackTagsFormatted = stackFormatter(stackTags as STACK[]) || []

    const bodyRequest: createActionBodyRequest = {
      start_date: startDate,
      story_id: storyId,
      title: title,
      description: description,
      action_id: actionId,
      is_valid: isValid,
      end_date: endDate,
      duration: duration,
      project_code: projectCode,
      associated_members_user_ids: associatedMembersUserIds,
      stack_tags: stackTagsFormatted,
      action_type_tag: actionTypeTag?.toString() || undefined
    }

    try {
      const response = await this.http.post<createActionRawResponse>(
        '/create-action',
        bodyRequest,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      return response.data.action
    } catch (error: any) {
      throw new Error('Error creating action: ' + error.message)
    }
  }

  async getMember(): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) {
        throw new Error('Token not found')
      }
      const response = await this.http.get<JsonProps>('/get-member', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      const member = Member.fromJSON(response.data)
      return member
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
    }
  }

  async getAllMembers(): Promise<Member[]> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.get<getAllMembersRawResponse>(
        '/get-all-members',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const membersArray: Member[] = []

      response.data.members.map((member) => {
        const memberUnit: memberRawResponse = member

        return membersArray.push(
          new Member({
            name: memberUnit.member.name,
            emailDev: memberUnit.member.email_dev,
            email: memberUnit.member.email,
            ra: raFormatterFromJson(memberUnit.member.ra),
            role: roleToEnum(memberUnit.member.role),
            stack: stackToEnum(memberUnit.member.stack),
            year: memberUnit.member.year,
            cellphone: memberUnit.member.cellphone,
            course: courseToEnum(memberUnit.member.course),
            hiredDate: memberUnit.member.hired_date,
            deactivatedDate: memberUnit.member.deactivated_date,
            active: activeToEnum(memberUnit.member.active),
            userId: memberUnit.member.user_id
          })
        )
      })

      return membersArray
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
    }
  }

  async createMember(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<JsonProps>(
        '/create-member',
        {
          ra,
          email_dev: emailDev,
          role,
          stack,
          year,
          cellphone,
          course,
          hired_date: 1713141151000
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      // console.log(response.data)

      const member = Member.fromJSON(response.data)

      return member
    } catch (error: any) {
      throw new Error(error.response.data)
    }
  }

  getAction(actionId: string): Promise<Action> {
    throw new Error('Method not implemented.' + actionId)
  }
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction> {
    throw new Error('Method not implemented. ' + associatedAction)
  }
}

decorate(injectable(), ActionRepositoryHttp)
