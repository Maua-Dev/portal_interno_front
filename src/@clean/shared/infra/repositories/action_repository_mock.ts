import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { Project } from '../../domain/entities/project'
import { Member } from '../../domain/entities/member'
import { decorate, injectable } from 'inversify'
import { ROLE } from '../../domain/enums/role_enum'
import { STACK } from '../../domain/enums/stack_enum'
import { COURSE } from '../../domain/enums/course_enum'
import { ACTIVE } from '../../domain/enums/active_enum'
import { ACTION_TYPE } from '../../domain/enums/action_type_enum'
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'
import { historyResponse } from './action_repository_http'

export class ActionRepositoryMock implements IActionRepository {
  createAction(): Promise<Action> {
    throw new Error('Method not implemented.')
  }
  private projects: Project[] = [
    new Project({
      code: 'MF',
      name: 'Mauá Food',
      description: 'Aplicativo voltado ao #foramoleza',
      poUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      scrumUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      membersUserIds: [
        'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      photos: ['photo1', 'photo2']
    }),
    new Project({
      code: 'PT',
      name: 'Portifólio',
      description: 'É o portifólio da nossa entidade',
      poUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      scrumUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      membersUserIds: [
        'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      photos: ['photo1', 'photo2']
    }),
    new Project({
      code: 'SM',
      name: 'Smile',
      description: 'Site do evento Smile Maua',
      poUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      scrumUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      membersUserIds: [
        'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      photos: ['photo1', 'photo2']
    }),
    new Project({
      code: 'GM',
      name: 'Gamificação',
      description: 'Projeto de gamificação para organização da nossa entidade',
      poUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      scrumUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      membersUserIds: [
        'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      photos: ['photo1', 'photo2']
    }),
    new Project({
      code: 'PI',
      name: 'Portal Interno',
      description: 'Portal interno da nossa entidade',
      poUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      scrumUserId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      membersUserIds: [
        'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      photos: ['photo1', 'photo2']
    })
  ]
  private members: Member[] = [
    new Member({
      name: 'Digao Siqueira',
      email: 'dsiqueira.devmaua@gmail.com',
      ra: '22006800',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.CIC,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      emailDev: 'dsiqueira.devmaua@gmail.com'
    }),
    new Member({
      name: 'Bruno fevs',
      email: 'bfevs.devmaua@gmail.com',
      ra: '22222222',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee626',
      emailDev: 'bfevs.devmaua@maua.com'
    }),
    new Member({
      name: 'Rubicks Cube',
      email: 'rcube.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee625',
      emailDev: 'rcube.devmaua@gmai.com'
    }),
    new Member({
      name: 'Enzo sakas',
      email: 'esakas.devmaua@gmail.com',
      ra: '21002100',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee624',
      emailDev: 'esakas.devmaua@gmail.com'
    }),
    new Member({
      name: 'Lounis Televisas',
      email: 'ltelevision.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.DATA_SCIENCE,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.CIC,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee623',
      emailDev: 'ltelevision.devmaua@gmail.com'
    }),
    new Member({
      name: 'MAGIC WHITE HANDS',
      email: 'jbranco.devmaua@gmail.com',
      ra: '21008331',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758198',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee622',
      emailDev: 'jbranco.devmaua@gmail.com'
    })
  ]
  private actions: Action[] = [
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      title: '**Reunião**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião de como instalar o yarn'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612141200000,
      endDate: 1612144800000,
      duration: 3600000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      title: '**Reunião do Front**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião do front'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      title: '**Reunião do Back**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.BACKEND],
      storyId: 150,
      description: 'Reunião do back'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      associatedMembersUserIds: [
        '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
        '4a9019df-ab29-453f-8e8d-1cc845492f12'
      ],
      title: '**Reunião do Back para codar o repo**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.BACKEND],
      storyId: 150,
      description: 'Reunião do back codando o repo'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1689948000000,
      endDate: 1689955200000,
      duration: 7200000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      title: 'Reunião do Front',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião do front'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1689955200000,
      endDate: 1689964020000,
      duration: 8820000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      title: 'Imp. Navbar',
      actionTypeTag: ACTION_TYPE.CODE,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Navbar codada'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1689966000000,
      endDate: 1689966420000,
      duration: 420000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      title: 'Daily',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião Daily'
    }),
    new Action({
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      startDate: 1689969600000,
      endDate: 1689976380000,
      duration: 6780000,
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      isValid: true,
      title: 'Componente Histórico e Atividades',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião Daily'
    })
  ]
  private associatedActions: AssociatedAction[] = [
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1612137600000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1612141200000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1612137600000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1612137600000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1689948000000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1689955200000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1689966000000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    }),
    new AssociatedAction({
      actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
      startDate: 1689969600000,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
    })
  ]

  async getAction(actionId: string): Promise<Action> {
    const action = this.actions.find((action) => action.actionId === actionId)
    if (!action) {
      throw new NoItemsFoundError(`actionId: ${actionId}`)
    }
    return action
  }

  async createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction> {
    this.associatedActions.push(associatedAction)
    return associatedAction
  }

  async getHistoryActions(
    amount?: number,
    start?: number | undefined,
    end?: number | undefined,
    exclusiveStartKey?:
      | {
          actionId: string
          startDate: number
        }
      | undefined
  ): Promise<historyResponse> {
    let actions = this.actions.sort((a, b) => {
      return b.startDate - a.startDate
    })

    if (exclusiveStartKey) {
      let action0 = actions[0]
      while (
        action0 !== undefined &&
        action0.actionId !== exclusiveStartKey.actionId
      ) {
        actions.shift()
        if (actions.length > 0) action0 = actions[0]
      }
      actions.shift()
    }

    if (start) {
      actions = actions.filter((action) => action.startDate >= start)
    }

    if (end) {
      actions = actions.filter((action) => action.endDate <= end)
    }

    actions = actions.filter((action) => {
      if (
        action.userId === 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627' ||
        (action.associatedMembersUserIds &&
          action.associatedMembersUserIds.includes(
            'f28a92a3-0434-4efd-8f1b-a9c0af6ee627'
          ))
      ) {
        return true
      }
    })

    return {
      actions: actions.slice(0, amount),
      lastEvaluatedKey: {
        actionId: '663ef972-cc93-4bb8-8b69-8b5cfa2f532c',
        startDate: 1689969600000
      }
    }
  }

  async updateAction(
    actionId: string,
    newStartDate?: number,
    newEndDate?: number,
    newDuration?: number,
    newStoryId?: number | -1,
    newTitle?: string,
    newDescription?: string | '',
    newProjectCode?: string,
    newAssociatedMembersUserIds?: string[],
    newStackTags?: STACK[],
    newActionTypeTag?: ACTION_TYPE,
    newIsValid?: boolean
  ): Promise<Action> {
    let newAction = null
    this.actions.forEach((action) => {
      if (action.actionId.includes(actionId)) {
        if (newStartDate) {
          action.startDate = newStartDate
        }
        if (newEndDate) {
          action.endDate = newEndDate
        }
        if (newDuration) {
          action.duration = newDuration
        }
        if (newStoryId) {
          action.storyId = newStoryId
        }
        if (newIsValid) {
          action.isValid = newIsValid
        }
        if (newTitle) {
          action.title = newTitle
        }
        if (newDescription) {
          action.description = newDescription
        }
        if (newProjectCode) {
          action.projectCode = newProjectCode
        }
        if (newAssociatedMembersUserIds) {
          action.associatedMembersUserIds = newAssociatedMembersUserIds
        }
        if (newStackTags) {
          action.stackTags = newStackTags
        }
        if (newActionTypeTag) {
          action.actionTypeTag = newActionTypeTag
        }
        newAction = action
      }
    })

    if (newAction) return newAction
    throw new NoItemsFoundError(`actionId: ${actionId}`)
  }

  async batchUpdateAssociatedActionMembers(
    actionId: string,
    members: string[]
  ): Promise<void> {
    this.associatedActions.forEach((associatedAction) => {
      if (associatedAction.actionId === actionId) {
        this.associatedActions.splice(
          this.associatedActions.indexOf(associatedAction),
          1
        )
      }
    })

    members.forEach((member) => {
      this.associatedActions.push(
        new AssociatedAction({
          actionId: actionId,
          startDate: 1612137600000,
          userId: member
        })
      )
    })
  }

  async getMember(): Promise<Member> {
    const member = this.members[0]

    return member
  }

  async getAllMembers(): Promise<Member[]> {
    const members = this.members

    if (!members) {
      throw new NoItemsFoundError('No members found')
    }

    return members
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
    const member = new Member({
      ra,
      emailDev,
      role,
      stack,
      year,
      course,
      cellphone,
      name: 'NameForMock',
      email: 'emailformock@gmail.com',
      active: ACTIVE.ACTIVE,
      userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
      hiredDate: 1640192165000
    })

    this.members.push(member)

    return member
  }

  async updateActionValidation(
    actionId: string,
    isValid: boolean
  ): Promise<Action> {
    let newAction = null
    this.actions.forEach((action) => {
      if (action.actionId.includes(actionId)) {
        action.isValid = isValid
        newAction = action
      }
    })

    if (newAction) return newAction
    throw new NoItemsFoundError(`actionId: ${actionId}`)
  }
}

decorate(injectable(), ActionRepositoryMock)
