import { createContext } from 'react'
import {
  RegistryProject,
  containerProject
} from '../../@clean/shared/infra/containers/container_project'
import { GetAllProjectsUsecase } from '../../@clean/modules/project/usecases/get_all_projects_usecase'
import { ProjectType } from '../../@clean/shared/infra/repositories/project_repository_http'
import { DeleteProjectUsecase } from '../../@clean/modules/project/usecases/delete_project_usecase'

export type ProjectContextType = {
  getAllProjects: () => Promise<ProjectType[]>
  deleteProject: (code: string) => Promise<ProjectType>
}

const projectContextDefault: ProjectContextType = {
  getAllProjects: async () => {
    return []
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
    <ProjectContext.Provider value={{ getAllProjects, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
