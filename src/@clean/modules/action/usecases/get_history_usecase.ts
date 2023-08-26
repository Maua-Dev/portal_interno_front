import { Action } from '../../../shared/domain/entities/action'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

interface History {
  actions: Action[]
  lastId: string
}
export class GetHistoryUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    ra: string,
    amount: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: string
  ): Promise<History> {
    const actions = await this.actionRepo.getHistoryActions(
      ra,
      amount,
      start,
      end,
      exclusiveStartKey
    )

    if (actions.length === 0) {
      throw new NoItemsFoundError('No actions found')
    }

    const lastId = actions[actions.length - 1].actionId

    return {
      actions,
      lastId
    }
  }
}
