import { createContext, useEffect, useState } from 'react'

interface DefaultThemeProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DefaultTheme: DefaultThemeProps = {
  darkMode: false,
  toggleDarkMode: () => {}
}

export const ThemeContext = createContext(DefaultTheme)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const storagedDarkMode = localStorage.getItem('darkMode')

    if (storagedDarkMode) setDarkMode(JSON.parse(storagedDarkMode))
    else setDarkMode(false)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', JSON.stringify(!prev))
      return !prev
    })

    if (import.meta.env.VITE_STAGE === 'prod' && count < 14)
      setCount((prev) => prev + 1)

    if (count >= 14 && import.meta.env.VITE_STAGE === 'prod') {
      window.location.replace(
        'https://media.licdn.com/dms/image/C4D03AQFiRdVm6Y3EpA/profile-displayphoto-shrink_800_800/0/1621979338107?e=1721260800&v=beta&t=zOHxLsSWe5Y9A9rJIF-Y7paPmxfqOWC2NPCbm9doBcI'
      )
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
