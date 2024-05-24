import { IoMdClose } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { useDarkMode } from '../../../hooks/useDarkMode'

export function Row({ text, onClick }: { text: string; onClick: () => void }) {
  const { darkMode } = useDarkMode()

  useEffect(() => {
    setTimeout(() => {
      setFade(false)
    }, 100)
  }, [])

  const [fade, setFade] = useState<boolean>(true)
  return (
    <div
      className={`flex items-center justify-between rounded-lg p-2 text-base transition-all duration-200 ${
        darkMode ? 'bg-gray-600' : 'bg-gray-300'
      } ${fade ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <p className="w-3/4">{text}</p>
      <IoMdClose
        onClick={() => {
          setTimeout(() => onClick(), 200)
          setFade(true)
        }}
        className="cursor-pointer"
      />
    </div>
  )
}
