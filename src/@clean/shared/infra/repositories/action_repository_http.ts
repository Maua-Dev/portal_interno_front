import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'
import {
  associatedMembersRaFormatter,
  raFormatterFromJson,
  raFormatterToJson
} from '../../../../app/utils/functions/formatters'
import { ACTION_TYPE } from '../../domain/enums/action_type_enum'
import { STACK } from '../../domain/enums/stack_enum'
import { Member } from '../../domain/entities/member'
import {
  stackFormatter,
  stackFormatterFromJSON,
  stackToEnum
} from '../../domain/enums/stack_enum'
import { actionTypeToEnum } from '../../domain/enums/action_type_enum'
import { roleToEnum } from '../../domain/enums/role_enum'
import { courseToEnum } from '../../domain/enums/course_enum'
import { activeToEnum } from '../../domain/enums/active_enum'
import { Project } from '../../domain/entities/project'

interface actionRawResponse {
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
  action_id: string
}

interface getHistoryRawResponse {
  actions: actionRawResponse[]
  last_evaluated_key: string
  message: string
}

export interface createActionBodyRequest {
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

interface updateActionBodyRequest {
  action_id: string
  new_owner_ra: string | undefined
  new_start_date: number | undefined
  new_end_date: number | undefined
  new_duration: number | undefined
  new_story_id: number | undefined
  new_associated_members_ra: string[] | undefined
  new_title: string | undefined
  new_description: string | undefined
  new_project_code: string | undefined
  new_stack_tags: string[] | undefined
  new_action_type_tag: string | undefined
}

interface createActionRawResponse {
  action: Action
  message: string
}

interface updateActionRawResponse {
  action: Action
  message: string
}

interface projectRawResponse {
  code: string
  name: string
  description: string
  po_RA: string
  scrum_RA: string
  start_date: number
  members: number[]
  photos: string[]
}

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
    projects: projectRawResponse[] // Project
  }
}

export interface getAllMembersRawResponse {
  members: memberRawResponse[]
}

export class ActionRepositoryHttp implements IActionRepository {
  constructor(private http: AxiosInstance) {}
  async updateAction(
    actionId: string,
    newOwnerRa?: string | undefined,
    newStartDate?: number | undefined,
    newEndDate?: number | undefined,
    newDuration?: number | undefined,
    newStoryId?: number | undefined,
    newTitle?: string | undefined,
    newDescription?: string | undefined,
    newProjectCode?: string | undefined,
    newAssociatedMembersRa?: string[] | undefined,
    newStackTags?: STACK[] | undefined,
    newActionTypeTag?: ACTION_TYPE | undefined
  ): Promise<Action> {
    try {
      const body: updateActionBodyRequest = {
        action_id: actionId,
        new_owner_ra: newOwnerRa ? raFormatter(newOwnerRa) : undefined,
        new_start_date: newStartDate ? newStartDate : undefined,
        new_end_date: newEndDate ? newEndDate : undefined,
        new_duration: newDuration ? newDuration : undefined,
        new_story_id: newStoryId ? newStoryId : undefined,
        new_associated_members_ra: newAssociatedMembersRa
          ? associatedMembersRaFormatter(newAssociatedMembersRa)
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
        body
      )

      console.log(response.data)
      console.log(response.data.message)
      return response.data.action
    } catch (error: any) {
      throw new Error('Error updating action: ' + error.message)
    }
  }

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
        response = firstCase.data
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
        response = secondCase.data
      } else if (amount && exclusiveStartKey) {
        const thirdCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            amount,
            exclusiveStartKey
          }
        )
        response = thirdCase.data
      } else if (amount) {
        const fourthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra,
            amount
          }
        )
        response = fourthCase.data
      } else {
        const fifthCase = await this.http.post<getHistoryRawResponse>(
          '/get-history',
          {
            ra
          }
        )
        response = fifthCase.data
      }

      const actionsArray: Action[] = []

      response.actions.map((actionUnit) => {
        return actionsArray.push(
          new Action({
            ownerRa: raFormatterFromJson(actionUnit.owner_ra),
            startDate: actionUnit.start_date,
            endDate: actionUnit.end_date,
            duration: actionUnit.duration,
            storyId: actionUnit.story_id,
            actionId: actionUnit.action_id,
            title: actionUnit.title,
            description: actionUnit.description,
            projectCode: actionUnit.project_code,
            associatedMembersRa: actionUnit.associated_members_ra?.map(
              (memberRa) => raFormatterFromJson(memberRa)
            ),
            stackTags: stackFormatterFromJSON(actionUnit.stack_tags),
            actionTypeTag: actionTypeToEnum(actionUnit.action_type_tag)
          })
        )
      })

      return actionsArray
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async createAction(action: Action): Promise<Action> {
    // console.log(JSON.stringify(action, null, 2))

    const ownerRa = raFormatterToJson(action.ownerRa)
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

  async getMember(ra: string): Promise<Member> {
    try {
      const formatedRa = raFormatterToJson(ra)

      const response = await this.http.get<memberRawResponse>(
        `/get-member/?ra=${formatedRa}`
      )

      const memberRawResponse = response.data.member

      const projectsArray: Project[] = []

      if (memberRawResponse.projects) {
        memberRawResponse.projects.map((project) => {
          return projectsArray.push(
            new Project({
              code: project.code,
              name: project.name,
              description: project.description
            })
          )
        })
      }

      return new Member({
        name: memberRawResponse.name,
        email: memberRawResponse.email,
        ra: raFormatterFromJson(memberRawResponse.ra),
        role: roleToEnum(memberRawResponse.role),
        stack: stackToEnum(memberRawResponse.stack),
        year: memberRawResponse.year,
        cellphone: memberRawResponse.cellphone,
        course: courseToEnum(memberRawResponse.course),
        hiredDate: memberRawResponse.hired_date,
        deactivatedDate: memberRawResponse.deactivated_date,
        active: activeToEnum(memberRawResponse.active),
        projects: projectsArray
      })
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
    }
  }

  async getAllMembers(): Promise<Member[]> {
    try {
      const response = await this.http.get<getAllMembersRawResponse>(
        '/get-all-members'
      )

      const membersArray: Member[] = []

      response.data.members.map((member) => {
        const memberUnit: memberRawResponse = member
        const projectsArray: Project[] = []

        if (memberUnit.member.projects) {
          memberUnit.member.projects.map((project) => {
            projectsArray.push(
              new Project({
                code: project.code,
                name: project.name,
                description: project.description
              })
            )
          })
        }

        return membersArray.push(
          new Member({
            name: memberUnit.member.name,
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
            projects: projectsArray
          })
        )
      })

      console.log(membersArray[0].ra)
      return membersArray
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
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
