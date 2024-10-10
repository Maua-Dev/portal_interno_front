import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class DeleteActionUsecase {
  constructor(private readonly actionRepo: IActionRepository) {}

  async execute(actionId: string): Promise<void> {
    const actionDeleted = await this.actionRepo.deleteAction(actionId)
    return actionDeleted
  }
}
