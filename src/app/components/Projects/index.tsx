import { useState } from 'react'
import FilterBar, { FilterProps } from '../FilterBar'
import { projectFilterOptions } from './filterOptions'
import { Monitor } from 'lucide-react'
import ProjectCard from './components/ProjectCard'

export default function Projects() {
  const [filterProps, setFilterProps] = useState<FilterProps>({
    searchText: '',
    active: '',
    orderBy: ''
  })

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
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  )
}
