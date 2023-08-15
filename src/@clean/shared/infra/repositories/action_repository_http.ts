import 'reflect-metadata'
import { Action } from '../../domain/entities/action'
import { AssociatedAction } from '../../domain/entities/associated_action'
import { decorate, injectable } from 'inversify'
import { AxiosInstance } from 'axios'
import { IActionRepository } from '../../../modules/action/domain/repositories/action_repository_interface'

export class ActionRepositoryHttp implements IActionRepository {
  constructor(private http: AxiosInstance) {}
  getAssociatedActionsByRa(
    ra: string,
    amount: number,
    start?: number | undefined,
    end?: number | undefined,
    exclusiveStartKey?: string | undefined
  ): Promise<AssociatedAction[]> {
    throw new Error('Method not implemented.')
  }
  batchGetActions(actionIds: string[]): Promise<Action[]> {
    throw new Error('Method not implemented.')
  }

  createAction(action: Action): Promise<Action> {
    console.log(this.http)
    throw new Error('Method not implemented.' + action)
  }
  getAction(actionId: string): Promise<Action> {
    throw new Error('Method not implemented.' + actionId)
  }
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction> {
    throw new Error('Method not implemented. ' + associatedAction)
  }
}

decorate(injectable(), ActionRepositoryHttp)
