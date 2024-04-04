import { ReactNode, useState } from 'react'
import Navbar from '../components/Navbar'
import useDarkMode from '../utils/functions/useDarkMode'

export default function Home() {
  const [mainContent, setMainContent] = useState<ReactNode>(undefined)
  const { darkMode } = useDarkMode()

  const handleMainContent = (content: ReactNode) => {
    if (mainContent?.valueOf !== content?.valueOf) {
      setMainContent(content)
    } else {
      setMainContent(undefined)
    }
  }

  return (
    <>
      <Navbar setMainContent={handleMainContent} />
      <main
        className={`h-screen w-full ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {mainContent}
      </main>
    </>
  )
}
