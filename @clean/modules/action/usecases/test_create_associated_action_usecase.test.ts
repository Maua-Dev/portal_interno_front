// import { CreateAssociatedActionUsecase } from '../../../../../src/@clean/modules/action/usecases/create_associated_action_usecase'
// import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
// import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
// import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
// import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
// import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
// import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
// import { test, expect } from 'vitest'

// test('Test create associated action usecase', async () => {
//   const repo = new ActionRepositoryMock()
//   const useCase = new CreateAssociatedActionUsecase(repo)
//   const action = new Action({
//     userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
//     startDate: 1000,
//     endDate: 2000,
//     duration: 1000,
//     actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//     storyId: 1000,
//     title: 'Test Usecase',
//     description: 'Testing',
//     projectCode: '76',
//     associatedMembersUserIds: [
//       '492e9fa2-9189-4fe7-b0f7-e6ca472b19f0',
//       '4a9019df-ab29-453f-8e8d-1cc845492f12'
//     ],
//     isValid: true,
//     stackTags: [STACK.FRONTEND, STACK.BACKEND],
//     actionTypeTag: ACTION_TYPE.CODE
//   })

//   const associatedAction = new AssociatedAction({
//     userId: 'f28a92a3-0434-4efd-8f1b-a9c0af6ee627',
//     actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//     startDate: 1000
//   })
//   const associatedActionCreated = await useCase.execute(associatedAction)

//   expect(action).toBeInstanceOf(Action)
//   expect(associatedActionCreated).toBeInstanceOf(AssociatedAction)
// })

// test('Test create associated action usecase with invalid member Ra', async () => {
//   const repo = new ActionRepositoryMock()
//   const useCase = new CreateAssociatedActionUsecase(repo)

//   expect(() => {
//     useCase.execute(
//       new AssociatedAction({
//         userId: '',
//         actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//         startDate: 1000
//       })
//     )
//   }).toThrowError(EntityError)
//   expect(() => {
//     useCase.execute(
//       new AssociatedAction({
//         userId: '',
//         actionId: 'a6a112ae-f488-4868-b49f-eb9c0ae42749',
//         startDate: 1000
//       })
//     )
//   }).toThrowError('Field props.userId is not valid')
// })
