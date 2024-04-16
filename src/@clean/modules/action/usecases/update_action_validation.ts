import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class UpdateActionValidationUsecase {
  constructor(private readonly repo: IActionRepository) {}

  async execute(actionId: string, isValid: boolean) {
    const action = await this.repo.updateActionValidation(actionId, isValid)

    return action
  }
}
