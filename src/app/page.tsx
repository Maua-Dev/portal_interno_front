import { Inter } from 'next/font/google'
import NameHeader from './components/NameHeader'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col">
        <div>
          <NameHeader
            name="Lucas Fernandes"
            course="Design"
            year="1ª Ano"
            stack="UX/UI"
          />
        </div>
      </div>
    </main>
  )
}
