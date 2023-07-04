import { IActionRepository } from '@/@clean/modules/user/domain/repositories/action_repository_interface'
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
      projects: [this.projects[1], this.projects[4]],
      deactivatedDate: 0
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
      projects: [this.projects[1], this.projects[4]],
      deactivatedDate: 0
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
      projects: [this.projects[1], this.projects[4]],
      deactivatedDate: 0
    }),
    new Member({
      name: 'Enzo sakas',
      email: 'esakas.devmaua@gmail.com',
      ra: '19017311',
      role: ROLE.DEV,
      stack: STACK.FRONTEND,
      year: 3,
      cellphone: '11911758098',
      course: COURSE.ECM,
      hiredDate: 1640192165000,
      active: ACTIVE.ACTIVE,
      projects: [this.projects[1], this.projects[4]],
      deactivatedDate: 0
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
      projects: [this.projects[1], this.projects[4]],
      deactivatedDate: 0
    })
  ]
  private actions: Action[] = [
    new Action({
      ownerRa: this.members[0].ra,
      startDate: 1612137600000,
      endDate: 1612141200000,
      duration: 3600000,
      actionId: 'uuid1',
      associatedMembersRa: [this.members[0].ra, this.members[1].ra],
      title: '**Reunião**',
      actionTypeTags: [ACTION_TYPE.MEETING],
      projectCode: this.projects[1].code,
      stackTags: [STACK.FRONTEND],
      storyId: 1,
      description: 'Reunião de como instalar o yarn'
    })
  ]
  private associatedActions: AssociatedAction[] = []

  createAction(action: Action): Promise<Action> {
    throw new Error('Method not implemented.')
  }
  getAction(actionId: string): Promise<Action> {
    throw new Error('Method not implemented.')
  }
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction> {
    throw new Error('Method not implemented.')
  }
}

decorate(injectable(), ActionRepositoryMock)
