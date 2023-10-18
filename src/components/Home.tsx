import { useContext } from 'react'
import { ThemeContext } from '../app/contexts/theme_context'

export default function Home() {
  const { theme, handleThemeChange } = useContext(ThemeContext)

  return (
    <div
      className={`${
        theme ? 'theme-white' : null
      } h-screen w-screen bg-skin-fill`}
    >
      <p className="text-center text-3xl text-skin-base">TESTE</p>
      <button
        onClick={handleThemeChange}
        className="bg-skin-button-red-accent text-skin-inverted"
      >
        Change Theme
      </button>
    </div>
  )
}
