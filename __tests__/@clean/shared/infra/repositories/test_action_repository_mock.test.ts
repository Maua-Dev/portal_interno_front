import { Action } from '@/@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '@/@clean/shared/domain/enums/action_type_enum'
import { STACK } from '@/@clean/shared/domain/enums/stack_enum'
import { ActionRepositoryMock } from '@/@clean/shared/infra/repositories/action_repository_mock'

test('Test create action', () => {
  const repo = new ActionRepositoryMock()

  const action = new Action({
    ownerRa: '20.02194-0',
    startDate: 1612137600000,
    endDate: 1612141200000,
    duration: 3700000,
    actionId: 'uuid5',
    associatedMembersRa: ['22.00680-0', '22.22222-2'],
    title: '**Reunião**',
    actionTypeTags: [ACTION_TYPE.MEETING],
    projectCode: 'PT',
    stackTags: [STACK.FRONTEND],
    storyId: 1,
    description: 'Reunião de como instalar o yarn'
  })

  const actionCreated = repo.createAction(action)
  expect(action).toBeInstanceOf(Promise<Action>)
})
