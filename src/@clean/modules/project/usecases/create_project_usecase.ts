import { IProjectRepository } from '../domain/repositories/project_repository_interface'

export class CreateProjectUsecase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(
    code: string,
    name: string,
    description: string,
    poUserId: string,
    scrumUserId: string,
    startDate: number,
    membersUserIds: string[],
    photo: string
  ) {
    const project = await this.repo.createProject(
      code,
      name,
      description,
      poUserId,
      scrumUserId,
      startDate,
      membersUserIds,
      photo
    )

    return project
  }
}
