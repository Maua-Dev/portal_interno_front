import { CreateAssociatedAction } from '@/@clean/modules/action/usecases/create_associated_action_usecase'
import { Action } from '@/@clean/shared/domain/entities/action'
import { AssociatedAction } from '@/@clean/shared/domain/entities/associated_action'
import { ACTION_TYPE } from '@/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '@/@clean/shared/domain/enums/stack_enum'
import { EntityError } from '@/@clean/shared/domain/helpers/errors/domain_error'
import { ActionRepositoryMock } from '@/@clean/shared/infra/repositories/action_repository_mock'

test('Test usecase', async () => {
  const repo = new ActionRepositoryMock()
  const useCase = new CreateAssociatedAction(repo)
  const action = new Action({
    ownerRa: '21.00210-0',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Usecase',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21.00833-7'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  const associatedAction = new AssociatedAction({
    member_ra: '21.00833-7',
    action: action
  })
  const associatedActionCreated = await useCase.execute(associatedAction)

  expect(action).toBeInstanceOf(Action)
  expect(associatedActionCreated).toBeInstanceOf(AssociatedAction)
})

test('Test usecase with invalid member Ra', async () => {
  const repo = new ActionRepositoryMock()
  const useCase = new CreateAssociatedAction(repo)
  const action = new Action({
    ownerRa: '21.00210-0',
    startDate: 1000,
    endDate: 2000,
    duration: 1000,
    actionId: '4000',
    storyId: 1000,
    title: 'Test Usecase',
    description: 'Testing',
    projectCode: '76',
    associatedMembersRa: ['21.00833-7'],
    stackTags: [STACK.FRONTEND, STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  expect(action).toBeInstanceOf(Action)
  expect(() => {
    useCase.execute(
      new AssociatedAction({
        member_ra: '21.00833.7',
        action: action
      })
    )
  }).toThrowError(EntityError)
  expect(() => {
    useCase.execute(
      new AssociatedAction({
        member_ra: '21.00833.7',
        action: action
      })
    )
  }).toThrowError('Field props.member_ra is not valid')
})
