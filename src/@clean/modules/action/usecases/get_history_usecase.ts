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
    const associatedActions = await this.actionRepo.getAssociatedActionsByRa(
      ra,
      amount,
      start,
      end,
      exclusiveStartKey
    )

    if (associatedActions.length === 0) throw new NoItemsFoundError(ra)

    const actionIds = associatedActions.map(
      (associatedAction) => associatedAction.action.actionId
    )
    const actions = (await this.actionRepo.batchGetActions(actionIds)).sort(
      (a, b) => {
        return b.startDate - a.startDate
      }
    )

    const lastId =
      associatedActions[associatedActions.length - 1].action.actionId

    return {
      actions,
      lastId
    }
  }
}
