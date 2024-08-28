import { ProjectType } from '../../../shared/infra/repositories/project_repository_http'
import { IProjectRepository } from '../domain/repositories/project_repository_interface'

export class DeleteProjectUsecase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(code: string): Promise<ProjectType> {
    const project = await this.repo.deleteProject(code)

    return project
  }
}
