import { useContext, useEffect, useState } from 'react'
import FilterBar, { FilterProps } from '../FilterBar'
import { projectFilterOptions } from './filterOptions'
import { Monitor } from 'lucide-react'
import ProjectCard from './components/ProjectCard'
import { ProjectContext } from '../../contexts/project_context'
import { ProjectType } from '../../../@clean/shared/infra/repositories/project_repository_http'

export default function Projects() {
  const { getAllProjects } = useContext(ProjectContext)
  const [projects, setProjects] = useState<ProjectType[] | undefined>(undefined)
  const [filterProps, setFilterProps] = useState<FilterProps>({
    searchText: '',
    active: '',
    orderBy: ''
  })

  async function loadAllProjects() {
    const projects = await getAllProjects()
    setProjects(projects)
  }

  useEffect(() => {
    loadAllProjects()
  }, [])

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-2 py-20 pl-0 md:py-10 md:pl-14">
      <FilterBar
        label={'Projetos'}
        icon={Monitor}
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        filterOptions={projectFilterOptions}
        className="z-30"
      />
      <div
        className={`z-10 flex h-fit w-full flex-col items-center gap-2 ${
          3 < 10 ? 'h-screen' : null
        } `}
      >
        {projects &&
          projects.map((project, index) => {
            return <ProjectCard key={project.name + index} project={project} />
          })}
      </div>
    </div>
  )
}