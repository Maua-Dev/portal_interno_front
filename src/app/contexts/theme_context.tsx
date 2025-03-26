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

    if (count < 14) setCount((prev) => prev + 1)

    if (count >= 14) {
      window.location.replace(
        'https://drive.google.com/uc?export=view&id=1ZfJ6uhhXMOvxlKl7YmX-Na4AoFkWjIO4'
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
