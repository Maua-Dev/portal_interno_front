import 'reflect-metadata'
import { Container } from 'inversify'
import { http } from '../http'
import { ActionRepositoryMock } from '../repositories/action_repository_mock'
import { ActionRepositoryHttp } from '../repositories/action_repository_http'
import { CreateActionUsecase } from '../../../modules/action/usecases/create_action_usecase'
import { CreateAssociatedActionUsecase } from '../../../modules/action/usecases/create_associated_action_usecase'
import { GetHistoryUsecase } from '../../../modules/action/usecases/get_history_usecase'
import { UpdateActionUsecase } from '../../../modules/action/usecases/update_action_usecase'

export const RegistryAction = {
  // Axios Adapter
  AxiosAdapter: Symbol.for('AxiosAdapter'),

  // Repositories
  ActionRepositoryMock: Symbol.for('ActionRepositoryMock'),
  ActionRepositoryHttp: Symbol.for('ActionRepositoryHttp'),

  // Usecases
  CreateActionUsecase: Symbol.for('CreateActionUsecase'),
  CreateAssociatedActionUsecase: Symbol.for('CreateAssociatedActionUsecase'),
  GetHistoryUsecase: Symbol.for('GetHistoryUsecase'),
  UpdateActionUsecase: Symbol.for('UpdateActionUsecase')
}

export const containerAction = new Container()

// HTTP
containerAction.bind(RegistryAction.AxiosAdapter).toConstantValue(http)

// Repositories
containerAction
  .bind(RegistryAction.ActionRepositoryMock)
  .to(ActionRepositoryMock)
containerAction
  .bind(RegistryAction.ActionRepositoryHttp)
  .toDynamicValue((context) => {
    return new ActionRepositoryHttp(
      context.container.get(RegistryAction.AxiosAdapter)
    )
  })

// Usecases
containerAction
  .bind(RegistryAction.CreateActionUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'TEST') {
      return new CreateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (import.meta.env.VITE_STAGE === 'DEV') {
      return new CreateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryHttp)
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
    if (import.meta.env.VITE_STAGE === 'TEST') {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'DEV' ||
      import.meta.env.VITE_STAGE === 'PROD'
    ) {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryHttp)
      )
    } else {
      return new CreateAssociatedActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    }
  })

containerAction
  .bind(RegistryAction.GetHistoryUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'TEST') {
      return new GetHistoryUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'DEV' ||
      import.meta.env.VITE_STAGE === 'PROD'
    ) {
      return new GetHistoryUsecase(
        context.container.get(RegistryAction.ActionRepositoryHttp)
      )
    } else {
      return new GetHistoryUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    }
  })

containerAction
  .bind(RegistryAction.UpdateActionUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === 'TEST') {
      return new UpdateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    } else if (
      import.meta.env.VITE_STAGE === 'DEV' ||
      import.meta.env.VITE_STAGE === 'PROD'
    ) {
      return new UpdateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryHttp)
      )
    } else {
      return new UpdateActionUsecase(
        context.container.get(RegistryAction.ActionRepositoryMock)
      )
    }
  })
