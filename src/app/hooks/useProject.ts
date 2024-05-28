import { useContext, useState } from 'react'
import { ProjectContext } from '../contexts/project_context'
import { ProjectType } from '../../@clean/shared/infra/repositories/project_repository_http'

export const useProject = () => {
  const [projects, setProjects] = useState<ProjectType[]>([])

  const { getAllProjects } = useContext(ProjectContext)

  const handleProjects = async () => {
    try {
      const response = await getAllProjects()
      setProjects(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  return { getAllProjects, projects, handleProjects }
}
