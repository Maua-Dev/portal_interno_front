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

import HistoricMainCard from './components/HistoricMainCard'
import { EditActionPopUp } from './components/little_components/EditActionPopUp'
import AddActivity from './components/AddActivity'

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Action[]>([])
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)

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
        {/* <EditActionPopUp open={true} /> */}
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
                    <HistoricMainCard
                      action={activity}
                      handleCloseMobilePopUp={() => {
                        closeMainCard()
                      }}
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
      <footer className=""></footer>
    </>
  )
}
