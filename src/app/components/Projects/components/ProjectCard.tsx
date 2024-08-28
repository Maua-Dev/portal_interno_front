import { BsThreeDots } from 'react-icons/bs'
import { useDarkMode } from '../../../hooks/useDarkMode'
import Card from '../../Card'
import { IconText, StateIcon } from '../../Historic/components/Icon'
import HoverCard from '../../HoverCard'
import { Calendar, PenBox, Trash2 } from 'lucide-react'
import { ProjectType } from '../../../../@clean/shared/infra/repositories/project_repository_http'
import { HTMLAttributes, useContext, useState } from 'react'
import { MemberContext } from '../../../contexts/member_context'
import { timeStampToDateDDMMYY } from '../../../utils/functions/timeStamp'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger
} from '../../Historic/components/Popover'
import Button from '../../Historic/components/Button'
import { twMerge } from 'tailwind-merge'
import { ProjectContext } from '../../../contexts/project_context'

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectType
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[] | undefined>>
}

export default function ProjectCard({
  project,
  setProjects,
  ...props
}: ProjectCardProps) {
  const startDateFormated = timeStampToDateDDMMYY(project.startDate)
  const [isPopUpOpen, setPopUpOpen] = useState<boolean>(false)
  const { darkMode } = useDarkMode()
  const { allMembers } = useContext(MemberContext)
  const { deleteProject } = useContext(ProjectContext)

  const closeSettingsPopUp = () => {
    setPopUpOpen(false)
  }

  const openSeetingsPopUp = () => {
    setPopUpOpen(true)
  }

  async function handleDeleteProject(code: string) {
    setProjects((prev) =>
      prev ? prev.filter((item) => item.code !== code) : []
    )

    if (confirm('Deseja excluir o projeto?')) {
      await deleteProject(code)
    }
  }

  return (
    <Card
      variant="lg"
      className={twMerge(
        'static flex h-fit cursor-pointer flex-col items-center justify-between gap-5 pr-6 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:brightness-100 sm:flex-row sm:gap-0',
        props.className
      )}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <div className="flex flex-row items-center justify-start gap-2 md:w-3/6">
          <StateIcon variant={'approved'} />
          <div className="flex flex-col gap-1">
            <p className="pl-2 text-lg font-semibold">{project.name}</p>
            <div className="flex flex-row gap-2 rounded-full bg-skin-fill pr-2 text-sm text-white ">
              <HoverCard side="top" placeholder={'PO'}>
                <p className="flex items-center justify-center rounded-full bg-skin-button-blue-accent px-2 text-center">
                  {allMembers?.find(
                    (member) => member.userId === project.poUserId
                  )
                    ? allMembers.find(
                        (member) => member.userId === project.poUserId
                      )?.name
                    : '?'}
                </p>
              </HoverCard>
              <HoverCard side="top" placeholder="SCRUM">
                <p
                  className={`flex items-center justify-center text-center ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {allMembers?.find(
                    (member) => member.userId === project.scrumUserId
                  )
                    ? allMembers.find(
                        (member) => member.userId === project.scrumUserId
                      )?.name
                    : '?'}
                </p>
              </HoverCard>
            </div>
          </div>
        </div>
        <p>
          {project.description.length > 60
            ? project.description.slice(0, 60) + ' ...'
            : project.description}
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <IconText text={startDateFormated} icon={Calendar} />
        <div onMouseLeave={closeSettingsPopUp}>
          <Popover open={isPopUpOpen} onOpenChange={setPopUpOpen}>
            <PopoverTrigger>
              <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-base" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="z-30" onMouseEnter={openSeetingsPopUp}>
                <Button
                  variant="default"
                  onClick={(event) => {
                    // changeModalContent(<ActionModal action={action} />)
                    setPopUpOpen(false)
                    event.stopPropagation()
                  }}
                >
                  <PenBox className="w-4" />
                  Editar
                </Button>
                <Button
                  onClick={(event) => {
                    handleDeleteProject(project.code)
                    setPopUpOpen(false)
                    event.stopPropagation()
                  }}
                  variant="destructive"
                >
                  <Trash2 className="w-4" />
                  Excluir
                </Button>
                <PopoverArrow children={undefined} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  )
}
