import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useEffect, useState } from 'react'
import { Action } from '../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../@clean/shared/domain/enums/stack_enum'
import { ActionContext } from './contexts/action_context'

// import { UserProvider } from '@/contexts/user_provider'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isClient, setClient] = useState(false)

  const activities: Action[] = [
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689948000000,
      endDate: 1689955200000,
      duration: 7200000,
      actionId: 'uuid2',
      title: 'Reunião do Front',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião do front'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689955200000,
      endDate: 1689964020000,
      duration: 8820000,
      actionId: 'uuid2',
      title: 'Imp. Navbar',
      actionTypeTag: ACTION_TYPE.CODE,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Navbar codada'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689966000000,
      endDate: 1689966420000,
      duration: 420000,
      actionId: 'uuid2',
      title: 'Daily',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião Daily'
    }),
    new Action({
      ownerRa: '21.00210-0',
      startDate: 1689969600000,
      endDate: 1689976380000,
      duration: 6780000,
      actionId: 'uuid2',
      title: 'Componente Histórico e Atividades',
      actionTypeTag: ACTION_TYPE.MEETING,
      projectCode: 'PT',
      stackTags: [STACK.FRONTEND],
      storyId: 150,
      description: 'Reunião Daily'
    })
  ]

  const {  } = useContext(ActionContext)

  const handleOnClick = () => {
    setOn(!on)
  }

  const saveOnClick = () => {
    return
  }

  const cancelOnClick = () => {
    setOn(false)
  }

  const handleHistoryClick = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <>
      <main className="">
        {isClient ? <NavBar /> : null}
        <section className="mt-20 flex flex-col gap-4 px-10 md:px-40">
          <NameHeader
            name="Lucas Fernandes"
            course="Design"
            year="1º Ano"
            stack="UX/UI"
          />
          <ContainerMainCards>
            <ContainerActivitiesHistory>
              <ActivitiesButton onClick={handleOnClick} />
              <HistoryButton
                activities={activities}
                isOpen={isHistoryOpen}
                onClick={handleHistoryClick}
              />
            </ContainerActivitiesHistory>
            {on ? (
              <AddActivity cancel={cancelOnClick} save={saveOnClick} />
            ) : null}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
    </>
  )
}
