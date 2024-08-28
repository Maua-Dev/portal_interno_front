import { useContext, useEffect, useMemo, useState } from 'react'
import FilterBar, { FilterProps } from '../FilterBar'
import { projectFilterOptions } from './filterOptions'
import { Monitor } from 'lucide-react'
import ProjectCard from './components/ProjectCard'
import { ProjectContext } from '../../contexts/project_context'
import { ProjectType } from '../../../@clean/shared/infra/repositories/project_repository_http'
import { motion } from 'framer-motion'
import Loader from '../Loader'
import ProjectCardSkeleton from './components/ProjectCardSkeleton'

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

  const filteredProjects: ProjectType[] = useMemo(() => {
    if (!projects) {
      return []
    }

    if (filterProps.searchText === '' && filterProps.orderBy === '') {
      return projects
    }

    let currentProjects = projects

    if (filterProps.searchText !== '') {
      const searchTextLowerCase = filterProps.searchText.toLowerCase()
      currentProjects = currentProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTextLowerCase) ||
          project.description.toLowerCase().includes(searchTextLowerCase) ||
          project.code.toLocaleLowerCase().includes(searchTextLowerCase)
      )
    }

    switch (filterProps.orderBy) {
      case 'OLD':
        currentProjects.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        break
      case 'NEW':
        currentProjects.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )
        break
      default:
        break
    }

    return currentProjects
  }, [filterProps])

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
        {filteredProjects.length !== 0 ? (
          filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={index + '' + project.code}
                initial={{ marginLeft: '50px', opacity: 0 }}
                animate={{ marginLeft: '0px', opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="flex w-full justify-center"
              >
                <ProjectCard key={project.name + index} project={project} />
              </motion.div>
            )
          })
        ) : (
          <Loader SkeletonComponent={ProjectCardSkeleton} />
        )}
      </div>
    </div>
  )
}
