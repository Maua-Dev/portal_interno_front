import { CreateUserUsecase } from "@/@clean/modules/user/usecases/create_user_usecase"
import { User } from "@/@clean/shared/domain/entities/user"
import { STATE } from "@/@clean/shared/domain/enums/state_enum"
import { UserRepositoryMock } from "@/@clean/shared/infra/repositories/user_repository_mock"

test('Test use case', async () => {
    const repo = new UserRepositoryMock()
    const usecase = new CreateUserUsecase(repo)
    const user = new User({
        id: 1,
        name: 'Test',
        email: 'rodrigo.dsiqueira1@gmail.com',
        state: STATE.PENDING,
    })
    const userCreated = await usecase.execute(user)

    expect(userCreated).toBeInstanceOf(User)
});
