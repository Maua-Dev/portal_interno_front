import { ActionRepositoryMock } from '../../../../../src/@clean/shared/infra/repositories/action_repository_mock'
import { GetHistoryUsecase } from '../../../../../src/@clean/modules/action/usecases/get_history_usecase'
import '@testing-library/jest-dom'

test('Test Get History Usecase', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const actions = await getHistoryUsecase.execute('21.00210-0', 10)

  expect(actions.length).toBe(2)
  expect(actions[0].title).toBe('**Reunião do Front**')
  expect(actions[0].description).toBe('Reunião do front')

  expect(actions[1].title).toBe('**Reunião**')
  expect(actions[1].description).toBe('Reunião de como instalar o yarn')
})

test('Test Get History Usecase with start and end', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const actions = await getHistoryUsecase.execute(
    '21.00210-0',
    10,
    1612137600000,
    1612141200000
  )

  expect(actions.length).toBe(1)
  expect(actions[0].title).toBe('**Reunião**')
  expect(actions[0].description).toBe('Reunião de como instalar o yarn')
})

test('Test Get History Usecase with start and end - example 2', async () => {
  const repo = new ActionRepositoryMock()
  const getHistoryUsecase = new GetHistoryUsecase(repo)

  const actions = await getHistoryUsecase.execute(
    '21.00210-0',
    10,
    1612141200000,
    1612144800000
  )

  expect(actions.length).toBe(1)
  expect(actions[0].title).toBe('**Reunião do Front**')
  expect(actions[0].description).toBe('Reunião do front')
})

// test('Test Get History Usecase with exclusiveStartKey', async () => {
//   const repo = new ActionRepositoryMock()
//   const getHistoryUsecase = new GetHistoryUsecase(repo)

//   const actions = await getHistoryUsecase.execute(
//     '21.00210-0',
//     10,
//     undefined,
//     undefined,
//     'uuid1'
//   )

//   expect(actions.length).toBe(2)
//   expect(actions[0].title).toBe('**Reunião do Front**')
//   expect(actions[0].description).toBe('Reunião do front')
// })
