import { IProjectRepository } from '../domain/repositories/project_repository_interface'

export class GetAllProjectsUsecase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute() {
    const projects = await this.repo.getAllProjects()

    return projects
  }
}
