import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { ReactNode, useState, useContext } from 'react'

import HistoricMainCard from './components/HistoricMainCard'
import { ActionContext } from './contexts/action_context'
import { FilterDialog } from './components/mui_components/Dialog'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  // const [isClient, setClient] = useState(false)

  const {
    getHistory,
    history,
    setActivitiesPaginationCounter,
    activitiesPaginationCounter,
    lastEvaluatedKey,
    firstEvaluatedKey
  } = useContext(ActionContext)

  // filter logic

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenFilter = () => {
    setOpenDialog(!openDialog)
  }
  const handleCloseFilter = () => {
    setOpenDialog(false)
  }

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  const saveOnClick = () => {
    return
  }

  const cancelOnClick = () => {
    setOn(false)
  }

  const handleHistoryClick = async () => {
    await getHistory('19017310', 20)
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
    console.log('lastEvaluatedKey', lastEvaluatedKey)
    await getHistory(
      '19017310',
      20,
      undefined,
      undefined,
      history[history.length - 1].actionId
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
            {on ? (
              <AddActivity cancel={cancelOnClick} save={saveOnClick} />
            ) : null}
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
      <FilterDialog open={openDialog} onClose={handleCloseFilter} />
    </>
  )
}
