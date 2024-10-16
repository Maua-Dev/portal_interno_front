import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'
import { ACTION_TYPE } from '../../domain/enums/action_type_enum'
import { STACK } from '../../domain/enums/stack_enum'
import { stackFormatter } from '../../domain/enums/stack_enum'

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
  } | null
  message: string
}

export interface lastEvaluatedKey {
  actionId: string
  startDate: number
}

export interface historyResponse {
  actions: Action[]
  lastEvaluatedKey: lastEvaluatedKey | null
}

interface createActionBodyRequest {
  start_date: number
  title: string
  description?: string
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
      throw new Error('Error updating action: ' + error.response.data)
    }
  }

  async getHistoryActions(
    start?: number,
    end?: number,
    amount?: number,
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
      if (
        amount !== undefined &&
        start !== undefined &&
        end !== undefined &&
        exclusiveStartKey !== undefined
      ) {
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
        if (firstCase.data.last_evaluated_key !== null) {
          response.lastEvaluatedKey = {
            actionId: firstCase.data.last_evaluated_key.action_id,
            startDate: firstCase.data.last_evaluated_key.start_date
          }
        } else {
          response.lastEvaluatedKey = null
        }
      } else if (
        amount !== undefined &&
        start !== undefined &&
        end !== undefined
      ) {
        const secondCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            start,
            end,
            amount
          },
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        )
        for (let i = 0; i < secondCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(secondCase.data.actions[i]))
        }

        if (secondCase.data.last_evaluated_key !== null) {
          response.lastEvaluatedKey = {
            actionId: secondCase.data.last_evaluated_key.action_id,
            startDate: secondCase.data.last_evaluated_key.start_date
          }
        } else {
          response.lastEvaluatedKey = null
        }
      } else if (amount !== undefined && exclusiveStartKey !== undefined) {
        const thirdCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            amount,
            exclusive_start_key: {
              action_id: exclusiveStartKey.actionId,
              start_date: exclusiveStartKey.startDate
            }
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

        if (thirdCase.data.last_evaluated_key !== null) {
          response.lastEvaluatedKey = {
            actionId: thirdCase.data.last_evaluated_key.action_id,
            startDate: thirdCase.data.last_evaluated_key.start_date
          }
        } else {
          response.lastEvaluatedKey = null
        }

        return response
      } else if (amount !== undefined) {
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

        if (fourthCase.data.last_evaluated_key !== null) {
          response.lastEvaluatedKey = {
            actionId: fourthCase.data.last_evaluated_key.action_id,
            startDate: fourthCase.data.last_evaluated_key.start_date
          }
        } else {
          response.lastEvaluatedKey = null
        }
        return response
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
        return response
      }

      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createAction(
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
      description,
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
      throw new Error('Error creating action: ' + error.response.data)
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

  async updateActionValidation(
    actionId: string,
    isValid: boolean
  ): Promise<Action> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.put<updateActionRawResponse>(
        '/update-action-validation',
        {
          action_id: actionId,
          is_valid: isValid
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      return response.data.action
    } catch (error: any) {
      throw new Error(error.response.data)
    }
  }

  async deleteAction(actionId: string): Promise<void> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }
      await this.http.delete('/delete-action', {
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          action_id: actionId
        }
      })
    } catch (error: any) {
      throw new Error('Error deleting action: ' + error.response.data)
    }
  }
}

decorate(injectable(), ActionRepositoryHttp)
