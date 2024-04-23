import { IoMdClose } from 'react-icons/io'
import useDarkMode from '../../../utils/functions/useDarkMode'

export function Row({ text, onClick }: { text: string; onClick: () => void }) {
  const { darkMode } = useDarkMode()
  return (
    <div
      className={`flex items-center justify-between rounded-lg p-2 text-base ${
        darkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    >
      <p className="w-3/4">{text}</p>
      <IoMdClose onClick={onClick} className="cursor-pointer" />
    </div>
  )
}
