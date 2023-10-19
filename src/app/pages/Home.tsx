import Navbar from '../components/Navbar'
import useDarkMode from '../utils/functions/useDarkMode'

export default function Home() {
  const { darkMode } = useDarkMode()
  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
      ></main>
    </>
  )
}
