import { User } from "@/@clean/shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class CreateUserUsecase {
    constructor(private userRepo: IUserRepository) {}

    execute(user: User): Promise<User> {
        const userCreated = this.userRepo.createUser(user);
        return userCreated;
    }
}