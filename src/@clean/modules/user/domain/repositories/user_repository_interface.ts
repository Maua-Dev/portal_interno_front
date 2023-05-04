import { User } from "@/@clean/shared/domain/entities/user";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    getUser(userId: number): Promise<User>;
    updateUser(userId: number, newName: string): Promise<User>;  //returns updated user
    deleteUser(userId: number): Promise<User>;
}


