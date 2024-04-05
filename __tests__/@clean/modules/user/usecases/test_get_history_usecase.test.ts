import { test, expect } from 'vitest'
import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { GetHistoryUsecase } from '../../../../../src/@clean/modules/action/usecases/get_history_usecase'

test('Test Get History Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute(10)

  expect(actions.length).toBe(8)
  expect(actions[0].title).toBe('Componente Histórico e Atividades')
  expect(actions[0].description).toBe('Reunião Daily')

  expect(actions[1].title).toBe('Daily')
  expect(actions[1].description).toBe('Reunião Daily')
})

test('Test Get History Usecase with start and end', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute(
    10,
    1689966000000,
    1689976380000
  )

  expect(actions.length).toBe(2)
  expect(actions[0].title).toBe('Componente Histórico e Atividades')
  expect(actions[0].description).toBe('Reunião Daily')
})
