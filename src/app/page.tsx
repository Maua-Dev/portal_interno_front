import { Inter } from 'next/font/google'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col">
        <div>
          <h1 className="text-7xl"></h1>
        </div>
      </div>
    </main>
  )
}
