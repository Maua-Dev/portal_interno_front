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

export class ActionRepositoryMock implements IActionRepository {
  private projects: Project[] = [
    new Project({
      code: 'MF',
      name: 'Mauá Food',
      description: 'Aplicativo voltado ao #foramoleza'
    }),
    new Project({
      code: 'PT',
      name: 'Portifólio',
      description: 'É o portifólio da nossa entidade'
    }),
    new Project({
      code: 'SM',
      name: 'Smile',
      description: 'Site do evento Smile Maua'
    }),
    new Project({
      code: 'GM',
      name: 'Gamificação',
      description: 'Projeto de gamificação para organização da nossa entidade'
    }),
    new Project({
      code: 'PI',
      name: 'Portal Interno',
      description: 'Portal interno da nossa entidade'
    })
  ]
  private members: Member[] = [
    new Member({
      name: 'Digao Siqueira',
      email: 'dsiqueira.devmaua@gmail.com',
      ra: '22.00680-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.CIC,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    }),
    new Member({
      name: 'Bruno fevs',
      email: 'bfevs.devmaua@gmail.com',
      ra: '22.22222-2',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11999999999',
      course: COURSE.ECM,
      hiredDate: 1612137600000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    }),
    new Member({
      name: 'Rubicks Cube',
      email: 'rcube.devmaua@gmail.com',
      ra: '19.01731-1',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    }),
    new Member({
      name: 'Enzo sakas',
      email: 'esakas.devmaua@gmail.com',
      ra: '21.00210-0',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    }),
    new Member({
      name: 'Lounis Televisas',
      email: 'ltelevision.devmaua@gmail.com',
      ra: '19.01731-1',
      role: ROLE.DEV,
      stack: STACK.DATA_SCIENCE,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.CIC,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    }),
    new Member({
      name: 'MAGIC WHITE HANDS',
      email: 'jbranco.devmaua@gmail.com',
      ra: '21.00833-1',
      role: ROLE.DEV,
      stack: STACK.BACKEND,
      year: 3,
      cellphone: '11911758198',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]]
    })
  ]
  private actions: Action[] = [
    new Action({
      ownerRa: this.members[0].ra,
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: 'uuid1',
      associatedMembersRa: [
        this.members[0].ra,
        this.members[1].ra,
        this.members[3].ra
      ],
      title: '**Reunião**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião de como instalar o yarn'
    }),
    new Action({
      ownerRa: this.members[0].ra,
      startDate: 1612141200000,
      endDate: 1612144800000,
      duration: 3600000,
      actionId: 'uuid2',
      associatedMembersRa: [
        this.members[0].ra,
        this.members[1].ra,
        this.members[3].ra
      ],
      title: '**Reunião do Front**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião do front'
    }),
    new Action({
      ownerRa: this.members[2].ra,
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: 'uuid3',
      associatedMembersRa: [this.members[2].ra, this.members[4].ra],
      title: '**Reunião do Back**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.BACKEND],
      storyId: 150,
      description: 'Reunião do back'
    }),
    new Action({
      ownerRa: this.members[2].ra,
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: 'uuid4',
      associatedMembersRa: [this.members[2].ra, this.members[4].ra],
      title: '**Reunião do Back para codar o repo**',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: this.projects[1].code,
      stackTags: [STACK.BACKEND],
      storyId: 150,
      description: 'Reunião do back codando o repo'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689948000000,
      endDate: 1689955200000,
      duration: 7200000,
      actionId: 'uuid5',
      title: 'Reunião do Front',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião do front'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689955200000,
      endDate: 1689964020000,
      duration: 8820000,
      actionId: 'uuid6',
      title: 'Imp. Navbar',
      actionTypeTag: ACTION_TYPE.CODE,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Navbar codada'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689966000000,
      endDate: 1689966420000,
      duration: 420000,
      actionId: 'uuid7',
      title: 'Daily',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião Daily'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689969600000,
      endDate: 1689976380000,
      duration: 6780000,
      actionId: 'uuid8',
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
      member_ra: this.members[0].ra,
      action: this.actions[0]
    }),
    new AssociatedAction({
      member_ra: this.members[0].ra,
      action: this.actions[1]
    }),
    new AssociatedAction({
      member_ra: this.members[1].ra,
      action: this.actions[0]
    }),
    new AssociatedAction({
      member_ra: this.members[1].ra,
      action: this.actions[1]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[0]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[1]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[4]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[5]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[6]
    }),
    new AssociatedAction({
      member_ra: this.members[3].ra,
      action: this.actions[7]
    }),
    new AssociatedAction({
      member_ra: this.members[2].ra,
      action: this.actions[2]
    }),
    new AssociatedAction({
      member_ra: this.members[2].ra,
      action: this.actions[3]
    }),
    new AssociatedAction({
      member_ra: this.members[4].ra,
      action: this.actions[2]
    }),
    new AssociatedAction({
      member_ra: this.members[4].ra,
      action: this.actions[3]
    })
  ]

  async createAction(action: Action): Promise<Action> {
    this.actions.push(action)
    this.createAssociatedAction(
      new AssociatedAction({
        member_ra: action.ownerRa,
        action: action
      })
    )
    if (action.associatedMembersRa !== undefined) {
      if (action.associatedMembersRa.length > 0) {
        action.associatedMembersRa.forEach((memberRa) => {
          this.createAssociatedAction(
            new AssociatedAction({
              member_ra: memberRa,
              action: action
            })
          )
        })
      }
    }
    return action
  }

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
    ra: string,
    amount?: number,
    start?: number | undefined,
    end?: number | undefined,
    exclusiveStartKey?: string | undefined
  ): Promise<Action[]> {
    let actions = this.actions.sort((a, b) => {
      return b.startDate - a.startDate
    })

    if (exclusiveStartKey) {
      let action0 = actions[0]
      while (action0 !== undefined && action0.actionId !== exclusiveStartKey) {
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

    actions = actions.filter((action) => action.ownerRa === ra)

    return actions.slice(0, amount)
  }

  async getAllMembers(): Promise<Member[]> {
    const members = await this.members
    if (!members) {
      throw new NoItemsFoundError('No members found')
    }
    return members
  }
}

decorate(injectable(), ActionRepositoryMock)
