import { Action } from '../../../shared/domain/entities/action'
import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { historyResponse } from '../../../shared/infra/repositories/action_repository_http'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class GetHistoryUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(
    start?: number,
    end?: number,
    amount?: number,
    exclusiveStartKey?: {
      actionId: string
      startDate: number
    }
  ): Promise<historyResponse> {
    if (start && end && amount && exclusiveStartKey) {
      const response = await this.actionRepo.getHistoryActions(
        amount,
        start,
        end,
        exclusiveStartKey
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (start && end && amount) {
      const response = await this.actionRepo.getHistoryActions(
        start,
        end,
        amount
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (start && end) {
      const response = await this.actionRepo.getHistoryActions(start, end)

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (start && amount) {
      const response = await this.actionRepo.getHistoryActions(amount)

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (end && amount) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        end,
        amount
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (amount) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        undefined,
        amount
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (exclusiveStartKey) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        undefined,
        undefined,
        exclusiveStartKey
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else {
      const response = await this.actionRepo.getHistoryActions()

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    }
  }
}
