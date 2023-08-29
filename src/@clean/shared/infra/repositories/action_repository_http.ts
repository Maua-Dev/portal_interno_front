import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'

interface getHistoryRawResponse {
  actions: Action[]
  last_evaluated_key: string
  message: string
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
    exclusiveStartKey?: string | undefined
  ): Promise<Action[]> {
    let response = undefined
    try {
      if (amount && start && end && exclusiveStartKey) {
        const firstCase = await this.http.get<getHistoryRawResponse>(
          `/get-history?ra=${ra}&start=${start}&end=${end}&exclusive_start_key=${exclusiveStartKey}&amount=${amount}`
        )
        response = firstCase.data
      } else if (amount && start && end) {
        const secondCase = await this.http.get<getHistoryRawResponse>(
          `/get-history?ra=${ra}&start=${start}&end=${end}&amount=${amount}`
        )
        response = secondCase.data
      } else if (amount && exclusiveStartKey) {
        const thirdCase = await this.http.get<getHistoryRawResponse>(
          `/get-history?ra=${ra}&exclusive_start_key=${exclusiveStartKey}&amount=${amount}`
        )
        response = thirdCase.data
      } else if (amount) {
        const fourthCase = await this.http.get<getHistoryRawResponse>(
          `/get-history?ra=${ra}&amount=${amount}`
        )
        response = fourthCase.data
      } else {
        const fifthCase = await this.http.get<getHistoryRawResponse>(
          `/get-history?ra=${ra}`
        )
        response = fifthCase.data
      }

      return response.actions
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createAction(action: Action): Promise<Action> {
    try {
      let response = undefined

      if (!action.storyId) {
        const firstCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            // story_id: action.storyId,
            title: action.title,
            description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = firstCase.data
      } else if (!action.description) {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            story_id: action.storyId,
            title: action.title,
            // description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      } else if (!action.associatedMembersRa) {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            story_id: action.storyId,
            title: action.title,
            description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            // associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      } else if (action.storyId) {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            story_id: action.storyId,
            title: action.title,
            // description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            // associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      } else if (action.description) {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            // story_id: action.storyId,
            title: action.title,
            description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            // associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      } else if (action.associatedMembersRa) {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            // story_id: action.storyId,
            title: action.title,
            // description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      } else {
        const secondCase = await this.http.post<createActionRawResponse>(
          'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action/create-action',
          {
            owner_ra: action.ownerRa,
            start_date: action.startDate,
            story_id: action.storyId,
            title: action.title,
            description: action.description,
            end_date: action.endDate,
            duration: action.duration,
            project_code: action.projectCode,
            associated_members_ra: action.associatedMembersRa,
            stack_tags: action.stackTags,
            action_type_tag: action.actionTypeTag
          }
        )
        response = secondCase.data
      }

      console.log(response.message)
      return response.action
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
