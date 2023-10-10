import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { GetHistoryUsecase } from '../../../../../src/@clean/modules/action/usecases/get_history_usecase'
import '@testing-library/jest-dom'

test('Test Get History Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute('21002100', 10)

  expect(actions.length).toBe(4)
  expect(actions[0].title).toBe('Componente Histórico e Atividades')
  expect(actions[0].description).toBe('Reunião Daily')

  expect(actions[1].title).toBe('Daily')
  expect(actions[1].description).toBe('Reunião Daily')
})

test('Test Get History Usecase with start and end', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute(
    '21002100',
    10,
    1689966000000,
    1689976380000
  )

  expect(actions.length).toBe(2)
  expect(actions[0].title).toBe('Componente Histórico e Atividades')
  expect(actions[0].description).toBe('Reunião Daily')
})

test('Test Get History Usecase with start and end - example 2', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute(
    '21002100',
    10,
    1689955200000,
    1689976380000
  )

  expect(actions.length).toBe(3)
  expect(actions[1].title).toBe('Daily')
  expect(actions[1].description).toBe('Reunião Daily')
})

test('Test Get History Usecase with exclusiveStartKey', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const { actions } = await getHistoryUsecase.execute(
    '21002100',
    10,
    undefined,
    undefined,
    {
      action_id: 'uuid7',
      start_date: 1689966000000
    }
  )

  expect(actions.length).toBe(2)
  expect(actions[1].title).toBe('Reunião do Front')
  expect(actions[1].description).toBe('Reunião do front')
})
