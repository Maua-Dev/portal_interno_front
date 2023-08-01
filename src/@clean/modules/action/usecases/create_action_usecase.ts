import { Action } from '@/@clean/shared/domain/entities/action'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class CreateActionUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(action: Action): Promise<Action> {
    const actionCreated = await this.actionRepo.createAction(action)
    return actionCreated
  }
}
