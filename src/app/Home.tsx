import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useState, ReactNode, useEffect } from 'react'
import { ActionContext } from './contexts/action_context'
import { useState, ReactNode } from 'react'
import { Action } from '../@clean/shared/domain/entities/action'

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
    lastEvaluatedKeyResponse,
    firstEvaluatedKey,
    startDate
  } = useContext(ActionContext)
import { EditActionPopUp } from './components/little_components/EditActionPopUp'
import AddActivity from './components/AddActivity'
import NewHistoricCard from './components/NewHistoricCard'
import { MemberPopup } from './components/MemberPopup'

export default function Home() {
  const [isOpen, setOpen] = useState(false)
  const [openEditPopUp, setEditPopUp] = useState(false)
  const [mainCardName, setMainCardName] = useState<string>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)

  // const [isClient, setClient] = useState(false)

  const { getHistory, updateAction } = useContext(ActionContext)

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenFilter = () => {
    setOpenDialog(!openDialog)
  }
  const handleCloseFilter = () => {
    setOpenDialog(false)
  }

  // const {} = useContext(ActionContent)
  const [selectedAction, setSelectedAction] = useState<Action>()
  const [openMemberPopup, setOpenMemberPopup] = useState(false)
  const [raMembersSelected, setRAMembersSelected] = useState<
    string[] | undefined
  >(undefined)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  const saveOnClick = () => {
    return
  }
  // const handleOnClick = () => {
  //   setOn(!on)
  // }

  const cancelOnClick = () => {
    setOn(false)
  }

  const testUpdate = async () => {
    const updatedAction = await updateAction(
      '46b35022-1a68-4cc8-a2e5-ae449e43e867',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'HAHAHAHA FUNCIONOU'
    )

    if (updatedAction) {
      console.log(updatedAction)
    }
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
  const handleEditPopup = () => {
    setEditPopUp((prev) => !prev)
  }

  const closeMainCard = () => {
    setOpen(false)
    setMainCard(null)
  }

  const handleMemberPopupClick = () => {
    setOpenMemberPopup((prev) => !prev)
  }

  const handleMainCards = (
    mainCardComponent: ReactNode | undefined,
    name: string,
    activity?: Action
  ) => {
    if (isOpen) {
      if (mainCardName === name) {
        closeMainCard()
      } else if (mainCardName !== name) {
        setMainCardName(name)
        setMainCard(mainCardComponent)
      }
    } else if (!isOpen) {
      setMainCardName(name)
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
      <main>
        <EditActionPopUp isOpen={openEditPopUp} onClose={handleEditPopup} />
        <MemberPopup
          closePopUp={handleMemberPopupClick}
          isOpen={openMemberPopup}
          setMembers={setRAMembersSelected}
        />
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
                      handleMemberPopupClick={handleMemberPopupClick}
                    />,
                    'create'
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
                    'edit',
                    activity
                  )
                }}
                handleNextPageHistory={handleNextPage}
                handleBackPageHistory={() => null}
              />
            </ContainerActivitiesHistory>
            {mainCard}
          </ContainerMainCards>
        </section>
      </main>
      <footer className=""></footer>
      <FilterDialog open={openDialog} onClose={handleCloseFilter} />
    </>
  )
}
