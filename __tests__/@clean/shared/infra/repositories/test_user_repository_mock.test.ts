import { User } from "@/@clean/shared/domain/entities/user";
import { STATE } from "@/@clean/shared/domain/enums/state_enum";
import { UserRepositoryMock } from "@/@clean/shared/infra/repositories/user_repository_mock";

test('Test create user', () => {
    const repo = new UserRepositoryMock();
    const user = new User({
        id: 6,
        name: 'Teste',
        email: 'rodrigo.dsiqueira1@gmailcom',
        state: STATE.PENDING
    })
    const userCreated = repo.createUser(user);
    expect(userCreated).toBeInstanceOf(Promise<User>);
    
});
test('Test get users', () => {
    const repo = new UserRepositoryMock();

    // get one user
    const user1 = repo.getUser(1);

    // assert user1 to be one User
    expect(user1).toBeInstanceOf(Promise<User>);
});