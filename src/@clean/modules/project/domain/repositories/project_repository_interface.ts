import { Project } from '../../../../shared/domain/entities/project'
import { ProjectType } from '../../../../shared/infra/repositories/project_repository_http'

export interface IProjectRepository {
  createProject(
    code: string,
    name: string,
    description: string,
    poUserId: string,
    scrumUserId: string,
    startDate: number,
    membersUserIds: string[],
    photos: string[]
  ): Promise<Project>

  deleteProject(code: string): Promise<Project>

  getAllProjects(): Promise<ProjectType[]>

  getProject(code: string): Promise<Project>

  updateProject(
    code: string,
    newCode?: string,
    newName?: string,
    newDescription?: string,
    newPoUserId?: string,
    newScrumUserId?: string,
    newStartDate?: number,
    newMembersUserIds?: string[],
    newPhotos?: string[]
  ): Promise<Project>
}
