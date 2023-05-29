import { UpdateUserUsecase } from "@/@clean/modules/user/usecases/update_user_usecase"
import { User } from "@/@clean/shared/domain/entities/user"
import { UserRepositoryMock } from "@/@clean/shared/infra/repositories/user_repository_mock"

test('Test update user usecase', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new UpdateUserUsecase(repo)

    const userUpdated = await usecase.execute(1, 'Test')

    expect(userUpdated).toBeInstanceOf(User)
    expect(userUpdated.name).toBe('Test')
    
})