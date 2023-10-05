import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useState, ReactNode } from 'react'
import { Action } from '../@clean/shared/domain/entities/action'

import { EditActionPopUp } from './components/little_components/EditActionPopUp'
import AddActivity from './components/AddActivity'
import NewHistoricCard from './components/NewHistoricCard'
import { MemberPopup } from './components/MemberPopup'

export default function Home() {
  const [isOpen, setOpen] = useState(false)
  const [openEditPopUp, setEditPopUp] = useState(false)
  const [mainCardName, setMainCardName] = useState<string>()
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  const [selectedAction, setSelectedAction] = useState<Action>()
  const [openMemberPopup, setOpenMemberPopup] = useState(false)
  const [raMembersSelected, setRAMembersSelected] = useState<
    string[] | undefined
  >(undefined)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

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
                openHistoric={(activity: Action) => {
                  return handleMainCards(
                    <NewHistoricCard
                      action={activity}
                      editAction={() => {
                        setSelectedAction(activity)
                        handleEditPopup()
                      }}
                    />,
                    'edit',
                    activity
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
