import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import { UserProvider } from '@/contexts/user_provider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <h1>P.I: Bem vindo ao nosso Portal Interno</h1>
        </div>
      </div>
    </main>
  )
}
