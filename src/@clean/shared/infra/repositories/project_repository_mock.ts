import { type IProjectRepository } from '../../../modules/project/domain/repositories/project_repository_interface'
import { Project } from '../../domain/entities/project'
import { type ProjectType } from './project_repository_http'
import { injectable } from 'inversify'

@injectable()
export class ProjectRepositoryMock implements IProjectRepository {
  private projects: Project[] = [
    new Project({
      code: 'PA',
      name: 'Project Alpha',
      description: 'A project focused on developing an AI-powered chatbot.',
      poUserId: '11111111-1111-1111-1111-111111111111',
      scrumUserId: '22222222-2222-2222-2222-222222222222',
      startDate: 1625155200000,
      membersUserIds: [
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        '99999999-9999-9999-9999-999999999999'
      ],
      photo: 'photo1.jpg'
    }),
    new Project({
      code: 'PB',
      name: 'Project Beta',
      description: 'A project aimed at building a new e-commerce platform.',
      poUserId: '33333333-3333-3333-3333-333333333333',
      scrumUserId: '44444444-4444-4444-4444-444444444444',
      startDate: 1640995200000,
      membersUserIds: [
        '33333333-3333-3333-3333-333333333333',
        '44444444-4444-4444-4444-444444444444',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
      ],
      photo: 'photo1.jpg'
    }),
    new Project({
      code: 'PG',
      name: 'Project Gamma',
      description: 'A project for developing a mobile game.',
      poUserId: '55555555-5555-5555-5555-555555555555',
      scrumUserId: '66666666-6666-6666-6666-666666666666',
      startDate: 1656633600000,
      membersUserIds: [
        '55555555-5555-5555-5555-555555555555',
        '66666666-6666-6666-6666-666666666666',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
      ],
      photo: 'photo1.jpg'
    }),
    new Project({
      code: 'PD',
      name: 'Project Delta',
      description: 'A project to create a new social media platform.',
      poUserId: '77777777-7777-7777-7777-777777777777',
      scrumUserId: '88888888-8888-8888-8888-888888888888',
      startDate: 1672531200000,
      membersUserIds: [
        '77777777-7777-7777-7777-777777777777',
        '88888888-8888-8888-8888-888888888888',
        'cccccccc-cccc-cccc-cccc-cccccccccccc'
      ],
      photo: 'photo1.jpg'
    }),
    new Project({
      code: 'PE',
      name: 'Project Epsilon',
      description: 'A project for building a cloud storage solution.',
      poUserId: '99999999-9999-9999-9999-999999999999',
      scrumUserId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      startDate: 1688169600000,
      membersUserIds: [
        '99999999-9999-9999-9999-999999999999',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'dddddddd-dddd-dddd-dddd-dddddddddddd'
      ],
      photo: 'photo1.jpg'
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
    photo: string
  ): Promise<Project> {
    const newProject = new Project({
      code,
      name,
      description,
      poUserId,
      scrumUserId,
      startDate,
      membersUserIds,
      photo
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
    newPhoto?: string | undefined
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
      photo: newPhoto ?? project.photo
    })

    return this.projects[projectIndex]
  }
}
