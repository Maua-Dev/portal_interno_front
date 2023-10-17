import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'
import {
  associatedMembersRaFormatter,
  raFormatter,
  stackFormatter
} from '../../../../app/utils/functions/formatters'

interface getHistoryRawResponse {
  actions: [
    {
      owner_ra: string
      start_date: number
      end_date: number
      duration: number
      action_id: string
      story_id?: number
      title: string
      description?: string
      project_code: string
      associated_members_ra?: string[]
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
    action_id: string
    start_date: number
  }
}
interface createActionBodyRequest {
  owner_ra: string
  start_date: number
  story_id: number | undefined
  title: string
  description: string | undefined
  end_date: number
  duration: number
  project_code: string
  associated_members_ra: string[] | undefined
  stack_tags: string[]
  action_type_tag: string
}

interface createActionRawResponse {
  action: Action
  message: string
}

export class ActionRepositoryHttp implements IActionRepository {
  constructor(private http: AxiosInstance) {}

  async getHistoryActions(
    ra: string,
    amount?: number | undefined,
    start?: number | undefined,
    end?: number | undefined,
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ): Promise<historyResponse> {
    const response: historyResponse = {
      actions: [],
      lastEvaluatedKey: {
        action_id: '',
        start_date: 0
      }
    }
    try {
      if (amount && start && end && exclusiveStartKey) {
        const firstCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            start,
            end,
            amount,
            exclusiveStartKey
          }
        )
        for (let i = 0; i < firstCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(firstCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          action_id: firstCase.data.last_evaluated_key.action_id,
          start_date: firstCase.data.last_evaluated_key.start_date
        }
      } else if (amount && start && end) {
        const secondCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            start,
            end,
            amount
          }
        )
        for (let i = 0; i < secondCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(secondCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          action_id: secondCase.data.last_evaluated_key.action_id,
          start_date: secondCase.data.last_evaluated_key.start_date
        }
      } else if (amount && exclusiveStartKey) {
        console.log({
          ra,
          amount,
          exclusiveStartKey
        })
        const thirdCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            amount,
            exclusive_start_key: exclusiveStartKey
          }
        )
        console.log('thirdCase', thirdCase)
        for (let i = 0; i < thirdCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(thirdCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          action_id: thirdCase.data.last_evaluated_key.action_id,
          start_date: thirdCase.data.last_evaluated_key.start_date
        }
        console.log(thirdCase)
      } else if (amount) {
        console.log('aqui')
        const fourthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            amount
          }
        )
        console.log(fourthCase)
        for (let i = 0; i < fourthCase.data.actions.length; i++) {
          console.log(Action.fromJSON(fourthCase.data.actions[i]))
          response.actions.push(Action.fromJSON(fourthCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          action_id: fourthCase.data.last_evaluated_key.action_id,
          start_date: fourthCase.data.last_evaluated_key.start_date
        }
      } else {
        const fifthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra
          }
        )
        for (let i = 0; i < fifthCase.data.actions.length; i++) {
          response.actions.push(Action.fromJSON(fifthCase.data.actions[i]))
        }
        response.lastEvaluatedKey = {
          action_id: fifthCase.data.last_evaluated_key.action_id,
          start_date: fifthCase.data.last_evaluated_key.start_date
        }
      }

      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createAction(action: Action): Promise<Action> {
    // console.log(JSON.stringify(action, null, 2))

    const ownerRa = raFormatter(action.ownerRa)
    const stackTags = stackFormatter(action.stackTags)

    const description = action.description ? action.description : undefined
    const storyId = action.storyId ? action.storyId : undefined
    const associatedMembersRa = action.associatedMembersRa
      ? associatedMembersRaFormatter(action.associatedMembersRa)
      : undefined

    const bodyRequest: createActionBodyRequest = {
      owner_ra: ownerRa,
      start_date: action.startDate,
      story_id: storyId,
      title: action.title,
      description: description,
      end_date: action.endDate,
      duration: action.duration,
      project_code: action.projectCode,
      associated_members_ra: associatedMembersRa,
      stack_tags: stackTags,
      action_type_tag: action.actionTypeTag.toString()
    }

    try {
      const response = await this.http.post<createActionRawResponse>(
        '/create-action',
        bodyRequest
      )

      console.log(response.data.message)
      return response.data.action
    } catch (error: any) {
      throw new Error('Error creating action: ' + error.message)
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
