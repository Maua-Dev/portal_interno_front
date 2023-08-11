import { AssociatedAction } from '../../../shared/domain/entities/associated_action'
import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class CreateAssociatedActionUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(associatedAction: AssociatedAction): Promise<AssociatedAction> {
    const associatedActionCreated =
      await this.actionRepo.createAssociatedAction(associatedAction)
    return associatedActionCreated
  }
}
