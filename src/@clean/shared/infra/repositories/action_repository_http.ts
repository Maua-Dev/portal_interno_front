import 'reflect-metadata'
import { IActionRepository } from '@/@clean/modules/action/domain/repositories/action_repository_interface'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'

export class ActionRepositoryHttp implements IActionRepository {
  constructor(private http: AxiosInstance) {}

  createAction(action: Action): Promise<Action> {
    throw new Error('Method not implemented.')
  }
  getAction(actionId: string): Promise<Action> {
    throw new Error('Method not implemented.')
  }
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction> {
    throw new Error('Method not implemented.')
  }
}

decorate(injectable(), ActionRepositoryHttp)
