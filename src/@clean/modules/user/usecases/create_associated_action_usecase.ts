import { IActionRepository } from '../domain/repositories/action_repository_interface'
import { AssociatedAction } from '@/@clean/shared/domain/entities/associated_action'

export class CreateAssociatedAction {
  constructor(private actionRepo: IActionRepository) {}

  async execute(associatedAction: AssociatedAction): Promise<AssociatedAction> {
    const associatedActionCreated =
      await this.actionRepo.createAssociatedAction(associatedAction)
    return associatedActionCreated
  }
}
