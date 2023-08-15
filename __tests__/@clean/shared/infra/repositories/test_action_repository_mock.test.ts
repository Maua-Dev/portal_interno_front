import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { NoItemsFoundError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'

test('Test create action', async () => {
  const repo = new ActionRepositoryMock()

  const action = new Action({
    ownerRa: '20.02194-0',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uuid5',
    associatedMembersRa: ['22.00680-0', '22.22222-2'],
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
      member_ra: '22.00680-0',
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
  expect(action1OwnerRa).resolves.toBe('22.00680-0')
  expect(action1StartDate).resolves.toBe(1612137600000)
  expect(action1EndDate).resolves.toBe(1612141200000)
  expect(action1Duration).resolves.toBe(3600000)
  expect(action1ActionId).resolves.toBe('uuid1')
  expect(action1AssociatedMembersRa).resolves.toStrictEqual([
    '22.00680-0',
    '22.22222-2'
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

  const action = repo.getAction('uuid6')

  expect(action).rejects.toThrow(NoItemsFoundError)
  expect(action).rejects.toThrow('actionId: uuid6')
})

test('Test create associated action', async () => {
  const repo = new ActionRepositoryMock()

  const action = new Action({
    ownerRa: '20.02194-0',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uuid5',
    associatedMembersRa: ['22.00680-0', '22.22222-2'],
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  })

  const associated_action = new AssociatedAction({
    member_ra: '20.02194-0',
    action: action
  })

  const createdAssociatedAction = await repo.createAssociatedAction(
    associated_action
  )
  expect(createdAssociatedAction).toBe(associated_action)
  expect(repo['associatedActions']).toContainEqual(createdAssociatedAction)
})
