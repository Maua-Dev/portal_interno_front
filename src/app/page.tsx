'use client'

import { Inter } from 'next/font/google'
import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
import AddActivity from './components/AddActivity'
import {
  ContainerActivitiesHistory,
  ContainerMainCards
} from './components/little_components/Container'
import { useEffect, useState } from 'react'
import { activities } from './components/actions'
import dynamic from 'next/dynamic'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [on, setOn] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)
  const [isClient, setClient] = useState(false)

  const handleOnClick = () => {
    setOn(!on)
  }

  const handleHistoryClick = () => {
    setIsHistoryOpen(!isHistoryOpen)
  }

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <main className="">
      {isClient ? <NavBar /> : null}
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
              activities={activities}
              isOpen={isHistoryOpen}
              onClick={handleHistoryClick}
            />
          </ContainerActivitiesHistory>
          {on ? <AddActivity /> : null}
        </ContainerMainCards>
      </section>
    </main>
  )
}
