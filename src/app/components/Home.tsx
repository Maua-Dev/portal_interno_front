import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme_context'
import { Sun, Moon } from 'lucide-react'
import Historic from './Historic'

export default function Home() {
  const { theme, handleThemeChange } = useContext(ThemeContext)

  return (
    <div
      className={`${
        theme ? 'theme-white' : null
      } flex h-screen flex-col items-center bg-skin-fill`}
    >
      <button
        onClick={handleThemeChange}
        className="absolute right-3 top-3 text-skin-base"
      >
        {theme ? <Moon /> : <Sun />}
      </button>
      <Historic />
    </div>
  )
}
