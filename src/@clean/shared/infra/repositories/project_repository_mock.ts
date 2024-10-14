import { IProjectRepository } from '../../../modules/project/domain/repositories/project_repository_interface'
import { Project } from '../../domain/entities/project'
import { ProjectType } from './project_repository_http'

export class ProjectRepositoryMock implements IProjectRepository {
  private projects: Project[] = [
    new Project({
      code: 'P001',
      name: 'Project Alpha',
      description: 'A project focused on developing an AI-powered chatbot.',
      poUserId: 'user_123',
      scrumUserId: 'user_456',
      startDate: 1625155200000, // Unix timestamp for July 1, 2021 in milliseconds
      membersUserIds: ['user_123', 'user_456', 'user_789'],
      photos: ['photo1.jpg', 'photo2.jpg']
    }),
    new Project({
      code: 'P002',
      name: 'Project Beta',
      description: 'A project aimed at building a new e-commerce platform.',
      poUserId: 'user_234',
      scrumUserId: 'user_567',
      startDate: 1640995200000, // Unix timestamp for January 1, 2022 in milliseconds
      membersUserIds: ['user_234', 'user_567', 'user_890'],
      photos: ['photo3.jpg', 'photo4.jpg']
    }),
    new Project({
      code: 'P003',
      name: 'Project Gamma',
      description: 'A project for developing a mobile game.',
      poUserId: 'user_345',
      scrumUserId: 'user_678',
      startDate: 1656633600000, // Unix timestamp for July 1, 2022 in milliseconds
      membersUserIds: ['user_345', 'user_678', 'user_901'],
      photos: ['photo5.jpg', 'photo6.jpg']
    }),
    new Project({
      code: 'P004',
      name: 'Project Delta',
      description: 'A project to create a new social media platform.',
      poUserId: 'user_456',
      scrumUserId: 'user_789',
      startDate: 1672531200000, // Unix timestamp for January 1, 2023 in milliseconds
      membersUserIds: ['user_456', 'user_789', 'user_012'],
      photos: ['photo7.jpg', 'photo8.jpg']
    }),
    new Project({
      code: 'P005',
      name: 'Project Epsilon',
      description: 'A project for building a cloud storage solution.',
      poUserId: 'user_567',
      scrumUserId: 'user_890',
      startDate: 1688169600000, // Unix timestamp for July 1, 2023 in milliseconds
      membersUserIds: ['user_567', 'user_890', 'user_123'],
      photos: ['photo9.jpg', 'photo10.jpg']
    })
  ]

  async createProject(
    code: string,
    name: string,
    description: string,
    poUserId: string,
    scrumUserId: string,
    startDate: number,
    membersUserIds: string[],
    photos: string[]
  ): Promise<Project> {
    const newProject = new Project({
      code,
      name,
      description,
      poUserId,
      scrumUserId,
      startDate,
      membersUserIds,
      photos
    })

    this.projects.push(newProject)

    return newProject
  }

  async deleteProject(code: string): Promise<Project> {
    const projectIndex = this.projects.findIndex(
      (project) => project.code === code
    )
    if (projectIndex === -1) {
      throw new Error(`Project with code ${code} not found`)
    }
    const deletedProject = this.projects.splice(projectIndex, 1)[0]
    return deletedProject
  }

  async getAllProjects(): Promise<ProjectType[]> {
    return this.projects
  }

  async getProject(code: string): Promise<Project> {
    const projectIndex = this.projects.findIndex(
      (project) => project.code === code
    )
    if (projectIndex === -1) {
      throw new Error(`Project with code ${code} not found`)
    }

    return this.projects[projectIndex]
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
  ): Promise<Project> {
    const projectIndex = this.projects.findIndex(
      (project) => project.code === code
    )
    if (projectIndex === -1) {
      throw new Error(`Project with code ${code} not found`)
    }

    const project = this.projects[projectIndex]

    this.projects[projectIndex] = new Project({
      code: newCode ?? project.code,
      name: newName ?? project.name,
      description: newDescription ?? project.description,
      poUserId: newPoUserId ?? project.poUserId,
      scrumUserId: newScrumUserId ?? project.scrumUserId,
      startDate: newStartDate ?? project.startDate,
      membersUserIds: newMembersUserIds ?? project.membersUserIds,
      photos: newPhotos ?? project.photos
    })

    return this.projects[projectIndex]
  }
}
