<<<<<<< HEAD
import { GetUserUsecase } from '@/@clean/modules/user/usecases/get_user_usecase'
import { User } from '@/@clean/shared/domain/entities/user'
import { UserRepositoryMock } from '@/@clean/shared/infra/repositories/user_repository_mock'

test('Test get user usecase', async () => {
  const repo = new UserRepositoryMock()
  const usecase = new GetUserUsecase(repo)
  const user = await usecase.execute(1)
  expect(user).toBeInstanceOf(User)
})
=======
import { GetUserUsecase } from '@/@clean/modules/user/usecases/get_user_usecase'
import { User } from '@/@clean/shared/domain/entities/user'
import { UserRepositoryMock } from '@/@clean/shared/infra/repositories/user_repository_mock'

test('Test get user usecase', async () => {
  const repo = new UserRepositoryMock()
  const usecase = new GetUserUsecase(repo)
  const user = await usecase.execute(1)
  expect(user).toBeInstanceOf(User)
})
>>>>>>> 325e980e6943443e87c493f123ddd5fe821a6e3b
