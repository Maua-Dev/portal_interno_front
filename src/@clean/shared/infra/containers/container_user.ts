// import 'reflect-metadata'
// import { Container, injectable } from 'inversify'
// import { UserRepositoryMock } from '../repositories/user_repository_mock'
// import { CreateUserUsecase } from '@/@clean/modules/user/usecases/create_user_usecase'
// import { GetUserUsecase } from '@/@clean/modules/user/usecases/get_user_usecase'
// import { UpdateUserUsecase } from '@/@clean/modules/user/usecases/update_user_usecase'
// import { DeleteUserUsecase } from '@/@clean/modules/user/usecases/delete_user_usecase'
// import { UserHttpRepository } from '../repositories/user_http_repository'
// import { http } from '../http'

// export const RegistryUser = {
//   // Axios Adapter
//   AxiosAdapter: Symbol.for('AxiosAdapter'),

//   // Repositories
//   UserRepositoryMock: Symbol.for('UserRepositoryMock'),
//   UserHttpRepository: Symbol.for('UserHttpRepository'),

//   // Usecases
//   CreateUserUsecase: Symbol.for('CreateUserUsecase'),
//   GetUsersUsecase: Symbol.for('GetUsersUsecase'),
//   UpdateUserUsecase: Symbol.for('UpdateUserUsecase'),
//   DeleteUserUsecase: Symbol.for('DeleteUserUsecase')
// }

// export const containerUser = new Container()

// // HTTP
// containerUser.bind(RegistryUser.AxiosAdapter).toConstantValue(http)

// // Repositories
// containerUser.bind(RegistryUser.UserRepositoryMock).to(UserRepositoryMock)
// containerUser
//   .bind(RegistryUser.UserHttpRepository)
//   .toDynamicValue((context) => {
//     return new UserHttpRepository(
//       context.container.get(RegistryUser.AxiosAdapter)
//     )
//   })

// // Usecases
// containerUser.bind(RegistryUser.CreateUserUsecase).toDynamicValue((context) => {
//   if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
//     return new CreateUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
//     return new CreateUserUsecase(
//       context.container.get(RegistryUser.UserHttpRepository)
//     )
//   } else {
//     return new CreateUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   }
// })

// containerUser.bind(RegistryUser.GetUsersUsecase).toDynamicValue((context) => {
//   if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
//     return new GetUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
//     return new GetUserUsecase(
//       context.container.get(RegistryUser.UserHttpRepository)
//     )
//   } else {
//     return new GetUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   }
// })

// containerUser.bind(RegistryUser.UpdateUserUsecase).toDynamicValue((context) => {
//   if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
//     return new UpdateUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV') {
//     return new UpdateUserUsecase(
//       context.container.get(RegistryUser.UserHttpRepository)
//     )
//   } else {
//     return new UpdateUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   }
// })

// containerUser.bind(RegistryUser.DeleteUserUsecase).toDynamicValue((context) => {
//   if (process.env.NEXT_PUBLIC_STAGE === 'TEST') {
//     return new DeleteUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   } else if (process.env.NEXT_PUBLIC_STAGE === 'DEV' || process.env.NEXT_PUBLIC_STAGE === 'PROD') {
//     return new DeleteUserUsecase(
//       context.container.get(RegistryUser.UserHttpRepository)
//     )
//   } else {
//     return new DeleteUserUsecase(
//       context.container.get(RegistryUser.UserRepositoryMock)
//     )
//   }
// })
