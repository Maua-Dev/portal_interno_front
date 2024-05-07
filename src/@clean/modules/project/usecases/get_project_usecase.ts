import { IProjectRepository } from '../domain/repositories/project_repository_interface'

export class GetProjectUsecase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(code: string) {
    const project = await this.repo.getProject(code)

    return project
  }
}
