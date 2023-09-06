import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useState, ReactNode } from 'react'
import { ActionContext } from './contexts/action_context'
import { Action } from '../@clean/shared/domain/entities/action'

import { EditActionPopUp } from './components/little_components/EditActionPopUp'
import AddActivity from './components/AddActivity'
import NewHistoricCard from './components/NewHistoricCard'

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Action[]>([])
  const [isOpen, setOpen] = useState(false)
  const [openEditPopUp, setEditPopUp] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  const [selectedAction, setSelectedAction] = useState<Action>()

  // const [isClient, setClient] = useState(false)

  const { getHistory } = useContext(ActionContext)

  // const { createAction } = useContext(ActionContext)

  // const {} = useContext(ActionContent)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  // const handleOnClick = () => {
  //   setOn(!on)
  // }

  const handleEditPopup = () => {
    setEditPopUp((prev) => !prev)
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

  return (
    <>
      <main className={isHistoryOpen ? 'pb-11' : ''}>
        {openEditPopUp ? (
          <EditActionPopUp action={selectedAction} onClose={handleEditPopup} />
        ) : null}
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
                  handleMainCards(<AddActivity />, 1)
                }}
              />
              <HistoryButton
                activities={history}
                isOpen={isHistoryOpen}
                onClick={() => {
                  handleHistoryClick()
                }}
                openHistoric={(activity: Action) => {
                  return handleMainCards(
                    <NewHistoricCard
                      action={activity}
                      editAction={() => {
                        setSelectedAction(activity)
                        handleEditPopup()
                      }} // handleCloseMobilePopUp={() => {
                      //   closeMainCard()
                      // }}
                    />,
                    2
                  )
                }}
              />
            </ContainerActivitiesHistory>
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
    </>
  )
}
