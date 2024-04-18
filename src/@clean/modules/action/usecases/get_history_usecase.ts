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
    if (
      start !== undefined &&
      end !== undefined &&
      amount !== undefined &&
      exclusiveStartKey !== undefined
    ) {
      const response = await this.actionRepo.getHistoryActions(
        start,
        end,
        amount,
        exclusiveStartKey
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (
      start !== undefined &&
      end !== undefined &&
      amount !== undefined
    ) {
      const response = await this.actionRepo.getHistoryActions(
        start,
        end,
        amount,
        undefined
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (start !== undefined && end !== undefined) {
      const response = await this.actionRepo.getHistoryActions(start, end)

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (start !== undefined && amount !== undefined) {
      const response = await this.actionRepo.getHistoryActions(amount)

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (end !== undefined && amount !== undefined) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        end,
        amount,
        undefined
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (exclusiveStartKey !== undefined && amount !== undefined) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        undefined,
        amount,
        exclusiveStartKey
      )

      if (response.actions.length === 0) {
        throw new NoItemsFoundError('No actions found')
      }

      return response
    } else if (amount !== undefined) {
      const response = await this.actionRepo.getHistoryActions(
        undefined,
        undefined,
        amount,
        undefined
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
