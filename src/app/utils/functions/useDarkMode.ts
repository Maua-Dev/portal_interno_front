import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const storagedDarkMode = localStorage.getItem('darkMode')

    if (storagedDarkMode) setDarkMode(JSON.parse(storagedDarkMode))
    else setDarkMode(false)
  }, [])

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', String(!darkMode))
  }

  return { darkMode, toggleDarkMode }
}
