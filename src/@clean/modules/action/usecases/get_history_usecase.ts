import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { historyResponse } from '../../../shared/infra/repositories/action_repository_http'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class GetHistoryUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    ra: string,
    amount: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ): Promise<historyResponse> {
    const response = await this.actionRepo.getHistoryActions(
      ra,
      amount,
      start,
      end,
      exclusiveStartKey
    )

    if (response.actions.length === 0) {
      throw new NoItemsFoundError('No actions found')
    }

    return response
  }
}
