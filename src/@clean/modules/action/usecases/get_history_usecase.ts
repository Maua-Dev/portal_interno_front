import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
import { historyResponse } from '../../../shared/infra/repositories/action_repository_http'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

interface ExecuteParams {
  start?: number
  end?: number
  amount?: number
  exclusiveStartKey?: {
    actionId: string
    startDate: number
  }
  memberUserId?: string
}

export class GetHistoryUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(params: ExecuteParams = {}): Promise<historyResponse> {
    const { start, end, amount, exclusiveStartKey, memberUserId } = params

    //  Query Parameters Dinamically
    const queryParams: any = {}

    if (start !== undefined) queryParams.start = start
    if (end !== undefined) queryParams.end = end
    if (amount !== undefined) queryParams.amount = amount
    if (exclusiveStartKey !== undefined)
      queryParams.exclusiveStartKey = exclusiveStartKey
    if (memberUserId !== undefined) queryParams.memberUserId = memberUserId

    const response = await this.actionRepo.getHistoryActions(queryParams)

    if (!response.actions || response.actions.length === 0) {
      throw new NoItemsFoundError('No actions found')
    }

    return response
  }
}

// import { NoItemsFoundError } from '../../../shared/domain/helpers/errors/domain_error'
// import { historyResponse } from '../../../shared/infra/repositories/action_repository_http'
// import { IActionRepository } from '../domain/repositories/action_repository_interface'

// export class GetHistoryUsecase {
//   constructor(private actionRepo: IActionRepository) {}

//   async execute(
//     start?: number,
//     end?: number,
//     amount?: number,
//     exclusiveStartKey?: {
//       actionId: string
//       startDate: number
//     },
//     memberUserId?: string // add the memberUserId case
//   ): Promise<historyResponse> {
//     if (
//       start !== undefined &&
//       end !== undefined &&
//       amount !== undefined &&
//       exclusiveStartKey !== undefined
//     ) {
//       const response = await this.actionRepo.getHistoryActions(
//         start,
//         end,
//         amount,
//         exclusiveStartKey
//       )

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (
//       start !== undefined &&
//       end !== undefined &&
//       amount !== undefined
//     ) {
//       const response = await this.actionRepo.getHistoryActions(
//         start,
//         end,
//         amount,
//         undefined
//       )

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (start !== undefined && end !== undefined) {
//       const response = await this.actionRepo.getHistoryActions(start, end)

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (start !== undefined && amount !== undefined) {
//       const response = await this.actionRepo.getHistoryActions(amount)

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (end !== undefined && amount !== undefined) {
//       const response = await this.actionRepo.getHistoryActions(
//         undefined,
//         end,
//         amount,
//         undefined
//       )

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (exclusiveStartKey !== undefined && amount !== undefined) {
//       const response = await this.actionRepo.getHistoryActions(
//         undefined,
//         undefined,
//         amount,
//         exclusiveStartKey
//       )

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else if (amount !== undefined) {
//       const response = await this.actionRepo.getHistoryActions(
//         undefined,
//         undefined,
//         amount,
//         undefined
//       )

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     } else {
//       const response = await this.actionRepo.getHistoryActions()

//       if (response.actions.length === 0) {
//         throw new NoItemsFoundError('No actions found')
//       }

//       return response
//     }
//   }
// }
