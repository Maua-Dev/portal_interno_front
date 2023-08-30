import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useState, ReactNode } from 'react'
import { ActionContext } from './contexts/action_context'
import { Action } from '../@clean/shared/domain/entities/action'

import HistoricMainCard from './components/HistoricMainCard'
import { ACTION_TYPE } from '../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../@clean/shared/domain/enums/stack_enum'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Action[]>([])
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  // const [isClient, setClient] = useState(false)

  const { createAction, createAssociatedAction, getHistory } =
    useContext(ActionContext)

  // const { createAction } = useContext(ActionContext)

  // const {} = useContext(ActionContent)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  // const handleOnClick = () => {
  //   setOn(!on)
  // }

  const saveOnClick = () => {
    return
  }

  const cancelOnClick = () => {
    setOn(false)
  }

  const handleHistoryClick = async () => {
    const activities = await getHistory('19017310', 20)
    if (activities) {
      setHistory(activities)
      console.log(activities)
    }
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

  // {
  //   ownerRa: '17.03373-0',
  //   startDate: 1634526000000,
  //   actionId: 'uuid2', // actionId is not on back
  //   storyId: 100,
  //   title: 'Teste',
  //   description: '',
  //   endDate: 1634533200000,
  //   duration: 7200000,
  //   projectCode: 'MF',
  //   associatedMembersRa: undefined,
  //   stackTags: [STACK.BACKEND],
  //   actionTypeTag: ACTION_TYPE.CODE
  // }

  const actionTest = new Action({
    ownerRa: '21.01731-0',
    startDate: 1634526000000,
    actionId: 'uuid2',
    storyId: 100,
    title: 'Teste',
    description: 'Apenas um teste',
    endDate: 1634533200000,
    duration: 7200000,
    projectCode: 'MF',
    associatedMembersRa: ['19.01731-0'],
    stackTags: [STACK.BACKEND],
    actionTypeTag: ACTION_TYPE.CODE
  })

  const handleCreateAction = async (action: Action) => {
    const response = await createAction(action)
    console.log(response)
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
                      save={() => {
                        handleCreateAction(actionTest)
                      }}
                    />,
                    1
                  )
                }}
              />
              <HistoryButton
                activities={history}
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
