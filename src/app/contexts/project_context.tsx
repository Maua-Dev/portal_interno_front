import { createContext } from 'react'
import {
  RegistryProject,
  containerProject
} from '../../@clean/shared/infra/containers/container_project'
import { GetAllProjectsUsecase } from '../../@clean/modules/project/usecases/get_all_projects_usecase'
import { ProjectType } from '../../@clean/shared/infra/repositories/project_repository_http'
import { DeleteProjectUsecase } from '../../@clean/modules/project/usecases/delete_project_usecase'
import { CreateProjectUsecase } from '../../@clean/modules/project/usecases/create_project_usecase'
import { UpdateProjectUsecase } from '../../@clean/modules/project/usecases/update_project_usecase'

export type ProjectContextType = {
  getAllProjects: () => Promise<ProjectType[]>
  createProject: (project: ProjectType) => Promise<ProjectType>
  updateProject: (oldCode: string, project: ProjectType) => Promise<ProjectType>
  deleteProject: (code: string) => Promise<ProjectType>
}

const projectContextDefault: ProjectContextType = {
  getAllProjects: async () => {
    return []
  },

  createProject: async () => {
    return {} as ProjectType
  },

  updateProject: async () => {
    return {} as ProjectType
  },

  deleteProject: async () => {
    return {} as ProjectType
  }
}

export const ProjectContext = createContext<ProjectContextType>(
  projectContextDefault
)

const getAllProjectsUsecase = containerProject.get<GetAllProjectsUsecase>(
  RegistryProject.getAllProjectsUsecase
)

const createProjectUsecase = containerProject.get<CreateProjectUsecase>(
  RegistryProject.createProjectUsecase
)

const updateProjectUsecase = containerProject.get<UpdateProjectUsecase>(
  RegistryProject.updateProjectUsecase
)

const deleteProjectUsecase = containerProject.get<DeleteProjectUsecase>(
  RegistryProject.deleteProjectUsecase
)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const getAllProjects = async () => {
    try {
      const projects = await getAllProjectsUsecase.execute()

      return projects
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const createProject = async (project: ProjectType) => {
    try {
      console.log('owfowf')
      console.log(project)

      const projectCreated = await createProjectUsecase.execute(
        project.code,
        project.name,
        project.description,
        project.poUserId,
        project.scrumUserId,
        project.startDate,
        project.membersUserIds,
        project.photos ?? []
      )

      return projectCreated
    } catch (error: any) {
      throw new Error(
        'Something went wrong on creating project: ' + error.message
      )
    }
  }

  const updateProject = async (oldCode: string, project: ProjectType) => {
    console.log('p,qmfqfpqfqp')
    console.log(project)
    try {
      const projectUpdated = await updateProjectUsecase.execute(
        oldCode,
        project.code,
        project.name,
        project.description,
        project.poUserId,
        project.scrumUserId,
        project.startDate,
        project.membersUserIds,
        project.photos
      )

      return projectUpdated
    } catch (error: any) {
      throw new Error(
        'Something went wrong on updating project: ' + error.message
      )
    }
  }

  const deleteProject = async (code: string) => {
    try {
      const deletedProject = await deleteProjectUsecase.execute(code)

      return deletedProject
    } catch (error: any) {
      throw new Error(
        'Something went wrong on delete project: ' + error.message
      )
    }
  }

  return (
    <ProjectContext.Provider
      value={{ getAllProjects, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
