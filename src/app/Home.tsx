import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useState, ReactNode, useEffect } from 'react'
import { ActionContext } from './contexts/action_context'
import { Action } from '../@clean/shared/domain/entities/action'

import HistoricMainCard from './components/HistoricMainCard'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Action[]>([])
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)

  // const [isClient, setClient] = useState(false)

  const { getHistory, updateAction } = useContext(ActionContext)

  // const { createAction } = useContext(ActionContext)

  // const {} = useContext(ActionContent)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  // const handleOnClick = () => {
  //   setOn(!on)
  // }

  const cancelOnClick = () => {
    setOn(false)
  }

  const testUpdate = async () => {
    const updatedAction = await updateAction(
      'uuid8',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'TESTE UPDATE'
    )

    if (updatedAction) {
      console.log(updatedAction)
    }
  }

  const handleHistoryClick = async () => {
    testUpdate()
    const activities = await getHistory('21.00210-0', 20)
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
              <h1>TESTE</h1>
              <ActivitiesButton
                onClick={() => {
                  handleMainCards(
                    <AddActivity
                      cancel={function (): void {
                        throw new Error('Function not implemented.')
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
            {on ? <AddActivity cancel={cancelOnClick} /> : null}
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
    </>
  )
}
