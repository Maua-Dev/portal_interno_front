import { CreateActionUsecase } from '../../../../../src/@clean/modules/action/usecases/create_action_usecase'
import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { test, expect } from 'vitest'

test('Test Action usecase', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)

  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  const actionCreated = await actionUsecase.execute(
    action.startDate,
    action.title,
    action.description,
    action.actionId,
    action.isValid,
    action.endDate,
    action.duration,
    action.projectCode,
    action.storyId,
    action.associatedMembersUserIds,
    action.stackTags,
    action.actionTypeTag
  )
  expect(actionCreated).toBeInstanceOf(Action)
})

test('Test Action with invalid endDate', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 99999999999999,
    endDate: -1,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError(EntityError)
})

test('Test Action with invalid duration', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: -3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError(EntityError)
  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.duration is not valid')
})

test('Test Action with invalid actionId', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'uui',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.actionId is not valid')
})

test('Test Action with invalid storyId', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: -100,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.storyId is not valid')
})

test('Test Action with invalid title', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: 'aaa',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.title is not valid')
})

test('Test Action with invalid description', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'aaa'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.description is not valid')
})

test('Test Action with invalid projectCode', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PTA',
    stackTags: [STACK.FRONTEND],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.projectCode is not valid')
})

// test('Test Action with invalid associatedMembersUserIds', async () => {
//   const repo = new ActionRepositoryMock()
//   const actionUsecase = new CreateActionUsecase(repo)
//   const action = {
//     startDate: 1612137600000,
//     endDate: 1612141200000,
//     duration: 3600000,
//     actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//     associatedMembersUserIds: ['21'],
//     isValid: true,
//     title: '**Reunião**',
//     actionTypeTag: ACTION_TYPE.MEETING,
//     projectCode: 'PT',
//     stackTags: [STACK.FRONTEND],
//     storyId: 150,
//     description: 'Reunião de como instalar o yarn'
//   }

//   await expect(
//     actionUsecase.execute(
//       action.startDate,
//       action.title,
//       action.description,
//       action.actionId,
//       action.isValid,
//       action.endDate,
//       action.duration,
//       action.projectCode,
//       action.storyId,
//       action.associatedMembersUserIds,
//       action.stackTags,
//       action.actionTypeTag
//     )
//   ).rejects.toThrowError('Field props.associatedMembersUserIds is not valid')
// })

test('Test Action with invalid stackTags', async () => {
  const repo = new ActionRepositoryMock()
  const actionUsecase = new CreateActionUsecase(repo)
  const action = {
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3600000,
    actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
    associatedMembersUserIds: [
      '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
      '4a9019df-ab29-453f-8e8d-1cc845492f12'
    ],
    isValid: true,
    title: '**Reunião**',
    actionTypeTag: ACTION_TYPE.MEETING,
    projectCode: 'PT',
    stackTags: [],
    storyId: 150,
    description: 'Reunião de como instalar o yarn'
  }

  await expect(
    actionUsecase.execute(
      action.startDate,
      action.title,
      action.description,
      action.actionId,
      action.isValid,
      action.endDate,
      action.duration,
      action.projectCode,
      action.storyId,
      action.associatedMembersUserIds,
      action.stackTags,
      action.actionTypeTag
    )
  ).rejects.toThrowError('Field props.stackTags is not valid')
})
