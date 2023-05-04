import { User } from "@/@clean/shared/domain/entities/user";
import { IUserRepository } from "../domain/repositories/user_repository_interface";

export class UpdateUserUsecase {
    constructor(private userRepo: IUserRepository) {}

    execute(userId: number, newName: string): Promise<User> {
        return this.userRepo.updateUser(userId, newName);
    }
}