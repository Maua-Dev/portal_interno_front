import { IActionRepository } from '../domain/repositories/action_repository_interface'

export class GetAllProjectsUsecase {
  constructor(private actionRepo: IActionRepository) {}

  async execute(): Promise<any> {
    return await this.actionRepo.getAllProjects()
  }
}
