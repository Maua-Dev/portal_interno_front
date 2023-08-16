import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { ReactNode, useState } from 'react'
import { Action } from '../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../@clean/shared/domain/enums/stack_enum'
import HistoricMainCard from './components/HistoricMainCard'
// import { ActionContext } from './contexts/action_context'

// import { UserProvider } from '@/contexts/user_provider'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  // const [isClient, setClient] = useState(false)

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

  // const { createAction } = useContext(ActionContext)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

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

  const closeMainCard = () => {
    setOpen(false)
    setMainCard(null)
  }

  const handleMainCards = (mainCardComponent: ReactNode, id: number) => {
    if (isOpen) {
      if (mainCardId === id) {
        closeMainCard()
      } else if (mainCardId !== id) {
        setMainCardId(id)
        setMainCard(mainCardComponent)
      }
    } else if (!isOpen) {
      setMainCardId(id)
      setMainCard(mainCardComponent)
    }
    handleSideButtonClick()
  }

  return (
    <>
      <main className={isHistoryOpen ? 'pb-11' : ''}>
        <NavBar />
        <section className="-z-20 mb-12 mt-20 flex flex-col gap-4 px-10 md:px-40">
          <NameHeader
            name="Lucas Fernandes"
            course="Design"
            year="1º Ano"
            stack="UX/UI"
          />
          <ContainerMainCards>
            <ContainerActivitiesHistory>
              <ActivitiesButton
                onClick={() => {
                  handleMainCards(
                    <AddActivity
                      cancel={function (): void {
                        throw new Error('Function not implemented.')
                      }}
                      save={function (): void {
                        throw new Error('Function not implemented.')
                      }}
                    />,
                    1
                  )
                }}
              />
              <HistoryButton
                activities={activities}
                isOpen={isHistoryOpen}
                onClick={() => {
                  handleHistoryClick()
                }}
                openHistoric={() => {
                  handleMainCards(
                    <HistoricMainCard
                      handleCloseMobilePopUp={() => {
                        closeMainCard()
                      }}
                    />,
                    2
                  )
                }}
              />
            </ContainerActivitiesHistory>
            {on ? (
              <AddActivity cancel={cancelOnClick} save={saveOnClick} />
            ) : null}
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
    </>
  )
}
