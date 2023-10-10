import { AssociatedAction } from '../../../../shared/domain/entities/associated_action'
import { Action } from '../../../../shared/domain/entities/action'
import { historyResponse } from '../../../../shared/infra/repositories/action_repository_http'

export interface IActionRepository {
  // creates action and associatedActions for each associatedMember and the owner
  createAction(action: Action): Promise<Action>
  getAction(actionId: string): Promise<Action>

  // Retrieves all associated actions of a member, filtered by an optional time range specified by start and end parameters.
  // The method allows for pagination using the exclusive_start_key parameter to determine the starting point of the action list, and the amount parameter to determine the maximum number of actions to be retrieved.
  // If no actions are found, returns []
  getHistoryActions(
    ra: string,
    amount?: number, // quantidade de actions retornadas
    start?: number, // milissegundos da data do inicio das actions
    end?: number, // milissegundos da data de fim da action (vai até essa data contando ela mesma)
    exclusiveStartKey?: {
      action_id: string
      start_date: number
    }
  ): Promise<historyResponse>

  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction>
}
