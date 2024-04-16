import { AxiosInstance } from 'axios'
import { IProjectRepository } from '../../../modules/project/domain/repositories/project_repository_interface'
import { JsonProps, Project } from '../../domain/entities/project'

interface getAllProjectsResponse {
  projects: JsonProps[]
}

export class ProjectRepositoryHttp implements IProjectRepository {
  constructor(private readonly http: AxiosInstance) {}

  async createProject(
    code: string,
    name: string,
    description: string,
    poUserId: string,
    scrumUserId: string,
    startDate: number,
    membersUserIds: string[],
    photos: string[]
  ) {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<JsonProps>(
        '/create-project',
        {
          code,
          name,
          description,
          po_user_id: poUserId,
          scrum_user_id: scrumUserId,
          start_date: startDate,
          members_user_ids: membersUserIds,
          photos
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const project = Project.fromJSON(response.data)

      return project
    } catch (error: any) {
      return error.response.data
    }
  }
  async deleteProject(code: string) {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.delete<JsonProps>(
        `/delete-project?code=${code}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const project = Project.fromJSON(response.data)

      return project
    } catch (error: any) {
      return error.response.data
    }
  }
  async getAllProjects() {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.get<getAllProjectsResponse>(
        '/get-all-projects',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const projects = response.data.projects.map((project) =>
        Project.fromJSON(project)
      )

      return projects
    } catch (error: any) {
      return error.response.data
    }
  }
  async getProject(code: string) {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.get<JsonProps>(
        `/get-project?code=${code}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const project = Project.fromJSON(response.data)

      return project
    } catch (error: any) {
      return error.response.data
    }
  }

  async updateProject(
    code: string,
    newCode?: string | undefined,
    newName?: string | undefined,
    newDescription?: string | undefined,
    newPoUserId?: string | undefined,
    newScrumUserId?: string | undefined,
    newStartDate?: number | undefined,
    newMembersUserIds?: string[] | undefined,
    newPhotos?: string[] | undefined
  ) {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.put<JsonProps>(
        '/update-project',
        {
          code,
          new_code: newCode,
          new_name: newName,
          new_description: newDescription,
          new_po_user_id: newPoUserId,
          new_scrum_user_id: newScrumUserId,
          new_start_date: newStartDate,
          new_members_user_ids: newMembersUserIds,
          new_photos: newPhotos
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const project = Project.fromJSON(response.data)

      return project
    } catch (error: any) {
      return error.response.data
    }
  }
}
