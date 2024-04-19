// import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
// import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
// import { Member } from '../../../../../src/@clean/shared/domain/entities/member'
// import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
// import {
//   ACTIVE,
//   activeToEnum
// } from '../../../../../src/@clean/shared/domain/enums/active_enum'
// import {
//   COURSE,
//   courseToEnum
// } from '../../../../../src/@clean/shared/domain/enums/course_enum'
// import {
//   ROLE,
//   roleToEnum
// } from '../../../../../src/@clean/shared/domain/enums/role_enum'
// import { stackToEnum } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
// import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
// import { NoItemsFoundError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
// import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
// import { test, expect } from 'vitest'

// test('Test create action', async () => {
//   const repo = new ActionRepositoryMock()

//   const action = {
//     startDate: 1612137600000,
//     endDate: 1612141200000,
//     title: '**Reunião**',
//     duration: 3600000,
//     actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//     associatedMembersUserIds: [
//       '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
//       '4a9019df-ab29-453f-8e8d-1cc845492f12'
//     ],
//     actionTypeTag: ACTION_TYPE.MEETING,
//     projectCode: 'PT',
//     stackTags: [STACK.FRONTEND],
//     storyId: 150,
//     description: 'Reunião de como instalar o yarn',
//     isValid: true
//   }

//   const actionCreatedPromisse = repo.createAction(
//     action.startDate,
//     action.title,
//     action.description,
//     action.actionId,
//     action.isValid,
//     action.endDate,
//     action.duration,
//     action.projectCode,
//     action.storyId,
//     action.associatedMembersUserIds,
//     action.stackTags,
//     action.actionTypeTag
//   )
//   expect(actionCreatedPromisse).toBeInstanceOf(Promise<Action>)
//   expect(repo!['actions'].map((action) => action.actionId)).toContain(
//     'a6a112ae-f488-4868-b49f-eb9c0ae42749'
//   )
//   expect(repo!['associatedActions']).toContainEqual(
//     new AssociatedAction({
//       userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
//       actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//       startDate: 1612137600000
//     })
//   )
// })

// test('Test get action', () => {
//   const repo = new ActionRepositoryMock()

//   const action1 = repo.getAction('663ef972-cc93-4bb8-8b69-8b5cfa2f532c')
//   const action1UserId = action1.then((action) => action.userId)
//   const action1StartDate = action1.then((action) => action.startDate)
//   const action1EndDate = action1.then((action) => action.endDate)
//   const action1Duration = action1.then((action) => action.duration)
//   const action1ActionId = action1.then((action) => action.actionId)
//   const action1AssociatedMembersUserIds = action1.then(
//     (action) => action.associatedMembersUserIds
//   )
//   const action1Title = action1.then((action) => action.title)
//   const action1actionTypeTag = action1.then((action) => action.actionTypeTag)
//   const action1ProjectCode = action1.then((action) => action.projectCode)
//   const action1StackTags = action1.then((action) => action.stackTags)
//   const action1StoryId = action1.then((action) => action.storyId)
//   const action1Description = action1.then((action) => action.description)
//   const action1IsValid = action1.then((action) => action.isValid)

//   expect(action1).toBeInstanceOf(Promise<Action>)
//   expect(action1UserId).resolves.toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
//   expect(action1StartDate).resolves.toBe(1612137600000)
//   expect(action1EndDate).resolves.toBe(1612141200000)
//   expect(action1Duration).resolves.toBe(3600000)
//   expect(action1ActionId).resolves.toBe('663ef972-cc93-4bb8-8b69-8b5cfa2f532c')
//   expect(action1AssociatedMembersUserIds).resolves.toStrictEqual([
//     '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
//     '4a9019df-ab29-453f-8e8d-1cc845492f12'
//   ])
//   expect(action1Title).resolves.toBe('**Reunião**')
//   expect(action1actionTypeTag).resolves.toStrictEqual(ACTION_TYPE.MEETING)
//   expect(action1ProjectCode).resolves.toBe('PT')
//   expect(action1StackTags).resolves.toStrictEqual([STACK.FRONTEND])
//   expect(action1StoryId).resolves.toBe(150)
//   expect(action1Description).resolves.toBe('Reunião de como instalar o yarn')
//   expect(action1IsValid).resolves.toBe(true)
// })

// test('Test get action error', () => {
//   const repo = new ActionRepositoryMock()

//   const action = repo.getAction('uuid10')

//   expect(action).rejects.toThrow(NoItemsFoundError)
//   expect(action).rejects.toThrow('actionId: uuid10')
// })

// test('Test create associated action', async () => {
//   const repo = new ActionRepositoryMock()

//   const associated_action = new AssociatedAction({
//     userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
//     actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//     startDate: 1612137600000
//   })

//   const createdAssociatedAction = await repo.createAssociatedAction(
//     associated_action
//   )
//   expect(createdAssociatedAction).toBe(associated_action)
//   expect(repo['associatedActions']).toContainEqual(createdAssociatedAction)
// })

// test('Test get all members', async () => {
//   const repo = new ActionRepositoryMock()
//   const members = await repo.getAllMembers()

//   const member1 = members[0]
//   const member1Name = member1.name
//   const member1Email = member1.email
//   const member1RA = member1.ra
//   const member1Role = roleToEnum(member1.role)
//   const member1Stack = stackToEnum(member1.stack)
//   const member1Year = member1.year
//   const member1Cellphone = member1.cellphone
//   const member1Course = courseToEnum(member1.course)
//   const member1HiredDate = member1.hiredDate
//   const member1Active = activeToEnum(member1.active)
//   const member1UserId = member1.userId
//   const member1EmailDev = member1.emailDev

//   expect(
//     Array.isArray(members) &&
//       members.every((member) => member instanceof Member)
//   ).toBe(true)
//   expect(member1).toBeInstanceOf(Member)
//   expect(member1Name).toBe('Digao Siqueira')
//   expect(member1Email).toBe('dsiqueira.devmaua@gmail.com')
//   expect(member1RA).toBe('22006800')
//   expect(member1Role).toStrictEqual(ROLE.DEV)
//   expect(member1Stack).toStrictEqual(STACK.FRONTEND)
//   expect(member1Year).toBe(3)
//   expect(member1Cellphone).toBe('11999999999')
//   expect(member1Course).toStrictEqual(COURSE.CIC)
//   expect(member1HiredDate).toBe(1612137600000)
//   expect(member1Active).toStrictEqual(ACTIVE.ACTIVE)
//   expect(member1UserId).toBe('f28a92a3-0434-4efd-8f1b-a9c0af6ee627')
//   expect(member1EmailDev).toBe('dsiqueira.devmaua@gmail.com')
// })
