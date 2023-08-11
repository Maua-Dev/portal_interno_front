import { AssociatedAction } from '../../../../shared/domain/entities/associated_action'
import { Action } from '../../../../shared/domain/entities/action'

export interface IActionRepository {
  // creates action and associatedActions for each associatedMember and the owner
  createAction(action: Action): Promise<Action>
  getAction(actionId: string): Promise<Action>
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction>
}
