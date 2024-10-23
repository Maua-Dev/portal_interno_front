import { AxiosInstance } from 'axios'
import { IProjectRepository } from '../../../modules/project/domain/repositories/project_repository_interface'
import { JsonProps, Project } from '../../domain/entities/project'
import { decorate, injectable } from 'inversify'

type ProjectRawResponse = {
  project: {
    code: string
    description: string
    members_user_ids: string[]
    name: string
    photo: string
    po_user_id: string
    scrum_user_id: string
    start_date: number
  }
}

export type ProjectType = {
  code: string
  description: string
  membersUserIds: string[]
  name: string
  photo: string
  poUserId: string
  scrumUserId: string
  startDate: number
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
    photo: string
  ) {
    try {
      const token = localStorage.getItem('idToken')

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
          photo
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

  async deleteProject(code: string): Promise<ProjectType> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.delete(`/delete-project`, {
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          code: code
        }
      })

      const project = Project.fromJSON(response.data)

      return project
    } catch (error: any) {
      return error.response.data
    }
  }

  async getAllProjects(): Promise<ProjectType[]> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.get('/get-all-projects', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      const responseFormatted: ProjectType[] = []

      response.data.projects.map((project: ProjectRawResponse) => {
        const data = project.project
        responseFormatted.push({
          code: data.code,
          description: data.description,
          membersUserIds: data.members_user_ids,
          name: data.name,
          photo: data.photo,
          poUserId: data.po_user_id,
          scrumUserId: data.scrum_user_id,
          startDate: data.start_date
        })
      })

      return responseFormatted
    } catch (error: any) {
      throw new Error('Error getting all projects: ' + error.message)
    }
  }
  async getProject(code: string) {
    try {
      const token = localStorage.getItem('idToken')

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
    newPhoto?: string | undefined
  ) {
    console.log('hereee')
    try {
      const token = localStorage.getItem('idToken')

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
          new_photo: newPhoto
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

decorate(injectable(), ProjectRepositoryHttp)
