import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
import { Project } from '../../../../../src/@clean/shared/domain/entities/project'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import {
  ACTIVE,
  activeToEnum
} from '../../../../../src/@clean/shared/domain/enums/active_enum'
import {
  COURSE,
  courseToEnum
} from '../../../../../src/@clean/shared/domain/enums/course_enum'
import {
  ROLE,
  roleToEnum
} from '../../../../../src/@clean/shared/domain/enums/role_enum'
import { stackToEnum } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { NoItemsFoundError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import '@testing-library/jest-dom'

test('Test create action', async () => {
  const repo = new ActionRepositoryMock()

  const action = new Action({
    ownerRa: '20021940',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uuid5',
    associatedMembersRa: ['22006800', '22222222'],
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  })

  const actionCreatedPromisse = repo.createAction(action)
  expect(actionCreatedPromisse).toBeInstanceOf(Promise<Action>)
  expect(repo['actions']).toContain(action)
  expect(repo['associatedActions']).toContainEqual(
    new AssociatedAction({
      memberRa: '22006800',
      action: action
    })
  )
})

test('Test get action', () => {
  const repo = new ActionRepositoryMock()

  const action1 = repo.getAction('uuid1')
  const action1OwnerRa = action1.then((action) => action.ownerRa)
  const action1StartDate = action1.then((action) => action.startDate)
  const action1EndDate = action1.then((action) => action.endDate)
  const action1Duration = action1.then((action) => action.duration)
  const action1ActionId = action1.then((action) => action.actionId)
  const action1AssociatedMembersRa = action1.then(
    (action) => action.associatedMembersRa
  )
  const action1Title = action1.then((action) => action.title)
  const action1actionTypeTag = action1.then((action) => action.actionTypeTag)
  const action1ProjectCode = action1.then((action) => action.projectCode)
  const action1StackTags = action1.then((action) => action.stackTags)
  const action1StoryId = action1.then((action) => action.storyId)
  const action1Description = action1.then((action) => action.description)

  expect(action1).toBeInstanceOf(Promise<Action>)
  expect(action1OwnerRa).resolves.toBe('22006800')
  expect(action1StartDate).resolves.toBe(1612137600000)
  expect(action1EndDate).resolves.toBe(1612141200000)
  expect(action1Duration).resolves.toBe(3600000)
  expect(action1ActionId).resolves.toBe('uuid1')
  expect(action1AssociatedMembersRa).resolves.toStrictEqual([
    '22006800',
    '22222222',
    '21002100'
  ])
  expect(action1Title).resolves.toBe('**Reunião**')
  expect(action1actionTypeTag).resolves.toStrictEqual(ACTION_TYPE.MEETING)
  expect(action1ProjectCode).resolves.toBe('PT')
  expect(action1StackTags).resolves.toStrictEqual([STACK.FRONTEND])
  expect(action1StoryId).resolves.toBe(150)
  expect(action1Description).resolves.toBe('Reunião de como instalar o yarn')
})

test('Test get action error', () => {
  const repo = new ActionRepositoryMock()

  const action = repo.getAction('uuid10')

  expect(action).rejects.toThrow(NoItemsFoundError)
  expect(action).rejects.toThrow('actionId: uuid10')
})

test('Test create associated action', async () => {
  const repo = new ActionRepositoryMock()

  const action = new Action({
    ownerRa: '20021940',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uuid5',
    associatedMembersRa: ['22006800', '22222222'],
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  })

  const associated_action = new AssociatedAction({
    memberRa: '20021940',
    action: action
  })

  const createdAssociatedAction = await repo.createAssociatedAction(
    associated_action
  )
  expect(createdAssociatedAction).toBe(associated_action)
  expect(repo['associatedActions']).toContainEqual(createdAssociatedAction)
})

test('Test get all members', async () => {
  const repo = new ActionRepositoryMock()
  const members = await repo.getAllMembers()

  const portifolio = new Project({
    code: 'PT',
    name: 'Portifólio',
    description: 'É o portifólio da nossa entidade'
  })

  const portaInterno = new Project({
    code: 'PI',
    name: 'Portal Interno',
    description: 'Portal interno da nossa entidade'
  })

  const member1 = members[0]
  const member1Name = member1.name
  const member1Email = member1.email
  const member1RA = member1.ra
  const member1Role = roleToEnum(member1.role)
  const member1Stack = stackToEnum(member1.stack)
  const member1Year = member1.year
  const member1Cellphone = member1.cellphone
  const member1Course = courseToEnum(member1.course)
  const member1HiredDate = member1.hiredDate
  const member1Active = activeToEnum(member1.active)
  const member1Projects = member1.projects

  expect(
    Array.isArray(members) &&
      members.every((member) => member instanceof Member)
  ).toBe(true)
  expect(member1).toBeInstanceOf(Member)
  expect(member1Name).toBe('Digao Siqueira')
  expect(member1Email).toBe('dsiqueira.devmaua@gmail.com')
  expect(member1RA).toBe('22.00680-0')
  expect(member1Role).toStrictEqual(ROLE.DEV)
  expect(member1Stack).toStrictEqual(STACK.FRONTEND)
  expect(member1Year).toBe(3)
  expect(member1Cellphone).toBe('11999999999')
  expect(member1Course).toStrictEqual(COURSE.CIC)
  expect(member1HiredDate).toBe(1612137600000)
  expect(member1Active).toStrictEqual(ACTIVE.ACTIVE)
  expect(member1Projects).toStrictEqual([portifolio, portaInterno])
})
