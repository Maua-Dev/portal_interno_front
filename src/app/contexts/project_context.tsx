import { createContext } from 'react'
import {
  RegistryProject,
  containerProject
} from '../../@clean/shared/infra/containers/container_project'
import { GetAllProjectsUsecase } from '../../@clean/modules/project/usecases/get_all_projects_usecase'
import { ProjectType } from '../../@clean/shared/infra/repositories/project_repository_http'

export type ProjectContextType = {
  getAllProjects: () => Promise<ProjectType[]>
}

const projectContextDefault: ProjectContextType = {
  getAllProjects: async () => {
    return []
  }
}

export const ProjectContext = createContext<ProjectContextType>(
  projectContextDefault
)

const getAllProjectsUsecase = containerProject.get<GetAllProjectsUsecase>(
  RegistryProject.getAllProjectsUsecase
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

  return (
    <ProjectContext.Provider value={{ getAllProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}
