import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme_context'

export const useDarkMode = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  return { darkMode, toggleDarkMode }
}
