import { createContext } from "react"
import { Project } from "../../@clean/shared/domain/entities/project"
import { RegistryProject, containerProject } from "../../@clean/shared/infra/containers/container_project"
import { GetAllProjectsUsecase } from "../../@clean/modules/project/usecases/get_all_projects_usecase"

export type ProjectContextType = {
    getAllProjects: () => Promise<Project[]>
}

const projectContextDefault: ProjectContextType = {
    getAllProjects: async () => {
        return []
    }
}

export const ProjectContext = createContext<ProjectContextType>(projectContextDefault)

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