import { CreateAssociatedActionUsecase } from '../../../../../src/@clean/modules/action/usecases/create_associated_action_usecase'
import { Action } from '../../../../../src/@clean/shared/domain/entities/action'
import { AssociatedAction } from '../../../../../src/@clean/shared/domain/entities/associated_action'
import { ACTION_TYPE } from '../../../../../src/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../../../src/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '../../../../../src/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import '@testing-library/jest-dom'

test('Test create associated action usecase', async () => {
  const repo = new ActionRepositoryMock()
  const useCase = new CreateAssociatedActionUsecase(repo)
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Usecase',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  const associatedAction = new AssociatedAction({
    memberRa: '21008337',
    action: action
  })
  const associatedActionCreated = await useCase.execute(associatedAction)

  expect(action).toBeInstanceOf(Action)
  expect(associatedActionCreated).toBeInstanceOf(AssociatedAction)
})

test('Test create associated action usecase with invalid member Ra', async () => {
  const repo = new ActionRepositoryMock()
  const useCase = new CreateAssociatedActionUsecase(repo)
  const action = new Action({
    ownerRa: '21002100',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Usecase',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21008337'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action).toBeInstanceOf(Action)
  expect(() => {
    useCase.execute(
      new AssociatedAction({
        memberRa: '21.00833.7',
        action: action
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    useCase.execute(
      new AssociatedAction({
        memberRa: '21.00833.7',
        action: action
      })
    )
  }).toThrowError('Field props.memberRa is not valid')
})
