import '@testing-library/jest-dom'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { UpdateActionUsecase } from '../../../../../src/@clean/modules/action/usecases/update_action_usecase'
import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'

test('Update Action Usecase - update ownerRa', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithOwnerRaUpdated = await actionUsecase.execute(
    'uuid1',
    '21002100'
  )

  expect(actionWithOwnerRaUpdated).toBeInstanceOf(Action)
  expect(actionWithOwnerRaUpdated.ownerRa).toBe('21002100')
})

test('Update Action Usecase - update startDate', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithStartDateUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    1612137800000
  )

  expect(actionWithStartDateUpdated).toBeInstanceOf(Action)
  expect(actionWithStartDateUpdated.startDate).toBe(1612137800000)
})

test('Update Action Usecase - update endDate', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithEndDateUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    1612141400000
  )

  expect(actionWithEndDateUpdated).toBeInstanceOf(Action)
  expect(actionWithEndDateUpdated.endDate).toBe(1612141400000)
})

test('Update Action Usecase - update duration', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithDurationUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    1612137800000,
    1612141800000,
    4000000
  )

  expect(actionWithDurationUpdated).toBeInstanceOf(Action)
  expect(actionWithDurationUpdated.startDate).toBe(1612137800000)
  expect(actionWithDurationUpdated.endDate).toBe(1612141800000)
  expect(actionWithDurationUpdated.duration).toBe(4000000)
})

test('Update Action Usecase - update title', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithTitleUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'Reunião para instalar o yarn e aprender node'
  )

  expect(actionWithTitleUpdated).toBeInstanceOf(Action)
  expect(actionWithTitleUpdated.title).toBe(
    'Reunião para instalar o yarn e aprender node'
  )
})

test('Update Action Usecase - update description', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithDescriptionUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'Instalando Yarn e NPM'
  )

  expect(actionWithDescriptionUpdated).toBeInstanceOf(Action)
  expect(actionWithDescriptionUpdated.description).toBe('Instalando Yarn e NPM')
})

test('Update Action Usecase - update projectCode', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithProjectCodeUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'MF'
  )

  expect(actionWithProjectCodeUpdated).toBeInstanceOf(Action)
  expect(actionWithProjectCodeUpdated.projectCode).toBe('MF')
})

test('Update Action Usecase - update associatedMembers', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithAssociatedMembersUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    ['21002100']
  )

  expect(actionWithAssociatedMembersUpdated).toBeInstanceOf(Action)
  expect(actionWithAssociatedMembersUpdated.associatedMembersRa.length).toBe(1)
  expect(actionWithAssociatedMembersUpdated.associatedMembersRa[0]).toBe(
    '21002100'
  )
})

test('Update Action Usecase - update stackTags', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithStacksTagsUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [STACK.UX_UI]
  )

  expect(actionWithStacksTagsUpdated).toBeInstanceOf(Action)
  expect(actionWithStacksTagsUpdated.stackTags.length).toBe(1)
  expect(actionWithStacksTagsUpdated.stackTags[0]).toBe(STACK.UX_UI)
})

test('Update Action Usecase - update actionTypeTags', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  const actionWithActionTypeTagsUpdated = await actionUsecase.execute(
    'uuid1',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    ACTION_TYPE.LEARN
  )

  expect(actionWithActionTypeTagsUpdated).toBeInstanceOf(Action)
  expect(actionWithActionTypeTagsUpdated.actionTypeTag).toBe(ACTION_TYPE.LEARN)
})

test('Update Action Usecase with invalid uuid', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new UpdateActionUsecase(repo)

  await expect(actionUsecase.execute('uuid10', '21002100')).rejects.toThrow(
    'No items found for this actionId: uuid10'
  )
})
