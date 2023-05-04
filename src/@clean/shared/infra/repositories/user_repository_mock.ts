import "reflect-metadata";
import { IUserRepository } from "@/@clean/modules/user/domain/repositories/user_repository_interface";
import { randomUUID } from "crypto";
import { User } from "../../domain/entities/user";
import { STATE } from "../../domain/enums/state_enum";
import { decorate, injectable } from "inversify";
import { uuid } from "uuidv4";
import { NoItemsFoundError } from "../../domain/helpers/errors/domain_error";


export class UserRepositoryMock implements IUserRepository {


    private users: User[] = [
        new User({
            id: 1,
            name: 'Toledo',
            email: 'rodrigo.devcommunity@gmail.com',
            state: STATE.PENDING
        }),
        new User({
            id: 2,
            name: 'Zeeba',
            email: 'zeeba.devcommunity@gmail.com',
            state: STATE.PENDING
        }),
        new User({
            id: 3,
            name: 'Enricao',
            email: 'enrico.devcommunity@gmail.com',
            state: STATE.PENDING
        }),
        new User({
            id: 4,
            name: 'Ludjas',
            email: 'luigi.devcommunity@gmail.com',
            state: STATE.PENDING
        }),
        new User({
            id: 5,
            name: 'Coordenas',
            email: 'coordenas.devcommunity@gmail.com',
            state: STATE.PENDING
        }),
    ];

    async createUser(user: User): Promise<User> {
        this.users.push(user);
        return user;
        
    }

    async getUser(userId: number): Promise<User> {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            throw new NoItemsFoundError(`id ${userId}`);
        }
        return user;

    }

    async updateUser(userId: number, newName: string): Promise<User> {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.setName = newName;
        }
        return user as User;
    }

    async deleteUser(userId: number): Promise<User> {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            this.users = this.users.filter(user => user.id !== userId);
        }
        return user as User;
    }

}

decorate(injectable(), UserRepositoryMock);