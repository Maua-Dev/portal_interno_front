import { BsThreeDots } from 'react-icons/bs'
import { useDarkMode } from '../../../hooks/useDarkMode'
import Card from '../../Card'
import { IconText, StateIcon } from '../../Historic/components/Icon'
import HoverCard from '../../HoverCard'
import { Calendar } from 'lucide-react'

interface ProjectCardProps {
  name: string
  description: string
  poUserId: string
  scrumUserId: string
  startDate: number
}

const MOCK_DESCRIPTION =
  'O Gerenciador de Tarefas Colaborativo é uma aplicação web inovadora desenvolvida para ajudar equipes a gerenciar suas tarefas e projetos de forma eficiente e colaborativa. A plataforma permite que os usuários criem, organizem e acompanhem tarefas, promovendo uma comunicação fluida e uma gestão de tempo otimizada. Com uma interface intuitiva e recursos poderosos, o Gerenciador de Tarefas Colaborativo é a solução ideal para equipes de todos os tamanhos que buscam aumentar a produtividade e melhorar a colaboração.'

export default function ProjectCard() {
  const { darkMode } = useDarkMode()

  return (
    <Card
      variant="lg"
      className={
        'static flex h-fit cursor-pointer flex-col items-center justify-between gap-5 pr-6 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:brightness-100 sm:flex-row sm:gap-0'
      }
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <StateIcon variant={'approved'} />
        <div className="flex flex-col gap-1">
          <p className="pl-2 text-lg font-semibold">Portal Interno</p>
          <div className="flex flex-row gap-2 rounded-full bg-skin-fill pr-2 text-sm text-white ">
            <HoverCard side="top" placeholder={'PO'}>
              <p className="flex items-center justify-center rounded-full bg-skin-button-blue-accent px-2 text-center">
                Fernando Azevedo
              </p>
            </HoverCard>
            <HoverCard side="top" placeholder="SCRUM">
              <p
                className={`flex items-center justify-center text-center ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Bernardo
              </p>
            </HoverCard>
          </div>
        </div>
      </div>
      <p>
        {MOCK_DESCRIPTION.length > 60
          ? MOCK_DESCRIPTION.slice(0, 60) + ' ...'
          : MOCK_DESCRIPTION}
      </p>
      <IconText text={'10/07/2002'} icon={Calendar} />
      <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-base" />
    </Card>
  )
}
