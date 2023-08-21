import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useContext, useState } from 'react'
import { ActionContext } from './contexts/action_context'
import { Action } from '../@clean/shared/domain/entities/action'

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [history, setHistory] = useState<Action[]>([])
  // const [isClient, setClient] = useState(false)

  const { createAction, createAssociatedAction, getHistory } =
    useContext(ActionContext)

  const handleOnClick = () => {
    setOn(!on)
  }

  const saveOnClick = () => {
    return
  }

  const cancelOnClick = () => {
    setOn(false)
  }

  const handleHistoryClick = async () => {
    const activities = await getHistory('21.00210-0', 20)
    if (activities) {
      setHistory(activities)
    }
    setIsHistoryOpen(!isHistoryOpen)
  }

  return (
    <>
      <main className="">
        <NavBar />
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
                activities={history}
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
