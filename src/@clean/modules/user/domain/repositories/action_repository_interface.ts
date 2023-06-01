import { Action } from '@/@clean/shared/domain/entities/action'
import { AssociatedAction } from '@/@clean/shared/domain/entities/associated_action'

export interface IActionRepository {
  // creates action and associatedActions for each associatedMember and the owner
  createAction(action: Action): Promise<Action>
  getAction(actionId: string): Promise<Action>
  createAssociatedAction(
    associatedAction: AssociatedAction
  ): Promise<AssociatedAction>
}
