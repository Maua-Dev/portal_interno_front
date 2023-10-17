import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
<<<<<<< HEAD
import { ReactNode, useState, useContext } from 'react'
=======
import { useContext, useState, ReactNode } from 'react'
import { ActionContext } from './contexts/action_context'
import { Action } from '../@clean/shared/domain/entities/action'
>>>>>>> dev

import HistoricMainCard from './components/HistoricMainCard'
import { ActionContext } from './contexts/action_context'
import { FilterDialog } from './components/mui_components/Dialog'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
<<<<<<< HEAD
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  // const [isClient, setClient] = useState(false)

  const {
    getHistory,
    history,
    setActivitiesPaginationCounter,
    activitiesPaginationCounter,
    lastEvaluatedKeyResponse,
    firstEvaluatedKey,
    startDate
  } = useContext(ActionContext)
=======
  const [history, setHistory] = useState<Action[]>([])
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)

  // const [isClient, setClient] = useState(false)

  const { getHistory } = useContext(ActionContext)
>>>>>>> dev

  // filter logic

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenFilter = () => {
    setOpenDialog(!openDialog)
  }
  const handleCloseFilter = () => {
    setOpenDialog(false)
  }

  // const {} = useContext(ActionContent)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

<<<<<<< HEAD
  const saveOnClick = () => {
    return
  }
=======
  // const handleOnClick = () => {
  //   setOn(!on)
  // }
>>>>>>> dev

  const cancelOnClick = () => {
    setOn(false)
  }

  const handleHistoryClick = async () => {
    if (import.meta.env.VITE_STAGE === 'DEV') {
      await getHistory('21010757', 20)
    } else if (import.meta.env.VITE_STAGE === 'TEST') {
      await getHistory('21002100', 20)
    } else {
      await getHistory('21002100', 20)
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

  const handleNextPage = async () => {
    console.log('lastEvaluatedKey', lastEvaluatedKeyResponse)
    await getHistory(
      '21010757',
      20,
      undefined,
      undefined,
      lastEvaluatedKeyResponse
    )

    setActivitiesPaginationCounter(activitiesPaginationCounter + 1)
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
                onClickFilterAdd={handleOpenFilter}
                onClickFilterRemove={() => null}
                activities={history}
                isOpen={isHistoryOpen}
                onClick={() => {
                  handleHistoryClick()
                }}
                openHistoric={() => {
                  handleMainCards(
                    <HistoricMainCard
                      activities={history}
                      handleCloseMobilePopUp={() => {
                        closeMainCard()
                      }}
                    />,
                    2
                  )
                }}
                handleNextPageHistory={handleNextPage}
                handleBackPageHistory={() => null}
              />
            </ContainerActivitiesHistory>
            {on ? <AddActivity cancel={cancelOnClick} /> : null}
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
      <FilterDialog open={openDialog} onClose={handleCloseFilter} />
    </>
  )
}
