import { AssociatedAction } from '../../../../shared/domain/entities/associated_action'
import { Action } from '../../../../shared/domain/entities/action'

export interface IActionRepository {
  // creates action and associatedActions for each associatedMember and the owner
  createAction(action: Action): Promise<Action>
  getAction(actionId: string): Promise<Action>

  // Retrieves all associated actions of a member, filtered by an optional time range specified by start and end parameters.
  // The method allows for pagination using the exclusive_start_key parameter to determine the starting point of the action list, and the amount parameter to determine the maximum number of actions to be retrieved.
  // If no actions are found, returns []
  getAssociatedActionsByRa(
    ra: string,
    amount: number,
    start?: number,
    end?: number,
    exclusiveStartKey?: string
  ): Promise<AssociatedAction[]>

  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction>
}
