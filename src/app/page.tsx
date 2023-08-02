'use client'

import { Inter } from 'next/font/google'
import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import HistoryMainCard from './components/HistoryMainCard'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { ReactNode, useState } from 'react'
import { activities } from './components/actions'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isOpen, setOpen] = useState(false)
  const [mainCardId, setMainCardId] = useState<number>()
  const [isHistoryButtonCliked, setHistoryButtonCliked] = useState(false)
  const [mainCard, setMainCard] = useState<ReactNode>(null)
  const [isHistoryDropDown, setHistoryDropDown] = useState<boolean>(false)

  const handleSideButtonClick = () => {
    setOpen(!isOpen)
  }

  const handleMainCards = (mainCardComponent: ReactNode, id: number) => {
    if (isOpen) {
      if (mainCardId === id) {
        handleSideButtonClick()
        setMainCard(null)
      } else if (mainCardId !== id) {
        setMainCardId(id)
        setMainCard(mainCardComponent)
      }
    } else if (!isOpen) {
      handleSideButtonClick()
      setMainCardId(id)
      setMainCard(mainCardComponent)
    }
  }

  const handleHistoryDropDown = () => {
    setHistoryDropDown(!isHistoryDropDown)
  }

  return (
    <main className="">
      <NavBar />
      <section className="mt-20 flex flex-col gap-4 px-10 md:px-40">
        <NameHeader
          name="Lucas Fernandes"
          course="Design"
          year="1º Ano"
          stack="UX/UI"
        />
        <div className=" flex gap-44">
          <div className="flex flex-col gap-4"></div>
        </div>
        <ContainerMainCards>
          <ContainerActivitiesHistory>
            <ActivitiesButton
              onClick={() => {
                handleMainCards(<AddActivity />, 1)
              }}
            />
            <HistoryButton
              activities={activities}
              isOpen={isHistoryDropDown}
              onClick={() => {
                handleMainCards(<HistoryMainCard />, 2)
                handleHistoryDropDown()
              }}
            />
          </ContainerActivitiesHistory>
          {mainCard}
        </ContainerMainCards>
      </section>
    </main>
  )
}
