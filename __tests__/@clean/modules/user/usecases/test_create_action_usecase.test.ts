import { CreateAction } from '@/@clean/modules/user/usecases/create_action_usecase'
import { Action } from '@/@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '@/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '@/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '@/@clean/shared/infra/repositories/action_repository_mock'

test('Test Action usecase', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  const action = new Action({
    ownerRa: '22.00680-0',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uuid1',
    associatedMembersRa: ['22.00680-0', '22.22222-2'],
    title: '**Reunião**',
    actionTypeTags: [ACTION_TYPE.MEETING],
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  })

  const actionCreated = await actionUsecase.execute(action)
  expect(actionCreated).toBeInstanceOf(Action)
})

test('Test Action with invalid ownerRa', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22406800',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22406800',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.ownerRa is not valid')
})

test('Test Action with invalid endDate', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 161214120000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 161214120000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.endDate is not valid')
})

test('Test Action with invalid duration', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: -3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 36000000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.duration is not valid')
})

test('Test Action with invalid actionId', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uui',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uui',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.actionId is not valid')
})

test('Test Action with invalid storyId', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 99,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 99,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.storyId is not valid')
})

test('Test Action with invalid title', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: 'aaa',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: 'aaa',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.title is not valid')
})

test('Test Action with invalid description', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'aaa'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'aaa'
      })
    )
  }).toThrowError('Field props.description is not valid')
})

test('Test Action with invalid projectCode', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PTA',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PTA',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.projectCode is not valid')
})

test('Test Action with invalid associatedMembersRa', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: [],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: [],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [STACK.FRONTEND],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.associatedMembersRa is not valid')
})

test('Test Action with invalid stackTags', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateAction(repo)

  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    actionUsecase.execute(
      new Action({
        ownerRa: '22.40680-0',
        startDate: 1612137600000,
        endDate: 1612141200000,
        duration: 3600000,
        actionId: 'uuid6',
        associatedMembersRa: ['22.00680-0', '22.22222-2'],
        title: '**Reunião**',
        actionTypeTags: [ACTION_TYPE.MEETING],
        projectCode: 'PT',
        stackTags: [],
        storyId: 150,
        description: 'Reunião de como instalar o yarn'
      })
    )
  }).toThrowError('Field props.stackTags is not valid')
})
