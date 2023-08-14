import 'reflect-metadata'
import { Container } from 'inversify'
import { http } from '../http'
import { ActionRepositoryMock } from '../repositories/action_repository_mock'
import { ActionRepositoryHttp } from '../repositories/action_repository_http'
import { CreateActionUsecase } from '../../../modules/action/usecases/create_action_usecase'
import { CreateAssociatedActionUsecase } from '../../../modules/action/usecases/create_associated_action_usecase'

export const RegistryAction = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  ActionRepositoryMock: Symbol.for('ActionRepositoryMock'),

  // Usecases
  CreateActionUsecase: Symbol.for('CreateActionUsecase'),
  CreateAssociatedActionUsecase: Symbol.for('CreateAssociatedActionUsecase')
}

export const containerAction = new Container()

// HTTP
containerAction.bind(RegistryAction.AxiosAdapter).toConstantValue(http)

// Repositories
containerAction
  .bind(RegistryAction.ActionRepositoryMock)
  .to(ActionRepositoryMock)
containerAction
  .bind(RegistryAction.ActionRepositoryMock)
  .toDynamicValue((context) => {
    return new ActionRepositoryHttp(
      context.container.get(RegistryAction.AxiosAdapter)
    )
  })

// Usecases
containerAction
  .bind(RegistryAction.CreateActionUsecase)
  .toDynamicValue((context) => {
    if (process.env.REACT_PUBLIC_STAGE === 'TEST') {
      return new CreateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (process.env.REACT_PUBLIC_STAGE === 'DEV') {
      return new CreateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else {
      return new CreateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    }
  })

containerAction
  .bind(RegistryAction.CreateAssociatedActionUsecase)
  .toDynamicValue((context) => {
    if (process.env.REACT_PUBLIC_STAGE === 'TEST') {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (
      process.env.REACT_PUBLIC_STAGE === 'DEV' ||
      process.env.REACT_PUBLIC_STAGE === 'PROD'
    ) {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    }
  })
