import { User } from "@/@clean/shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class DeleteUserUsecase {
    constructor(private userRepo: IUserRepository) {}

    execute(userId: number): Promise<User> {
        return this.userRepo.deleteUser(userId);
    }
}