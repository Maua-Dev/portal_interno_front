import { IProjectRepository } from '../domain/repositories/project_repository_interface'

export class UpdateProjectUsecase {
  constructor(private readonly repo: IProjectRepository) {}

  async execute(
    code: string,
    newCode?: string,
    newName?: string,
    newDescription?: string,
    newPoUserId?: string,
    newScrumUserId?: string,
    newStartDate?: number,
    newMembersUserIds?: string[],
    newPhoto?: string
  ) {
    const project = await this.repo.updateProject(
      code,
      newCode,
      newName,
      newDescription,
      newPoUserId,
      newScrumUserId,
      newStartDate,
      newMembersUserIds,
      newPhoto
    )

    return project
  }
}
