import { Inter } from 'next/font/google'
import NameHeader from './components/NameHeader'
import NavBar from './components/Navbar'
import ActivitiesButton from './components/ActivitiesButton'
import HistoryButton from './components/HistoryButton'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        <ActivitiesButton />
        <HistoryButton />
      </section>
    </main>
  )
}
