import 'reflect-metadata';
import { IUserRepository } from "@/@clean/modules/user/domain/repositories/user_repository_interface";
import { User } from "../../domain/entities/user";
import { decorate, injectable } from 'inversify';
import { AxiosError, AxiosInstance } from 'axios';

export class UserHttpRepository implements IUserRepository {
    constructor(private http: AxiosInstance) {}

    async createUser(user: User): Promise<User> {
        return await this.http.post('/mss-template/create-user', user).then(res => {
            return new User({
                id: res.data.user_id,
                name: res.data.name,
                email: res.data.email,
                state: res.data.state,
            })
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err.response?.data;
        });
        
    }

    async deleteUser(userId: number): Promise<User> {
        return await this.http.post(`/mss-template/delete-user?user_id=${userId}`).then(res => {
            const userDeleted = User.fromJSON({
                user_id: res.data.user_id,
                name: res.data.name,
                email: res.data.email,
                state: res.data.state,
            })
            return userDeleted;
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err;
        });
    }

    async getUser(userId: number): Promise<User> {
        return await this.http.get(`/mss-template/get-user?user_id=${userId}`).then(res => {
            const user = User.fromJSON({
                user_id: res.data.user_id,
                name: res.data.name,
                email: res.data.email,
                state: res.data.state,
            })
            return user;
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err;
        });
    }

    async updateUser(userId: number, newName: string): Promise<User> {
        return await this.http.post(`/mss-template/update-user?user_id=${userId}&new_name=${newName}`).then(res => {
            const userUpdated = User.fromJSON({
                user_id: res.data.user_id,
                name: res.data.name,
                email: res.data.email,
                state: res.data.state,
            })
            return userUpdated;
        }).catch((err: AxiosError) => {
            console.log(err);
            throw err.message;
        });
    }
}

decorate(injectable(), UserHttpRepository);